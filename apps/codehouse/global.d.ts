type GlobalMessages = typeof import('./messages/en.json');
type ZodMessages = typeof import('./messages/zod/en.json');
type Messages = GlobalMessages & ZodMessages;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
