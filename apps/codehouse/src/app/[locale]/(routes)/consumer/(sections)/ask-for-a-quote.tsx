'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@repo/ui/components/shadcn/field';
import { Input } from '@repo/ui/components/shadcn/input';
import { Textarea } from '@repo/ui/components/shadcn/textarea';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useState } from 'react';

import type { ComponentProps, FC } from 'react';

import { env } from '@/src/env';

import { FormStatus } from './components/form-status';

const formId = 'ask-for-a-quote-form';
const sectionId = 'ask-for-a-quote';

function isEmailContact(value: string): boolean {
  return value.includes('@');
}

function isValidPhoneContact(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export const AskForAQuote: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('AskForAQuote');
  const tZod = useTranslations('zod');
  const tForm = useTranslations('form');

  const formSchema = z.object({
    contact: z
      .string()
      .trim()
      .min(1, tZod('errors.required', { name: tForm('contact') }))
      .refine(
        value => (isEmailContact(value) ? z.email().safeParse(value).success : isValidPhoneContact(value)),
        tZod('errors.invalid', { name: tForm('contact') }),
      ),
    message: z.string().min(1, tZod('errors.required', { name: tForm('projectDescription') })),
    name: z.string().optional(),
    website: z
      .string()
      .transform(value => value.trim())
      .pipe(z.union([z.literal(''), z.httpUrl(tZod('errors.invalid_string.url', { name: tForm('website') }))])),
    specifications: z.array(z.object({ value: z.string() })).optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: '',
      message: '',
      name: '',
      website: '',
      specifications: [],
    },
  });

  const [lastResponse, setLastResponse] = useState<Response | null>(null);

  const specsFieldArray = useFieldArray({
    control: form.control,
    name: 'specifications',
  });

  const specPlaceholderCycle = [
    t('spec_placeholder_internationalization'),
    t('spec_placeholder_contact_form'),
    t('spec_placeholder_seo_analytics'),
    t('spec_placeholder_ecommerce'),
    t('spec_placeholder_blog'),
  ];

  const handleSubmit = form.handleSubmit(async formData => {
    setLastResponse(null);

    const contact = formData.contact.trim();
    const contactIsEmail = isEmailContact(contact);
    const specifications = formData.specifications?.map(spec => spec.value.trim()).filter(spec => spec.length > 0);

    const payload = {
      email: contactIsEmail ? contact : null,
      phone: contactIsEmail ? null : contact,
      message: formData.message,
      name: formData.name?.trim() ? formData.name.trim() : null,
      website: formData.website?.trim() ? formData.website.trim() : null,
      specifications: specifications?.length ? specifications : null,
    };

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

      for (const [key, messages] of Object.entries(errors)) {
        const first = messages[0];
        if (!first) continue;
        if (key === 'email' || key === 'phone') {
          form.setError('contact', { type: 'server', message: first });
          continue;
        }
        if (key in form.getValues()) {
          form.setError(key as keyof FormValues, { type: 'server', message: first });
        }
      }
    }
  });

  return (
    <section {...props} className={cn('relative container max-w-3xl py-12', className)}>
      <FormStatus lastResponse={lastResponse} form={form} />
      <h2 id={sectionId} className="mb-4 scroll-mt-20 text-center text-3xl font-bold uppercase sm:text-5xl">
        {t('title')}
      </h2>
      <p className="text-muted-foreground mb-8 text-center">{t('description')}</p>

      <Card className="border-primary mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('form_title')}</CardTitle>
          <CardDescription className="text-balance">{t('form_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id={formId} noValidate onSubmit={handleSubmit}>
            <FieldGroup className="flex flex-col gap-8">
              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-contact`}>{t('questions_contact_label')}</FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-contact`}
                      type="text"
                      autoComplete="on"
                      aria-invalid={fieldState.invalid}
                      placeholder={t('questions_contact_placeholder')}
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

              <Accordion className="w-full">
                <AccordionItem value="extras">
                  <AccordionTrigger>{t('extras_trigger')}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-8 pt-4">
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

                    <div>
                      <FieldLabel>{t('questions_specifications_label')}</FieldLabel>
                      <FieldDescription>{t('questions_specifications_description')}</FieldDescription>
                      <ul className="mt-4 flex flex-col gap-3">
                        {specsFieldArray.fields.map((item, index) => (
                          <li key={item.id} className="flex gap-3">
                            <Controller
                              name={`specifications.${index}.value`}
                              control={form.control}
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
                            onClick={() => specsFieldArray.append({ value: '' })}
                            className="w-full">
                            {t('spec_add_button')}
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FieldGroup>

            <Button type="submit" size="lg" className="mt-6 w-full">
              {t('submit_button')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
