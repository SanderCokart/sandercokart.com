'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/shadcn/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@repo/ui/components/shadcn/field';
import { Input } from '@repo/ui/components/shadcn/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/shadcn/tabs';
import { Textarea } from '@repo/ui/components/shadcn/textarea';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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

  const [activeTab, setActiveTab] = useState<'simple' | 'detailed'>('simple');

  const simpleFormSchema = z.object({
    contact: z.string().min(1, tZod('errors.required', { name: tForm('contact') })),
    message: z.string().min(1, tZod('errors.required', { name: tForm('projectDescription') })),
  });

  type SimpleFormValues = z.infer<typeof simpleFormSchema>;

  const detailedFormSchema = z.object({
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
    // Optional list; detailed tab appends specs, but the backend allows empty/omitted.
    specifications: z.array(z.string().min(1)).optional(),
  });

  type DetailedFormValues = z.infer<typeof detailedFormSchema>;

  const simpleForm = useForm<SimpleFormValues>({
    resolver: zodResolver(simpleFormSchema),
    defaultValues: {
      contact: '',
      message: '',
    },
  });

  const detailedForm = useForm<DetailedFormValues>({
    resolver: zodResolver(detailedFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      message: '',
      specifications: [],
    },
  });

  const [lastResponse, setLastResponse] = useState<Response | null>(null);

  // Typing for `useFieldArray` is strict in this repo; keep runtime correct while avoiding TS path errors.
  const specsFieldArray = useFieldArray({
    control: detailedForm.control,
    name: 'specifications' as unknown as never,
  });

  const specPlaceholderCycle = [
    t('spec_placeholder_internationalization'),
    t('spec_placeholder_contact_form'),
    t('spec_placeholder_seo_analytics'),
    t('spec_placeholder_ecommerce'),
    t('spec_placeholder_blog'),
  ];

  const handleSimpleSubmit = simpleForm.handleSubmit(async formData => {
    setLastResponse(null);

    const looksLikeEmail = formData.contact.includes('@');
    const payload = looksLikeEmail
      ? { variant: 'simple' as const, email: formData.contact, phone: null, message: formData.message }
      : { variant: 'simple' as const, email: null, phone: formData.contact, message: formData.message };

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/contact`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
    });

    setLastResponse(response);

    if (response.status === 422) {
      const body = (await response.json()) as { errors?: Record<string, string[]> };
      const errors = body.errors ?? {};
      // Backend should use stable keys like `email`, `phone`, `message`.
      const contactError = errors.email?.[0] ?? errors.phone?.[0] ?? undefined;
      if (contactError) {
        simpleForm.setError('contact', { type: 'server', message: contactError });
      }

      const messageError = errors.message?.[0];
      if (messageError) {
        simpleForm.setError('message', { type: 'server', message: messageError });
      }
    }
  });

  const handleDetailedSubmit = detailedForm.handleSubmit(async formData => {
    setLastResponse(null);

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/contact`, {
      method: 'POST',
      body: JSON.stringify({ variant: 'detailed' as const, ...formData }),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
    });

    setLastResponse(response);

    if (response.status === 422) {
      const body = (await response.json()) as { errors?: Record<string, string[]> };
      const errors = body.errors ?? {};

      for (const [key, messages] of Object.entries(errors)) {
        const first = messages[0];
        if (!first) continue;
        if (key in detailedForm.getValues()) {
          detailedForm.setError(key as keyof DetailedFormValues, { type: 'server', message: first });
          continue;
        }
      }
    }
  });

  return (
    <section className={cn('relative container max-w-3xl py-12', className)} {...props}>
      <FormStatus lastResponse={lastResponse} form={simpleForm} />
      <h2 className="mb-4 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-muted-foreground mb-8 text-center">{t('description')}</p>
      <div className="bg-card text-card-foreground border-primary mx-auto rounded-lg border p-6 shadow-sm">
        <h3 className="mb-4 text-center text-2xl font-bold">
          {activeTab === 'simple' ? t('form_title_simple') : t('form_title')}
        </h3>
        <p className="text-muted-foreground mb-6 text-center text-balance">
          {activeTab === 'simple' ? t('form_description_simple') : t('form_description')}
        </p>

        <Tabs
          defaultValue="simple"
          value={activeTab}
          onValueChange={value => setActiveTab(value === 'detailed' ? 'detailed' : 'simple')}
          className="w-full">
          <TabsList className="mx-auto w-fit">
            <TabsTrigger value="simple">{t('tabs_simple_label')}</TabsTrigger>
            <TabsTrigger value="detailed">{t('tabs_detailed_label')}</TabsTrigger>
          </TabsList>

          <TabsContent value="simple">
            <form id={`${formId}-simple`} noValidate onSubmit={handleSimpleSubmit} className="mt-6">
              <FieldGroup className="flex flex-col gap-8">
                <Controller
                  name="contact"
                  control={simpleForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-contact`}>{t('questions_contact_label')}</FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-contact`}
                        aria-invalid={fieldState.invalid}
                        placeholder={t('questions_contact_placeholder')}
                        inputMode="email"
                      />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <FieldDescription>{t('questions_contact_description')}</FieldDescription>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="message"
                  control={simpleForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-simple-message`}>
                        {t('questions_projectDescription_label')}
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id={`${formId}-simple-message`}
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
          </TabsContent>

          <TabsContent value="detailed">
            <form id={`${formId}-detailed`} noValidate onSubmit={handleDetailedSubmit} className="mt-6">
              <FieldGroup className="flex flex-col gap-8">
                <Controller
                  name="name"
                  control={detailedForm.control}
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
                  control={detailedForm.control}
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
                  control={detailedForm.control}
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
                  control={detailedForm.control}
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
                  control={detailedForm.control}
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

                <div>
                  <FieldLabel>{t('questions_specifications_label')}</FieldLabel>
                  <FieldDescription>{t('questions_specifications_description')}</FieldDescription>
                  <ul className="mt-4 flex flex-col gap-3">
                    {specsFieldArray.fields.map((item, index) => (
                      <li key={item.id} className="flex gap-3">
                        <Controller
                          name={`specifications.${index}` as const}
                          control={detailedForm.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex-1">
                              <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder={specPlaceholderCycle[index % specPlaceholderCycle.length]}
                              />
                              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                            </Field>
                          )}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => specsFieldArray.remove(index)}
                          className="px-3">
                          {t('spec_remove_button')}
                        </Button>
                      </li>
                    ))}
                    <li>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => specsFieldArray.append('' as never)}
                        className="w-full">
                        {t('spec_add_button')}
                      </Button>
                    </li>
                  </ul>
                </div>
              </FieldGroup>

              <Button type="submit" size="lg" className="mt-6 w-full">
                {t('submit_button')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
