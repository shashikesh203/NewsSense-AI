import { Router } from "express";
import { chatController } from "../controller/newsChatController";

const router = Router();

router.post("/chat", chatController);

export default router;