import { Request, Response, NextFunction } from "express";
import redisClient from "../lib/redisClient";
import { RateLimitConfig } from "../utils/enums/ratelimiterEnum";


export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await ensureRedis();
    const ip = req.ip || "unknown";
    const key = `rate:${ip}`;
    const current = Number(await redisClient.incr(key));


    if (current === 1) {
      await redisClient.expire(key, RateLimitConfig.WINDOW_SECONDS);
    }

    if (current > RateLimitConfig.MAX_REQUESTS) {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(); 
  }
}
function ensureRedis() {
  throw new Error("Function not implemented.");
}

