import redisClient, { connectRedis } from "../../lib/redisClient";

const MAX_HISTORY = 5;
const TTL_SECONDS = 60 * 60; // 1 hour

export type QAItem = {
  question: string;
  answer: string;
  timestamp: number;
};

async function ensureRedis() {
  if (!redisClient.isOpen) {
    await connectRedis();
  }
}
    
export async function storeLastFiveQA(
  sessionId: string,
  question: string,
  answer: string
) {
  await ensureRedis(); 
  const key = `session:${sessionId}:history`;

  const payload = JSON.stringify({
    question,
    answer,
    timestamp: Date.now(),
  });

  await redisClient.lPush(key, payload);
  await redisClient.lTrim(key, 0, MAX_HISTORY - 1);
  await redisClient.expire(key, TTL_SECONDS);
}

export async function getLastFiveQA(
  sessionId: string
): Promise<QAItem[]> {
  await ensureRedis(); 
  const key = `session:${sessionId}:history`;

  const data = await redisClient.lRange(key, 0, -1);

  return data.map((item) => {
    const parsed =
      typeof item === "string"
        ? JSON.parse(item)
        : JSON.parse(item.toString());

    return parsed as QAItem;
  });
}
