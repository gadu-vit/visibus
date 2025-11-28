import { Router } from "express";
import { getAllStops, getStopETA } from "../controllers/stopsController";

const router = Router();

router.get("/", getAllStops);

router.get("/:id/eta", getStopETA);

export default router;
