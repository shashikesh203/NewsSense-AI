import chatRoute from "./chatRoute";
import historyRoute from "./historyRoute";
import ingestRoute from "./ingestRoute";
import { Router } from "express";

const router = Router();

router.use("/ingest", ingestRoute);
router.use("/chat", chatRoute);
router.use("/history", historyRoute);

export default router;
