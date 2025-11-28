// scripts/ingest-gtfs.js
// Uso: node scripts/ingest-gtfs.js gtfs_raw/

const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { Client } = require("pg");
const cliProgress = require("cli-progress");

// ---------------------------------------------------------------------
// Funções utilitárias
// ---------------------------------------------------------------------

function loadCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  return parse(text, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });
}

function normalizeCoord(raw) {
  if (!raw) return null;
  let s = raw.toString().trim().replace(",", ".");
  const dots = (s.match(/\./g) || []).length;

  if (dots > 1) {
    const neg = s.startsWith("-");
    const digits = s.replace(/\./g, "").replace(/[^0-9-]/g, "");
    const num = Number(digits) * (neg ? -1 : 1);
    const attempt = num / 1e6;
    if (Math.abs(attempt) <= 180) return attempt;
  }
  return parseFloat(s);
}

function timeToSeconds(t) {
  if (!t || !t.trim()) return null;
  const clean = t.trim().toLowerCase();
  if (clean === "null") return null;
  const parts = clean.split(":").map(Number);
  if (parts.some(isNaN)) return null;
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

// ---------------------------------------------------------------------
// Conexão PostgreSQL
// ---------------------------------------------------------------------

async function connectPg() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "visibus",
    password: "visibuspass",
    database: "visibusdb",
  });
  await client.connect();
  return client;
}

async function truncateAll(client) {
  await client.query(`
    TRUNCATE TABLE stop_times, trips, routes, stops RESTART IDENTITY;
  `);
}

// ---------------------------------------------------------------------
// Inserções em lote OTIMIZADAS (com parâmetros)
// ---------------------------------------------------------------------

async function insertBatch(client, table, columns, rows, batchSize = 2000) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(rows.length, 0);

  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);

    const placeholders = chunk
      .map(
        (_, idx) =>
          `(${columns.map((__, j) => `$${idx * columns.length + j + 1}`).join(",")})`
      )
      .join(",");

    const values = chunk.flatMap((row) => columns.map((c) => row[c]));

    const sql = `
      INSERT INTO ${table} (${columns.join(",")})
      VALUES ${placeholders};
    `;

    await client.query(sql, values);
    bar.update(i + chunk.length);
  }

  bar.stop();
}

// ---------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------

async function main() {
  const rawDir = process.argv[2];
  if (!rawDir) {
    console.error("Uso: node scripts/ingest-gtfs.js gtfs_raw/");
    process.exit(1);
  }

  const stopsPath = path.join(rawDir, "stops.txt");
  const routesPath = path.join(rawDir, "routes.txt");
  const tripsPath = path.join(rawDir, "trips.txt");
  const stopTimesPath = path.join(rawDir, "stop_times.txt");

  console.log("📥 Lendo arquivos GTFS...");
  const stopsCsv = loadCsv(stopsPath);
  const routesCsv = loadCsv(routesPath);
  const tripsCsv = loadCsv(tripsPath);
  const stopTimesCsv = loadCsv(stopTimesPath);

  console.log("🔌 Conectando ao PostgreSQL...");
  const client = await connectPg();

  console.log("🧹 Limpando tabelas...");
  await truncateAll(client);

  // -------------------------------------------------------------------
  // Inserindo stops
  // -------------------------------------------------------------------
  console.log("\n📍 Inserindo stops...");
  const stopsRows = stopsCsv.map((s) => ({
    id: s.stop_id,
    name: s.stop_name ?? "",
    stop_desc: s.stop_desc ?? "",
    lat: normalizeCoord(s.stop_lat),
    lon: normalizeCoord(s.stop_lon),
    location_type: Number(s.location_type ?? 0),
  }));

  await insertBatch(
    client,
    "stops",
    ["id", "name", "stop_desc", "lat", "lon", "location_type"],
    stopsRows
  );

  // -------------------------------------------------------------------
  // Inserindo routes
  // -------------------------------------------------------------------
  console.log("\n🚌 Inserindo routes...");
  const routesRows = routesCsv.map((r) => ({
    id: r.route_id,
    short_name: r.route_short_name ?? r.route_id,
    long_name: r.route_long_name ?? "",
  }));

  await insertBatch(
    client,
    "routes",
    ["id", "short_name", "long_name"],
    routesRows
  );

  // -------------------------------------------------------------------
  // Inserindo trips
  // -------------------------------------------------------------------
  console.log("\n🚏 Inserindo trips...");
  const tripsRows = tripsCsv.map((t) => ({
    id: t.trip_id,
    route_id: t.route_id,
    service_id: t.service_id,
    headsign: t.trip_headsign ?? "",
  }));

  await insertBatch(
    client,
    "trips",
    ["id", "route_id", "service_id", "headsign"],
    tripsRows
  );

  // -------------------------------------------------------------------
  // Inserindo stop_times
  // -------------------------------------------------------------------
  console.log("\n⏱️ Inserindo stop_times (isso pode levar 1–2 minutos)...");

  const stopTimesRows = stopTimesCsv.map((st) => {
    const arrivalRaw = st.arrival_time?.trim();
    const arrivalTime =
      !arrivalRaw || arrivalRaw.toLowerCase() === "null" ? null : arrivalRaw;

    return {
      trip_id: st.trip_id,
      stop_id: st.stop_id,
      stop_sequence: Number(st.stop_sequence),
      arrival_time: arrivalTime,
      arrival_time_seconds: arrivalTime ? timeToSeconds(arrivalTime) : null,
    };
  });

  await insertBatch(
    client,
    "stop_times",
    ["trip_id", "stop_id", "stop_sequence", "arrival_time", "arrival_time_seconds"],
    stopTimesRows
  );

  console.log("\n✅ Ingestão concluída com sucesso!");
  await client.end();
}

main().catch((err) => {
  console.error("❌ ERRO:", err);
  process.exit(1);
});
