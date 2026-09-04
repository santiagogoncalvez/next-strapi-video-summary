import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

export const summaryRateLimit = new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(5, "1 m"),
   prefix: "ratelimit:summary",
   analytics: true,
});
