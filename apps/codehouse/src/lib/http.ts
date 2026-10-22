export class Http {
  public ip(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwarded) {
      return forwarded;
    }

    const realIp = request.headers.get('x-real-ip')?.trim();
    if (realIp) {
      return realIp;
    }

    return 'unknown';
  }
}
