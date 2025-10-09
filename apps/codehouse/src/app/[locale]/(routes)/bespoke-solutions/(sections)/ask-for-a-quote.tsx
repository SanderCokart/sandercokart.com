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
import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/shadcn/toggle-group';
import { cn } from '@repo/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ComponentProps, FC } from 'react';

import { env } from '@/src/env';

import { FormStatus } from './components/form-status';

const formSchema = z
  .object({
    projectName: z.string().min(1),
    projectDescription: z.string().min(1),
    targetAudience: z.string().optional(),
    desiredFeatures: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    hasExistingWebsite: z.boolean().default(false),
    existingWebsiteLink: z.string().optional(),
    needsInternationalization: z.boolean().default(false),
  })
  .refine(data => !data.hasExistingWebsite || !!data.existingWebsiteLink, {
    params: { i18n: 'existingWebsiteLink_required' },
  });

type AskForAQuoteFormValues = z.infer<typeof formSchema>;

export const AskForAQuote: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('AskForAQuote');

  const form = useForm<AskForAQuoteFormValues>({
    resolver: zodResolver(formSchema) as Resolver<AskForAQuoteFormValues>,
    defaultValues: {
      projectName: '',
      projectDescription: '',
      targetAudience: '',
      desiredFeatures: '',
      budget: '',
      timeline: '',
      hasExistingWebsite: false,
      existingWebsiteLink: '',
      needsInternationalization: false,
    },
  });

  const hasExistingWebsite = form.watch('hasExistingWebsite');

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
          className="bg-card text-card-foreground mx-auto rounded-lg border p-6 shadow-sm">
          <h3 className="mb-4 text-center text-2xl font-bold">{t('form_title')}</h3>
          <p className="text-muted-foreground mb-6 text-balance text-center">{t('form_description')}</p>

          <div className="flex flex-col gap-8">
            {/* Project name */}
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_projectName_label')}</FormLabel>
                  <FormControl>
                    <Input required placeholder={t('questions_projectName_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_projectName_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Project description */}
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_projectDescription_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder={t('questions_projectDescription_placeholder')}
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_projectDescription_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Target audience */}
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_targetAudience_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('questions_targetAudience_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_targetAudience_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Desired Features */}
            <FormField
              control={form.control}
              name="desiredFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_desiredFeatures_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('questions_desiredFeatures_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_desiredFeatures_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />
            {/* Budget */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_budget_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('questions_budget_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_budget_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />
            {/* Timeline */}
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_timeline_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('questions_timeline_placeholder')} {...field} />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_timeline_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />
            {/* Has custom domain */}

            <Card className="border-primary/50 overflow-hidden">
              <CardContent>
                <FormField
                  control={form.control}
                  name="hasExistingWebsite"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{t('questions_hasExistingWebsite_label')}</FormLabel>
                        <FormDynamicDescription>{t('questions_hasExistingWebsite_description')}</FormDynamicDescription>
                      </div>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          onValueChange={value => value && field.onChange(value === 'yes')}
                          value={field.value ? 'yes' : 'no'}>
                          <ToggleGroupItem value="yes">{t('yes')}</ToggleGroupItem>
                          <ToggleGroupItem value="no">{t('no')}</ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <AnimatePresence mode="wait">
                  {hasExistingWebsite && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '24px' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}>
                      <FormField
                        control={form.control}
                        name="existingWebsiteLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('questions_existingWebsiteLink_label')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('questions_existingWebsiteLink_placeholder')} {...field} />
                            </FormControl>
                            <FormDynamicDescription>
                              {t('questions_existingWebsiteLink_description')}
                            </FormDynamicDescription>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Needs internationalization */}
            <Card className="border-primary/50">
              <CardContent>
                <FormField
                  control={form.control}
                  name="needsInternationalization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{t('questions_needsInternationalization_label')}</FormLabel>
                        <FormDynamicDescription>
                          {t('questions_needsInternationalization_description')}
                        </FormDynamicDescription>
                      </div>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          onValueChange={value => value && field.onChange(value === 'yes')}
                          value={field.value ? 'yes' : 'no'}>
                          <ToggleGroupItem value="yes">{t('yes')}</ToggleGroupItem>
                          <ToggleGroupItem value="no">{t('no')}</ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full">
            {t('submit_button')}
          </Button>
        </form>
      </Form>
    </section>
  );
};
