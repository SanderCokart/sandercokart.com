'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertTitle } from '@repo/ui/components/shadcn/alert';
import { Button } from '@repo/ui/components/shadcn/button';
import {
  AnimatedFormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@repo/ui/components/shadcn/form';
import { Input } from '@repo/ui/components/shadcn/input';
import { Textarea } from '@repo/ui/components/shadcn/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { LuCircleAlert } from 'react-icons/lu';

import { useState } from 'react';

import { tryCatch } from '@/src/lib/try-catch';
import { env } from '@/src/env';
import { ContactFormType, contactSchema, MESSAGE_MAX_LENGTH } from '@/src/schemas/contact.schema';

export function ContactForm() {
  const t = useTranslations('home.contact-form.form');
  const [formMessage, setFormMessage] = useState<string>('');
  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const disabled = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (formData) => {
    const { data, error } = await tryCatch(
      fetch(`${env.NEXT_PUBLIC_API_URL}/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })
    );

    if (error || !data?.ok) {
      setFormMessage(t('error.title'));
      return;
    }

    setFormMessage(t('alert.title'));
    form.reset();
  });

  return (
    <Form {...form}>
      <form noValidate className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input {...field} required disabled={disabled} id="name" placeholder="John Doe" />
              </FormControl>
              <AnimatedFormMessage>{form.formState.errors.name?.message}</AnimatedFormMessage>
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
              <AnimatedFormMessage>{form.formState.errors.email?.message}</AnimatedFormMessage>
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
              <AnimatedFormMessage>{form.formState.errors.subject?.message}</AnimatedFormMessage>
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
                <Textarea
                  maxLength={MESSAGE_MAX_LENGTH}
                  {...field}
                  required
                  disabled={disabled}
                  id="message"
                  placeholder="Your message"
                />
              </FormControl>
              <AnimatedFormMessage>{form.formState.errors.message?.message}</AnimatedFormMessage>
            </FormItem>
          )}
        />

        <AnimatePresence>
          {formMessage && (
            <motion.div
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <Alert>
                <LuCircleAlert className="h-4 w-4" />
                <AlertTitle>{formMessage}</AlertTitle>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit">{form.formState.isSubmitting ? t('submitting') : t('submit')}</Button>
      </form>
    </Form>
  );
}
