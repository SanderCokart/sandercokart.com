import { z } from 'zod';

export const MESSAGE_MAX_LENGTH = 1000;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(255),
  message: z.string().trim().min(1).max(MESSAGE_MAX_LENGTH),
});

export type ContactFormType = z.infer<typeof contactSchema>;
