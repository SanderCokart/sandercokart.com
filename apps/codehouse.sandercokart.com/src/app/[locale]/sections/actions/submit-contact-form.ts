'use server';

import { z } from 'zod';

//todo i18n
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function submitContactForm(formData: FormData) {
  const result = schema.safeParse(formData);
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const response = await fetch(`${process.env.API_URL}/contact`, {
    method: 'POST',
    body: JSON.stringify(result.data),
  });

  const json = await response.json();

  return json;
}
