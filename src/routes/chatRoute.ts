import { Router } from "express";
import { chatController } from "../controller/newsChatController";

const chatRoute = Router();

chatRoute.post("/", chatController);

export default chatRoute;