

const commonConfig = {
  port: Number(process.env.PORT),
  rateLimitConfig:  Number(process.env.RATE_LIMIT_WINDOW_MS),
  maxRateLimit: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
};

export default commonConfig;
