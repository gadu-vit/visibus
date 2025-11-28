import { pool } from "./db";

async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB OK:", result.rows[0]);
  } catch (err) {
    console.error("ERRO AO CONECTAR:", err);
  } finally {
    pool.end();
  }
}

test();
