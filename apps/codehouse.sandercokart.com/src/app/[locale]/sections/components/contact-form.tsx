'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { Button } from '@repo/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { Textarea } from '@repo/ui/textarea';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { LuAlertCircle, LuCheckCircle } from 'react-icons/lu';
import * as Yup from 'yup';
import { en, nl } from 'yup-locales';

import { useState } from 'react';

import type { AnimationType, Locales } from '@/types/common';

import { AnimatePresence, MotionDiv } from '@/lib/motion';

const createFormSchema = () => {
  const locales = { nl, en };
  const locale = useLocale() as Locales;
  Yup.setLocale(locales[locale]);

  return Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    subject: Yup.string().required(),
    message: Yup.string().required(),
  });
};

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
  const schema = createFormSchema();
  const [hasError, setHasError] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const disabled = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async formData => {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      setHasError(true);

      throw new Error('Failed to submit form');
    }
  });

  return (
    <Form {...form}>
      <form noValidate className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="name" placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="email" placeholder="example@domain.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('subject')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="subject" placeholder="Subject" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')}</FormLabel>
              <FormControl>
                <Textarea {...field} required disabled={disabled} id="message" placeholder="Your message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{form.formState.isSubmitting ? t('submitting') : t('submit')}</Button>

        <AnimatePresence>
          {form.formState.isSubmitSuccessful && (
            <MotionDiv key="success" {...animation}>
              <SuccessAlert />
            </MotionDiv>
          )}
          {hasError && (
            <MotionDiv key="error" {...animation}>
              <ErrorAlert />
            </MotionDiv>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
}

function ErrorAlert() {
  const t = useTranslations('home.contact-form.form.error');

  return (
    <Alert>
      <LuAlertCircle className="h-4 w-4 stroke-destructive" />
      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription>{t('description')}</AlertDescription>
    </Alert>
  );
}

function SuccessAlert() {
  const t = useTranslations('home.contact-form.form.alert');

  return (
    <Alert>
      <LuCheckCircle className="h-4 w-4 stroke-accent" />
      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription>{t('description')}</AlertDescription>
    </Alert>
  );
}
