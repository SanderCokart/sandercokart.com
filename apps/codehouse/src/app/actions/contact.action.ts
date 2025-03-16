'use server';

import { setServerZodI18nMap } from '@repo/i18n/zod';
import { FormState } from 'react-hook-form';

import { extractFieldsFromFormData, mapErrorToIssues } from '@/src/app/actions/form-helpers';
import { env } from '@/src/env';
import { ContactFormType, contactSchema } from '@/src/schemas/contact.schema';

export async function onContactFormSubmit(prevState: FormState<ContactFormType>, formData: FormData) {
  const data = extractFieldsFromFormData(formData);

  await setServerZodI18nMap();

  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      fields: extractFieldsFromFormData(formData),
      issues: mapErrorToIssues(parsed.error),
    };
  }

  const response = await fetch(env.NEXT_PUBLIC_API_URL + '/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    return {
      message: 'Failed to submit form',
      fields: extractFieldsFromFormData(formData),
    };
  }

  return {
    message: 'Form submitted successfully',
  };
}
