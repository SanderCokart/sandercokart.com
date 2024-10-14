'use server';

import type { FormState } from '@/app/actions/form-helpers';

import { API_URL } from '@/app.config.mjs';
import { extractFieldsFromFormData, mapErrorToIssues } from '@/app/actions/form-helpers';
import { makeZodI18nMap, setServerZodI18nMap } from '@/app/utils/zod-error-map';
import { ContactFormType, contactSchema } from '@/schemas/contact.schema';

export async function onContactFormSubmit(
  prevState: FormState<ContactFormType>,
  formData: FormData,
): Promise<FormState<ContactFormType>> {
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

  const response = await fetch(API_URL + '/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed.data),
  });

  if (!response.ok) {
    console.error('ERROR: ', await response.json());

    return {
      message: 'Failed to submit form',
      fields: extractFieldsFromFormData(formData),
    };
  }

  console.log('LOG: ', await response.json());

  return {
    message: 'Form submitted successfully',
  };
}
