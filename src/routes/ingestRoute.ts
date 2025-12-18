import { Router } from "express";
import { ingestNews } from "../controller/ingestController";
import { uploadJson } from "../middleware/jsonFileUploader";

const ingestRoute = Router();

ingestRoute.post("/",uploadJson.single('file'), ingestNews);

export default ingestRoute;
    