import prisma from "../../lib/prismaClient";

export async function getHistoryFromPostgres({
  sessionId,
}: {
  sessionId: string;
}) {
  try {
    const sessionHistory = await prisma.chatLog.findMany({
      where: { sessionId },
    });
    return sessionHistory;
  } catch (error) {
    console.log("Error while fetching history", error);
  }
}

export async function deleteHistoryFromPostgres({
  sessionId,
}: {
  sessionId: string;
}) {
  try {
    return prisma.chatLog.deleteMany({
      where: { sessionId },
    });
  } catch (error) {
    console.log("Error while deleting history", error);
  }
}
