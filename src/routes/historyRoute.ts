import { Router } from "express";
import { fetchSessionHistory, deleteSessionHistory } from "../controller/chatHistoryController";

const historyRoute = Router();

historyRoute.get("/:session_id", fetchSessionHistory);
historyRoute.delete("/:session_id", deleteSessionHistory);

export default historyRoute;
