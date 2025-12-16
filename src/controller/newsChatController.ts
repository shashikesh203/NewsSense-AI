import { Request, Response } from "express";
import  chat from "../lib/chatService";

export const chatController = async (req: Request, res: Response) => {
  const answer = await chat("The Rise of Artificial Intelligence in Indian Startups: Transformation and Challenges");
  res.json({ answer });
};
