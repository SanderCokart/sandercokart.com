import { createTransport } from 'nodemailer';

import type { Transporter } from 'nodemailer';

import { env } from '@/env';

export type MailMessage = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export class Mail {
  private readonly transporter: Transporter;

  public constructor() {
    const username = env.MAIL_USERNAME;

    this.transporter = createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_ENCRYPTION === 'ssl',
      requireTLS: env.MAIL_ENCRYPTION === 'tls',
      auth: username
        ? {
            user: username,
            pass: env.MAIL_PASSWORD ?? '',
          }
        : undefined,
    });
  }

  public async send(message: MailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: env.MAIL_FROM_NAME,
        address: env.MAIL_FROM_ADDRESS,
      },
      to: {
        name: env.MAIL_TO_NAME,
        address: env.MAIL_TO_ADDRESS,
      },
      ...(message.replyTo ? { replyTo: message.replyTo } : {}),
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
  }
}

export const mail = new Mail();
