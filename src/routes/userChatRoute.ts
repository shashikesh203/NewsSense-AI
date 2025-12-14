import { Router } from "express";
import userChatController from "../controller/userChatController";

const router = Router();

// Define routes for user chat using Express Router
// Example: POST /api/chat/main -> userChatController.main
router.post("/main", userChatController.userChatController);

export default router;
