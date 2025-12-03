/**
 * Optional Redis Caching Layer
 * Only activates if REDIS_URL is provided in environment variables
 *
 * To enable Redis caching:
 * 1. Install redis package: npm install redis
 * 2. Set REDIS_ENABLED=true in .env
 * 3. Set REDIS_URL=redis://localhost:6379 (or your Redis URL)
 *
 * If Redis is not configured, the app will work normally without caching.
 * All cache functions will gracefully return null/false if Redis is unavailable.
 */

let redisClient = null;
let cacheEnabled = false;

// Initialize Redis connection (optional)
export const initCache = async () => {
  const REDIS_URL = process.env.REDIS_URL;
  const REDIS_ENABLED = process.env.REDIS_ENABLED === "true";

  if (!REDIS_ENABLED || !REDIS_URL) {
    console.log("📦 Redis caching disabled (REDIS_URL not provided)");
    return;
  }

  try {
    // Dynamic import of redis (only if needed)
    // Try to import redis, but don't fail if package is not installed
    let redis;
    try {
      const redisModule = await import("redis");
      // Handle both default export and named export
      redis = redisModule.default || redisModule;
    } catch (importError) {
      console.warn(
        "⚠️  Redis package not installed. Install with: npm install redis"
      );
      console.log("📦 Continuing without Redis caching");
      return;
    }

    // Handle both Redis v3 and v4+ APIs
    let createClientFn;
    if (typeof redis.createClient === "function") {
      createClientFn = redis.createClient;
    } else if (
      redis.default &&
      typeof redis.default.createClient === "function"
    ) {
      createClientFn = redis.default.createClient;
    } else {
      console.warn("⚠️  Unable to create Redis client - unsupported version");
      return;
    }

    redisClient = createClientFn({
      url: REDIS_URL,
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
      cacheEnabled = false;
    });

    // Connect - handle both sync and async connect methods
    if (typeof redisClient.connect === "function") {
      await redisClient.connect();
    } else if (typeof redisClient.on === "function") {
      // v3 client connects automatically, wait for ready event
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Redis connection timeout"));
        }, 5000);

        redisClient.on("ready", () => {
          clearTimeout(timeout);
          resolve();
        });
        redisClient.on("error", (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    }

    cacheEnabled = true;
    console.log("✅ Redis caching enabled and connected");
  } catch (error) {
    console.warn(
      "⚠️  Redis connection failed, continuing without cache:",
      error.message
    );
    cacheEnabled = false;
    redisClient = null;
  }
};

// Get cached data
export const getCache = async (key) => {
  if (!cacheEnabled || !redisClient) return null;

  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    // Silently fail - cache is optional
    return null;
  }
};

// Set cached data
export const setCache = async (key, value, ttl = 3600) => {
  if (!cacheEnabled || !redisClient) return false;

  try {
    // Try setEx first (Redis v4+), fallback to set + expire
    if (typeof redisClient.setEx === "function") {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    } else if (typeof redisClient.set === "function") {
      await redisClient.set(key, JSON.stringify(value));
      if (typeof redisClient.expire === "function") {
        await redisClient.expire(key, ttl);
      }
    }
    return true;
  } catch (error) {
    // Silently fail - cache is optional
    return false;
  }
};

// Delete cached data
export const deleteCache = async (key) => {
  if (!cacheEnabled || !redisClient) return false;

  try {
    if (typeof redisClient.del === "function") {
      await redisClient.del(key);
    } else if (typeof redisClient.delete === "function") {
      await redisClient.delete(key);
    }
    return true;
  } catch (error) {
    // Silently fail - cache is optional
    return false;
  }
};

// Invalidate cache by pattern
export const invalidateCachePattern = async (pattern) => {
  if (!cacheEnabled || !redisClient) return false;

  try {
    let keys = [];
    if (typeof redisClient.keys === "function") {
      keys = await redisClient.keys(pattern);
    } else if (typeof redisClient.scan === "function") {
      // Use SCAN for better performance in production
      const cursor = "0";
      const result = await redisClient.scan(cursor, { MATCH: pattern });
      keys = result.keys || [];
    }

    if (keys.length > 0) {
      if (typeof redisClient.del === "function") {
        await redisClient.del(keys);
      } else if (typeof redisClient.delete === "function") {
        await redisClient.delete(keys);
      }
    }
    return true;
  } catch (error) {
    // Silently fail - cache is optional
    return false;
  }
};

// Close Redis connection
export const closeCache = async () => {
  if (redisClient) {
    try {
      if (typeof redisClient.quit === "function") {
        await redisClient.quit();
      } else if (typeof redisClient.end === "function") {
        await redisClient.end();
      }
    } catch (error) {
      console.error("Error closing Redis connection:", error);
    } finally {
      redisClient = null;
      cacheEnabled = false;
    }
  }
};

export { cacheEnabled };
