import { ContactFormEmail } from './templates/contact-form';

export const templates = {
  'contact-form': ContactFormEmail,
} as const;

export type TemplateName = keyof typeof templates;

export function isTemplateName(name: string): name is TemplateName {
  return Object.hasOwn(templates, name);
}
