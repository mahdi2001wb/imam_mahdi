/**
 * Minimal in-memory sliding-window rate limiter.
 * NOTE: state is per server instance. On serverless platforms (e.g. Vercel) each
 * instance has its own counter, so this stops casual abuse only. For strict limits,
 * swap `rateLimit` for a shared store such as Upstash Redis.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return true;
}
