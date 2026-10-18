import { Http } from '@/lib/http';
import { redis, Redis } from '@/lib/redis';

const CONSUME_HITS = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return { count, redis.call('TTL', KEYS[1]) }
`;

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number | null;
};

type RateLimitOptions = {
  prefix: string;
  limit: number;
  windowSeconds: number;
};

export class RateLimit extends Http {
  public constructor(
    private readonly redis: Redis,
    private readonly options: RateLimitOptions,
  ) {
    super();
  }

  public async consume(request: Request): Promise<RateLimitResult> {
    const reply = await this.redis.eval(
      CONSUME_HITS,
      [`${this.options.prefix}:${this.ip(request)}`],
      [String(this.options.windowSeconds)],
    );
    const { count, ttlSeconds } = this.parseReply(reply);
    const allowed = count <= this.options.limit;

    return {
      allowed,
      limit: this.options.limit,
      remaining: Math.max(0, this.options.limit - count),
      retryAfterSeconds: allowed ? null : Math.max(1, ttlSeconds),
    };
  }

  public headers(result: RateLimitResult): HeadersInit {
    const headers: Record<string, string> = {
      'X-RateLimit-Limit': String(result.limit),
      'X-RateLimit-Remaining': String(result.remaining),
    };

    if (result.retryAfterSeconds != null) {
      headers['Retry-After'] = String(result.retryAfterSeconds);
    }

    return headers;
  }

  private parseReply(reply: unknown): { count: number; ttlSeconds: number } {
    if (!Array.isArray(reply) || reply.length < 2) {
      throw new Error('Unexpected Redis rate-limit reply.');
    }

    const count = Number(reply[0]);
    const ttlSeconds = Number(reply[1]);

    if (!Number.isFinite(count)) {
      throw new Error('Unexpected Redis rate-limit count.');
    }

    return {
      count,
      ttlSeconds: ttlSeconds > 0 ? ttlSeconds : this.options.windowSeconds,
    };
  }
}

export const contactRateLimit = new RateLimit(redis, {
  prefix: 'codehouse:contact',
  limit: 2,
  windowSeconds: 60 * 60,
});
