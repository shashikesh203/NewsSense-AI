import prisma from "../lib/prismaClient";
export async function logInteraction({
  sessionId,
  userQuery,
  llmResponse,
  responseTimeMs,
}: {
  sessionId: string;
  userQuery: string;
  llmResponse: string;
  responseTimeMs: number;
}) {
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
