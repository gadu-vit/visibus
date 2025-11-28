import { Router } from "express";
import {
  getLinesForStop,
  getRouteShape,
} from "../controllers/linesController";

const router = Router();

/**
 * GET /stops/:id/lines
 */
router.get("/:id/lines", getLinesForStop);

/**
 * GET /lines/:routeId/route
 */
router.get("/lines/:routeId/route", getRouteShape);

export default router;
