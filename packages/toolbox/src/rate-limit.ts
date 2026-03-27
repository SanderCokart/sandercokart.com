export type RateLimitHint = {
  limit: number;
  remaining: number;
};

export function parseRateLimitHint(headers: Headers): RateLimitHint | null {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  if (limit === null || remaining === null) {
    return null;
  }

  const limitNumber = Number(limit);
  const remainingNumber = Number(remaining);
  if (Number.isNaN(limitNumber) || Number.isNaN(remainingNumber)) {
    return null;
  }

  return {
    limit: limitNumber,
    remaining: remainingNumber,
  };
}

export function getRateLimitRetryMinutes(retryAfterHeader: string | null, fallbackSeconds = 3600): number {
  const parsedRetryAfterSeconds =
    retryAfterHeader !== null ? Number.parseInt(retryAfterHeader, 10) : fallbackSeconds;
  const retryAfterSeconds = Number.isNaN(parsedRetryAfterSeconds) ? fallbackSeconds : parsedRetryAfterSeconds;

  return Math.max(1, Math.ceil(retryAfterSeconds / 60));
}
