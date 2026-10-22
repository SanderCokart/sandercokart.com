import { z } from 'zod';

import type { ContactFormEmailProps } from '@repo/mail';

const optionalContactString = z.string().max(255).nullable().optional();

export const contactPayloadSchema = z
  .object({
    area: z.enum(['personal', 'commercial', 'freelance']),
    email: z.email().max(255).nullable().optional(),
    phone: optionalContactString,
    message: z.string().min(1).max(10000),
    name: optionalContactString,
    website: z.url().max(2048).nullable().optional(),
    specifications: z.array(z.string().min(1).max(255)).nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Either email or phone is required.',
      });
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Either email or phone is required.',
      });
    }
  });

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export function fieldErrorsFromZod(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join('.') : '_form';
    errors[key] ??= [];
    errors[key].push(issue.message);
  }

  return errors;
}

export function toContactEmailProps(payload: ContactPayload): ContactFormEmailProps {
  return {
    area: payload.area,
    message: payload.message,
    ...(payload.name ? { name: payload.name } : {}),
    ...(payload.email ? { email: payload.email } : {}),
    ...(payload.phone ? { phone: payload.phone } : {}),
    ...(payload.website ? { website: payload.website } : {}),
    ...(payload.specifications?.length ? { specifications: payload.specifications } : {}),
  };
}
