'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/shadcn/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@repo/ui/components/shadcn/field';
import { Input } from '@repo/ui/components/shadcn/input';
import { Textarea } from '@repo/ui/components/shadcn/textarea';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useState } from 'react';

import type { ComponentProps, FC } from 'react';

import { env } from '@/src/env';

import { FormStatus } from './components/form-status';

const formId = 'ask-for-a-quote';

export const AskForAQuote: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('AskForAQuote');
  const tZod = useTranslations('zod');
  const tForm = useTranslations('form');

  const formSchema = z.object({
    name: z.string().min(1, tZod('errors.required', { name: tForm('name') })),
    email: z
      .email(tZod('errors.invalid_string.email', { name: tForm('email') }))
      .min(1, tZod('errors.required', { name: tForm('email') })),
    phone: z.string().optional(),
    website: z
      .string()
      .transform(value => value.trim())
      .pipe(z.union([z.literal(''), z.httpUrl(tZod('errors.invalid_string.url', { name: tForm('website') }))])),
    message: z.string().min(1, tZod('errors.required', { name: tForm('projectDescription') })),
  });

  type AskForAQuoteFormValues = z.infer<typeof formSchema>;

  const form = useForm<AskForAQuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      message: '',
    },
  });

  const [lastResponse, setLastResponse] = useState<Response | null>(null);

  const handleSubmit = form.handleSubmit(async formData => {
    setLastResponse(null);

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/contact`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
    });

    setLastResponse(response);

    if (response.status === 204) {
      return;
    }

    if (response.status === 422) {
      const body = (await response.json()) as { errors?: Record<string, string[]> };
      const errors = body.errors ?? {};
      for (const [key, messages] of Object.entries(errors)) {
        const first = messages[0];
        if (first !== undefined && key in form.getValues()) {
          form.setError(key as keyof AskForAQuoteFormValues, {
            type: 'server',
            message: first,
          });
        }
      }
    }

    // something went wrong
  });

  return (
    <section className={cn('relative container max-w-3xl py-12', className)} {...props}>
      <FormStatus lastResponse={lastResponse} form={form} />
      <h2 className="mb-4 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-muted-foreground mb-8 text-center">{t('description')}</p>
      <form
        id={formId}
        noValidate
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground border-primary mx-auto rounded-lg border p-6 shadow-sm">
        <h3 className="mb-4 text-center text-2xl font-bold">{t('form_title')}</h3>
        <p className="text-muted-foreground mb-6 text-center text-balance">{t('form_description')}</p>

        <FieldGroup className="flex flex-col gap-8">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${formId}-name`}>{t('questions_name_label')}</FieldLabel>
                <Input
                  {...field}
                  id={`${formId}-name`}
                  aria-invalid={fieldState.invalid}
                  placeholder={t('questions_name_placeholder')}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>{t('questions_name_description')}</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${formId}-email`}>{t('questions_email_label')}</FieldLabel>
                <Input
                  {...field}
                  id={`${formId}-email`}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('questions_email_placeholder')}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>{t('questions_email_description')}</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${formId}-phone`}>{t('questions_phone_label')}</FieldLabel>
                <Input
                  {...field}
                  id={`${formId}-phone`}
                  type="tel"
                  aria-invalid={fieldState.invalid}
                  placeholder="+31 6 12345678"
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>{t('questions_phone_description')}</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="website"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${formId}-website`}>{t('questions_website_label')}</FieldLabel>
                <Input
                  {...field}
                  id={`${formId}-website`}
                  aria-invalid={fieldState.invalid}
                  placeholder={t('questions_website_placeholder')}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>{t('questions_website_description')}</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${formId}-message`}>{t('questions_projectDescription_label')}</FieldLabel>
                <Textarea
                  {...field}
                  id={`${formId}-message`}
                  aria-invalid={fieldState.invalid}
                  placeholder={t('questions_projectDescription_placeholder')}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>{t('questions_projectDescription_description')}</FieldDescription>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" size="lg" className="mt-6 w-full">
          {t('submit_button')}
        </Button>
      </form>
    </section>
  );
};
