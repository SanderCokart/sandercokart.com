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

  const issues: Issues<T> = {};

  for (const [key, value] of Object.entries(formattedErrors)) {
    if (typeof value === 'object' && !Array.isArray(value) && value.hasOwnProperty('_errors')) {
      issues[key as keyof T] = { message: value._errors[0] as string, all: value._errors };
    }
  }

  return issues;
}
