'use client';

import { useTranslations } from 'next-intl';

import { ContactForm } from './components/contact-form';

export function ContactSection() {
  const t = useTranslations('home.contact-form');

  return (
    <section className="scroll-mt-16 sm:scroll-mt-16" id="contact-form">
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <ContactForm />
    </section>
  );
}
