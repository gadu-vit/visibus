import { Request, Response } from "express";
import { pool } from "../db";

export async function getAllStops(req: Request, res: Response) {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        name,
        lat,
        lon
      FROM stops
      WHERE lat IS NOT NULL
        AND lon IS NOT NULL
      ORDER BY id
      LIMIT 5000
    `);

    res.json(rows);
  } catch (error) {
    console.error("Erro em getAllStops:", error);
    res.status(500).json({ error: "Erro ao buscar paradas" });
  }
}

export async function getStopETA(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // Busca ETA das linhas para a parada
    const { rows } = await pool.query(
      `
      SELECT 
        r.id AS route_id, 
        r.short_name, 
        r.long_name,
        EXTRACT(EPOCH FROM (
          -- Concatena a data atual com o horário de chegada e converte para TIMESTAMP
          (CURRENT_DATE || ' ' || st.arrival_time)::TIMESTAMP 
          - 
          NOW()
        )) / 60 AS eta
      FROM stop_times st
      JOIN trips t ON t.id = st.trip_id
      JOIN routes r ON r.id = t.route_id
      WHERE st.stop_id = $1 AND (
        -- Garante que o horário de chegada é posterior ao momento atual
        (CURRENT_DATE || ' ' || st.arrival_time)::TIMESTAMP 
        > 
        NOW()
      )
      ORDER BY eta
      `,
      [id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Erro em getStopETA:", error);
    res.status(500).json({ error: "Erro ao buscar ETA da parada" });
  }
}

