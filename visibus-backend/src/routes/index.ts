import { Router } from "express";
import stopsRoutes from "./stops";
import linesRoutes from "./lines";

const router = Router();

router.use("/stops", stopsRoutes); // → /stops e /stops/near
router.use("/stop", linesRoutes);  // → /stop/:id/lines

export default router;
