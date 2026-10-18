import { renderTemplate } from '@repo/mail';

import { contactPayloadSchema, fieldErrorsFromZod, toContactEmailProps } from '@/lib/contact-schema';
import { mail } from '@/lib/mail';
import { contactRateLimit } from '@/lib/rate-limit';
import { tryCatch } from '@/lib/try-catch';

export async function POST(request: Request): Promise<Response> {
  const rateLimit = await contactRateLimit.consume(request);
  const headers = contactRateLimit.headers(rateLimit);

  if (!rateLimit.allowed) {
    return new Response(null, { status: 429, headers });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Invalid JSON.' }, { status: 400, headers });
  }

  const parsed = contactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ errors: fieldErrorsFromZod(parsed.error) }, { status: 422, headers });
  }

  const { html, text } = await renderTemplate('contact-form', {
    ...toContactEmailProps(parsed.data),
  });

  const { error } = await tryCatch(
    mail.send({
      subject: 'New Contact Form Submission',
      html,
      text,
      ...(parsed.data.email ? { replyTo: parsed.data.email } : {}),
    }),
  );

  if (error) {
    console.error('Failed to send contact email', error);
    return new Response(null, { status: 500, headers });
  }

  return new Response(null, { status: 204, headers });
}
