import { Request, Response } from "express";
import { pool } from "../db";

/**
 * GET /stops/:id/lines
 * Retorna as linhas que passam em uma parada
 */
export async function getLinesForStop(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      `
      SELECT DISTINCT
        r.id AS route_id,
        r.short_name AS route_short_name,
        r.long_name AS route_long_name
      FROM stop_times st
      JOIN trips t ON t.id = st.trip_id
      JOIN routes r ON r.id = t.route_id
      WHERE st.stop_id = $1
      ORDER BY r.short_name
      `,
      [id]
    );

    return res.json(rows);
  } catch (error) {
    console.error("Erro em getLinesForStop:", error);
    return res.status(500).json({
      error: "Erro ao buscar linhas da parada",
    });
  }
}

/**
 * GET /lines/:routeId/route
 * Retorna o shape da linha para desenhar no mapa
 */
export async function getRouteShape(req: Request, res: Response) {
  const { routeId } = req.params;
  const { stopId } = req.query;

  try {
    const { rows } = await pool.query(
      `
      SELECT st.stop_id, st.stop_sequence, s.stop_name, s.stop_lat, s.stop_lon
      FROM stop_times st
      JOIN stops s ON s.id = st.stop_id
      JOIN trips t ON t.id = st.trip_id
      WHERE t.route_id = $1
      ORDER BY st.stop_sequence
      `,
      [routeId]
    );

    res.json({ route_id: routeId, stops: rows });
  } catch (error) {
    console.error("Erro em getRouteShape:", error);
    res.status(500).json({ error: "Erro ao buscar rota" });
  }
}