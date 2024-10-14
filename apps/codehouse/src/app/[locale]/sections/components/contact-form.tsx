'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { Button } from '@repo/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { Textarea } from '@repo/ui/textarea';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { LuAlertCircle, LuCheckCircle } from 'react-icons/lu';

import { useRef } from 'react';

import type { ContactForm } from '@/schemas/contact.schema';
import type { AnimationType } from '@/types/common';

import { onContactFormSubmit } from '@/app/actions/contact.action';
import { contactSchema } from '@/schemas/contact.schema';

const animation: AnimationType = {
  exit: 'exit',
  initial: 'initial',
  animate: 'animate',
  variants: {
    initial: { height: 0, transition: { duration: 1 } },
    animate: { height: 'auto', transition: { duration: 1 } },
    exit: { height: 0, transition: { duration: 1 } },
  },
};

export function ContactForm() {
  const t = useTranslations('home.contact-form.form');
  const [state, formAction] = useFormState(onContactFormSubmit, { message: '' });
  const ref = useRef<HTMLFormElement>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...(state?.fields ?? {}),
    },
  });

  const disabled = form.formState.isSubmitting;

  return (
    <Form {...form}>
      {state.message && <div>{state.message}</div>}
      <form
        ref={ref}
        noValidate
        action={formAction}
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(() => ref.current?.submit())}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="name" placeholder="John Doe" />
              </FormControl>
              <FormMessage>{state.issues?.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="email" placeholder="example@domain.com" />
              </FormControl>
              <FormMessage>{state.issues?.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('subject')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="subject" placeholder="Subject" />
              </FormControl>
              <FormMessage>{state.issues?.subject?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')}</FormLabel>
              <FormControl>
                <Textarea {...field} required disabled={disabled} id="message" placeholder="Your message" />
              </FormControl>
              <FormMessage>{state.issues?.message?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit">{form.formState.isSubmitting ? t('submitting') : t('submit')}</Button>
      </form>
    </Form>
  );
}

function ErrorAlert() {
  const t = useTranslations('home.contact-form.form.error');

  return (
    <Alert>
      <LuAlertCircle className="stroke-destructive h-4 w-4" />
      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription>{t('description')}</AlertDescription>
    </Alert>
  );
}

function SuccessAlert() {
  const t = useTranslations('home.contact-form.form.alert');

  return (
    <Alert>
      <LuCheckCircle className="stroke-accent h-4 w-4" />
      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription>{t('description')}</AlertDescription>
    </Alert>
  );
}
