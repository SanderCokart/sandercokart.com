'use server';

import type { FormState, Issues } from '@/app/actions/form-helpers';

import { extractFieldsFromFormData, mapErrorToIssues } from '@/app/actions/form-helpers';
import { ContactForm, contactSchema } from '@/schemas/contact.schema';

export async function onContactFormSubmit(
  prevState: FormState<ContactForm>,
  formData: FormData,
): Promise<FormState<ContactForm>> {
  const data = extractFieldsFromFormData(formData);

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      fields: extractFieldsFromFormData(formData),
      issues: mapErrorToIssues(parsed.error),
    };
  }

  return {
    message: 'Form submitted successfully',
  };
}
