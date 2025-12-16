import { Router } from "express";
import { ingestNews } from "../controller/ingestController";

const router = Router();

router.post("/ingest", ingestNews);

export default router;
