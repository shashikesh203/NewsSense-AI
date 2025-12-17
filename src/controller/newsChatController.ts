import { Request, Response } from "express";
import  chat from "../lib/chatService";

export const chatController = async (req: Request, res: Response) => {
  const answer = await chat("Climate Policy and Its Global Impact in short");
  const answer1 = await chat("explain in detail");
  res.json({ answer,answer1 });
};
