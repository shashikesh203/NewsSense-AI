import { Router } from "express";
import { ingestNews } from "../controller/ingestController";

const ingestRoute = Router();

ingestRoute.post("/", ingestNews);

export default ingestRoute;
