import { routing } from '@/src/i18n/routing';

// type GlobalMessages = typeof import('./messages/en.json');
// type ZodMessages = typeof import('./messages/zod/en.json');
// type Messages = GlobalMessages & ZodMessages;
import en from './messages/en.json';


// declare global {
  // Use type safe message keys with `next-intl`
  // interface IntlMessages extends Messages {}
// }

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
  }
}
