'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent } from '@repo/ui/components/shadcn/card';
import {
  Form,
  FormControl,
  FormDescription,
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

import { ComponentProps, FC } from 'react';

const formSchema = z.object({
  projectName: z.string().min(1, { message: 'Project name is required.' }),
  projectDescription: z.string().min(1, { message: 'Project description is required.' }),
  targetAudience: z.string().optional(),
  desiredFeatures: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  hasCustomDomain: z.boolean().default(false),
  customDomainName: z.string().optional(),
  needsInternationalization: z.boolean().default(false),
  hasHosting: z.boolean().default(false),
  needsFullHostingCare: z.boolean().default(false),
  needsSeoOptimization: z.boolean().default(false),
  needsAccessibility: z.boolean().default(false),
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
      hasCustomDomain: false,
      customDomainName: '',
      needsInternationalization: false,
      hasHosting: false,
      needsFullHostingCare: false,
      needsSeoOptimization: false,
      needsAccessibility: false,
    },
  });

  const hasHosting = form.watch('hasHosting');
  const hasCustomDomain = form.watch('hasCustomDomain');

  const handleSubmit = form.handleSubmit(data => {
    console.log(data);
  });

  return (
    <section className={cn('container max-w-screen-md py-12', className)} {...props}>
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
            {/* Project Name */}
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

            {/* Project Description */}
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('questions_projectDescription_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('questions_projectDescription_placeholder')}
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDynamicDescription>{t('questions_projectDescription_description')}</FormDynamicDescription>
                </FormItem>
              )}
            />

            {/* Target Audience */}
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
            {/* Has Custom Domain */}
            <Card className="border-primary/50 overflow-hidden">
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="hasCustomDomain"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{t('questions_hasCustomDomain_label')}</FormLabel>
                        <FormDynamicDescription>{t('questions_hasCustomDomain_description')}</FormDynamicDescription>
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
                  {hasCustomDomain ? (
                    <motion.div
                      key="currentCustomDomainName"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <FormField
                        control={form.control}
                        name="customDomainName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('questions_currentCustomDomainName_label')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('questions_currentCustomDomainName_placeholder')} {...field} />
                            </FormControl>
                            <FormDynamicDescription>
                              {t('questions_currentCustomDomainName_description')}
                            </FormDynamicDescription>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="customDomainName"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <FormField
                        control={form.control}
                        name="customDomainName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('questions_customDomainName_label')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('questions_customDomainName_placeholder')} {...field} />
                            </FormControl>
                            <FormDynamicDescription>
                              {t('questions_customDomainName_description')}
                            </FormDynamicDescription>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
            {/* Needs Internationalization */}
            <Card className="border-accent/10">
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
            {/* Has Hosting */}
            <Card className="border-accent/10">
              <CardContent>
                <FormField
                  control={form.control}
                  name="hasHosting"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{t('questions_hasHosting_label')}</FormLabel>
                        <FormDescription>{t('questions_hasHosting_description')}</FormDescription>
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

            {/* Needs Full Hosting Care (Conditional) */}
            {hasHosting && (
              <Card className="border-accent/10">
                <CardContent>
                  <FormField
                    control={form.control}
                    name="needsFullHostingCare"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{t('questions_needsFullHostingCare_label')}</FormLabel>
                          <FormDescription>{t('questions_needsFullHostingCare_description')}</FormDescription>
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
            )}

            {/* Needs SEO Optimization */}
            <Card className="border-accent/10">
              <CardContent>
                <FormField
                  control={form.control}
                  name="needsSeoOptimization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{t('questions_needsSeoOptimization_label')}</FormLabel>
                        <FormDescription>{t('questions_needsSeoOptimization_description')}</FormDescription>
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
            {/* Needs Accessibility */}
            <Card className="border-accent/10">
              <CardContent>
                <FormField
                  control={form.control}
                  name="needsAccessibility"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{t('questions_needsAccessibility_label')}</FormLabel>
                        <FormDescription>{t('questions_needsAccessibility_description')}</FormDescription>
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
