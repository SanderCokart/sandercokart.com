import { ZodError } from 'zod';

export type Issues<T extends Record<string, any>> = {
  [K in keyof T]?: {
    message: string;
    all: string[];
  };
};

export type FormState<T extends Record<string, any>> = {
  message: string;
  fields?: Record<string, FormDataEntryValue>;
  issues?: Issues<T>;
};

export function mapErrorToIssues<T extends Record<string, any>>(error: ZodError<T>) {
  const formattedErrors = error.format();

  const issues = Object.fromEntries(
    Object.entries(formattedErrors).map(([key, value]) => {
      if (value && Array.isArray(value)) {
        return [key, { message: value[0], all: value }];
      }
      return [key, { message: 'Unknown error', all: [] }];
    }),
  );

  return issues as Issues<T>;
}

export function extractFieldsFromFormData(formData: FormData) {
  return Object.fromEntries(formData);
}
