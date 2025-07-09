import { Section } from '@/src/components/section';
import { getTranslations } from 'next-intl/server';

import { ContactForm } from './components/contact-form';

export async function ContactSection() {
  const t = await getTranslations('contact-form');

  return (
    <Section className="container max-w-screen-lg" id="contact">
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <ContactForm />
    </Section>
  );
}
