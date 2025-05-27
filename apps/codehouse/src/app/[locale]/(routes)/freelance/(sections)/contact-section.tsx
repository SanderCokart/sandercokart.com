import { cn } from '@repo/ui/lib/utils';
import { getTranslations } from 'next-intl/server';

import { ComponentProps, FC } from 'react';

import { ContactForm } from './components/contact-form';

export const ContactSection: FC<ComponentProps<'section'>> = async ({ className, ...props }) => {
  const t = await getTranslations('home.contact-form');

  return (
    <section className={cn('scroll-mt-16 sm:scroll-mt-16', className)} id="contact-form" {...props}>
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <ContactForm />
    </section>
  );
};
