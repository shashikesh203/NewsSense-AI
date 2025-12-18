import { Router } from "express";
import { fetchSessionHistory, deleteSessionHistory } from "../controller/chatHistoryController";
import { rateLimiter } from "../middleware/rateLimiter";

const historyRoute = Router();

historyRoute.get("/:session_id",rateLimiter, fetchSessionHistory);
historyRoute.delete("/:session_id", deleteSessionHistory);

export default historyRoute;
