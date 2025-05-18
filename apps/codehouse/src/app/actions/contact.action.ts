'use server';

import { setServerZodI18nMap } from '@repo/i18n/zod';

import { mapErrorToIssues } from '@/src/app/actions/form-helpers';
import { env } from '@/src/env';
import { contactSchema } from '@/src/schemas/contact.schema';

type FormState = {
  message: string;
  fields?: Record<string, FormDataEntryValue>;
  issues?: Record<string, { message: string; all: string[] }>;
};

export async function onContactFormSubmit(prevState: unknown, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData);

  await setServerZodI18nMap();

  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      fields: Object.fromEntries(formData),
      issues: mapErrorToIssues(parsed.error),
    };
  }

  const response = await fetch(env.NEXT_PUBLIC_API_URL + '/v1/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    return {
      message: 'Failed to submit form',
      fields: Object.fromEntries(formData),
    };
  }

  return {
    message: 'Form submitted successfully',
  };
}
