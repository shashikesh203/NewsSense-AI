import redisClient, { connectRedis } from "../../lib/redisClient";
import { CacheConfig } from "../enums/cacheConfig";

export type QAItem = {
  question: string;
  answer: string;
  timestamp: number;
};

export async function ensureRedis() {
  if (!redisClient.isOpen) {
    await connectRedis();
  }
}

export async function storeLastFiveQA(
  sessionId: string,
  question: string,
  answer: string
) {
  try {
    await ensureRedis();
    const key = `session:${sessionId}:history`;

    const payload = JSON.stringify({
      question,
      answer,
      timestamp: Date.now(),
    });

    await redisClient.lPush(key, payload);
    await redisClient.lTrim(key, 0, CacheConfig.MAX_HISTORY - 1);
    await redisClient.expire(key, CacheConfig.TTL_SECONDS);
  } catch (error) {
    console.log("error while set redis", error);
  }
}

export async function getLastFiveQA(sessionId: string): Promise<QAItem[]> {
  try {
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
  } catch (error) {
    console.log("error while get redis data", error);
  }
}
