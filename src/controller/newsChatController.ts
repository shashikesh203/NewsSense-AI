import { NextFunction, Request, Response } from "express";
import chat from "../utils/helpers/chatService";
import { logInteraction } from "../utils/helpers/logInteraction";
import { CustomError } from "../utils/helpers/customError";
import { HttpStatusCode } from "../utils/enums/httpStatusCode";

export const chatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId, userQuery } = req.body;

    const llmResponse = await chat({ userQuery, sessionId });

    await logInteraction({
      sessionId,
      userQuery,
      llmResponse: llmResponse || "model issue",
      responseTimeMs: 123,
    });

    res.json({ response: llmResponse });
  } catch (error) {
    console.error("Chat controller error:", error);
    next(
      new CustomError(
        "Failed to process chat request",
        HttpStatusCode.SERVICE_UNAVAILABLE
      )
    );
  }
};
