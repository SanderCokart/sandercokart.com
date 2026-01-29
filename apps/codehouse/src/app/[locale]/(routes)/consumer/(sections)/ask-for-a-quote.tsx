'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent } from '@repo/ui/components/shadcn/card';
import {
  Form,
  FormControl,
  FormDynamicDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@repo/ui/components/shadcn/form';
import { Input } from '@repo/ui/components/shadcn/input';
import { Textarea } from '@repo/ui/components/shadcn/textarea';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ComponentProps, FC } from 'react';

import { env } from '@/src/env';

import { FormStatus } from './components/form-status';

export const AskForAQuote: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('AskForAQuote');
  const tZod = useTranslations('zod');
  const tForm = useTranslations('form');

  const formSchema = z.object({
    name: z.string().min(1, tZod('errors.required', { name: tForm('name') })),
    email: z
      .string()
      .min(1, tZod('errors.required', { name: tForm('email') }))
      .email(tZod('errors.invalid_string.email', { name: tForm('email') })),
    phone: z.string().optional(),
    website: z.union([z.string().length(0), z.httpUrl()]),
  });

  type AskForAQuoteFormValues = z.infer<typeof formSchema>;

  const form = useForm<AskForAQuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
    },
  });

  const handleSubmit = form.handleSubmit(async formData => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/contact`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to submit form');
  });

  return (
    <section className={cn('container relative max-w-screen-md py-12', className)} {...props}>
      <FormStatus form={form} />
      <h2 className="mb-4 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-muted-foreground mb-8 text-center">{t('description')}</p>
      <Form {...form}>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="bg-card text-card-foreground border-primary mx-auto rounded-lg border p-6 shadow-sm">
          <h3 className="mb-4 text-center text-2xl font-bold">{t('form_title')}</h3>
          <p className="text-muted-foreground mb-6 text-balance text-center">{t('form_description')}</p>

          <div className="flex flex-col gap-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_name_label')}</FormLabel>
                  <FormControl>
                    <Input required placeholder={t('questions_name_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_name_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_email_label')}</FormLabel>
                  <FormControl>
                    <Input required type="email" placeholder={t('questions_email_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_email_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_phone_label')}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+31 6 12345678" {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_phone_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Existing website */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_website_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('questions_website_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_website_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full">
            {t('submit_button')}
          </Button>
        </form>
      </Form>
    </section>
  );
};
