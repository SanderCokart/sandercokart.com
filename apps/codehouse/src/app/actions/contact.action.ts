'use server';

import { ContactOutput, contactSchema } from '@/schemas/contact.schema';

export type ContactFormState<T extends ContactOutput> = {
  message: string;
  fields?: Record<string, string>;
  issues?: {
    [K in keyof T]?: {
      message: string;
      all: string[];
    };
  };
};

export const onContactFormSubmit = async (
  prevState: ContactFormState<ContactOutput>,
  formData: FormData,
): Promise<ContactFormState<ContactOutput>> => {
  const data = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(data);

  const fields = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.toString()]));

  if (!parsed.success) {
    const keys = Object.keys(data) as (keyof ContactOutput)[];
    const issues: ContactFormState<ContactOutput>['issues'] = {};
    const errors = parsed.error.format();
    keys.forEach(key => {
      issues[key] = {
        message: errors[key]?._errors[0] as string,
        all: errors[key]?._errors as string[],
      };
    });

    return {
      message: 'Invalid form data',
      fields,
      issues,
    };
  }

  return {
    message: 'Form submitted successfully',
  };
};
