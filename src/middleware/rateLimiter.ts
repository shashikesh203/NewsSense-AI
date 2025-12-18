import { Request, Response, NextFunction } from "express";
import redisClient from "../lib/redisClient";
import config from "../config";

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ip = req.ip || "unknown";
    const count = await redisClient.get(ip);

    if (!count) {
      await redisClient.setEx(ip, config.commonConfig.rateLimitConfig, "1");
    } else if( Number(count) < config.commonConfig.maxRateLimit) {
      await redisClient.incr(ip);
    }
    else if (Number(count) >= (config.commonConfig.maxRateLimit -1)) {
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
