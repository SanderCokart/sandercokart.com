import { createClient } from 'redis';

import type { RedisClientType } from 'redis';

import { env } from '@/env';

export class Redis {
  private connecting: Promise<RedisClientType> | undefined;

  public async eval(script: string, keys: string[], args: string[]): Promise<unknown> {
    const client = await this.client();

    return client.eval(script, {
      keys,
      arguments: args,
    });
  }

  private async client(): Promise<RedisClientType> {
    this.connecting ??= this.connect().catch(error => {
      this.connecting = undefined;
      throw error;
    });

    return this.connecting;
  }

  private async connect(): Promise<RedisClientType> {
    const client = createClient({
      socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
      password: env.REDIS_PASSWORD,
    });

    client.on('error', error => {
      console.error('Redis client error', error);
    });

    await client.connect();

    return client;
  }
}

export const redis = new Redis();
