import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

import { isTemplateName, renderTemplate } from '@repo/mail';

const PORT = Number(process.env.PORT ?? 4010);
const MAX_BODY_BYTES = 1_048_576;

function json(res: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;

    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });

    req.on('error', reject);
  });
}

function pathname(url: string | undefined): string {
  return new URL(url ?? '/', 'http://mail-renderer.local').pathname;
}

const server = createServer((req, res) => {
  void handle(req, res);
});

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const path = pathname(req.url);

  try {
    if (req.method === 'GET' && path === '/health') {
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === 'POST' && path === '/render') {
      const body = await readJsonBody(req);

      if (typeof body !== 'object' || body === null || Array.isArray(body)) {
        json(res, 400, { error: 'JSON object body required' });
        return;
      }

      const { template, props } = body as { template?: unknown; props?: unknown };

      if (typeof template !== 'string' || !isTemplateName(template)) {
        json(res, 400, { error: 'Unknown or missing template' });
        return;
      }

      if (props !== undefined && (typeof props !== 'object' || props === null || Array.isArray(props))) {
        json(res, 400, { error: 'props must be an object' });
        return;
      }

      const rendered = await renderTemplate(template, (props ?? {}) as Record<string, unknown>);
      json(res, 200, rendered);
      return;
    }

    json(res, 404, { error: 'Not found' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message === 'Invalid JSON body' || message === 'Request body too large' ? 400 : 500;
    json(res, status, { error: message });
  }
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`mail-renderer listening on ${PORT}`);
});
