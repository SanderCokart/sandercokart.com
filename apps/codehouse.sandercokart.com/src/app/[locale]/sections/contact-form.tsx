'use client';

import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Textarea } from '@repo/ui/textarea';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';

import { submitContactForm } from '@/app/[locale]/sections/actions/submit-contact-form';
import { SubmitButton } from '@/app/[locale]/sections/components/SubmitButton';

export function ContactForm() {
  const t = useTranslations('home.contact-form');
  const [state, formAction] = useFormState(submitContactForm, {});

  return (
    <section id="contact-form">
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <form action={formAction} className="flex flex-col gap-8">
        <Label className="sr-only" htmlFor="name">
          {t('form.name')}
        </Label>
        <Input id="name" maxLength={50} minLength={5} name="name" pattern=".{5,50}" placeholder={t('form.name')} />
        <Label className="sr-only" htmlFor="email">
          {t('form.email')}
        </Label>
        <Input id="email" maxLength={50} min={5} name="email" pattern=".{5,50}" placeholder={t('form.email')} />
        <Label className="sr-only" htmlFor="subject">
          {t('form.subject')}
        </Label>
        <Input id="subject" maxLength={50} min={10} name="subject" pattern=".{10,50}" placeholder={t('form.subject')} />
        <Label className="sr-only" htmlFor="message">
          {t('form.message')}
        </Label>
        <Textarea id="message" maxLength={300} minLength={30} name="message" placeholder={t('form.message')} rows={8} />
        <SubmitButton />
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </form>
    </section>
  );
}
