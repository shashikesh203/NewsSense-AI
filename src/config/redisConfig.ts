import { url } from "inspector";

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  url: process.env.REDIS_URL,
};

export default redisConfig;
