export type RateLimitHint = {
  requestLimit: number;
  remainingRequests: number;
  cooldownInMinutes: number;
};

export function calculateRateLimitCooldownInMinutes(retryAfterHeader: string): number {
  const retryAfterSeconds = Number.parseInt(retryAfterHeader, 10) || 0;
  return Math.max(1, Math.ceil(retryAfterSeconds / 60));
}

export function processRateLimitResponse(response: Response): RateLimitHint {
  const requestLimit = Number(response.headers.get('X-RateLimit-Limit'));
  const remainingRequests = Number(response.headers.get('X-RateLimit-Remaining'));
  const cooldownInMinutes = calculateRateLimitCooldownInMinutes(response.headers.get('Retry-After') as string);

  return { requestLimit, remainingRequests, cooldownInMinutes };
}
