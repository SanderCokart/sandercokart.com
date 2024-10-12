import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.string().email(),
  subject: z.string().trim().min(2).max(255),
  message: z.string().trim().min(2).max(1000),
});

export type ContactOutput = z.output<typeof contactSchema>;
