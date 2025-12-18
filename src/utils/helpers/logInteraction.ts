import prisma from "../../lib/prismaClient";
import LogInteractionInterface from "../interfaces/logInteractionInterface";
export async function logInteraction({
  sessionId,
  userQuery,
  llmResponse,
  responseTimeMs,
}: LogInteractionInterface) {
  try {
    await prisma.chatLog.create({
      data: {
        sessionId,
        userQuery,
        llmResponse,
        responseTimeMs,
      },
    });
  } catch (err) {
    console.error(" DB log error", err);
  }
}
