'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertTitle } from '@repo/ui/components/shadcn/alert';
import { Button } from '@repo/ui/components/shadcn/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/shadcn/form';
import { Input } from '@repo/ui/components/shadcn/input';
import { Textarea } from '@repo/ui/components/shadcn/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { LuCircleAlert } from 'react-icons/lu';

import { useActionState, useRef } from 'react';

import { onContactFormSubmit } from '@/src/app/actions/contact.action';
import { ContactFormType, contactSchema, MESSAGE_MAX_LENGTH } from '@/src/schemas/contact.schema';

export function ContactForm() {
  const t = useTranslations('home.contact-form.form');
  const [state, formAction] = useActionState(onContactFormSubmit, { message: '' }, '#contact-form');
  const ref = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      ...(state?.fields ?? {}),
    },
  });

  const disabled = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async data => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key as keyof ContactFormType]);
    }

    formAction(formData);
    form.reset();
  });

  return (
    <Form {...form}>
      <form
        ref={ref}
        noValidate
        action={formAction}
        className="flex flex-col gap-4"
        id="contact-form"
        onSubmit={onSubmit}>
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
                <Textarea
                  maxLength={MESSAGE_MAX_LENGTH}
                  {...field}
                  required
                  disabled={disabled}
                  id="message"
                  placeholder="Your message"
                />
              </FormControl>
              <FormMessage>{state.issues?.message?.message}</FormMessage>
            </FormItem>
          )}
        />

        <AnimatePresence>
          {state.message && (
            <motion.div
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <Alert>
                <LuCircleAlert className="h-4 w-4" />
                <AlertTitle>{state.message}</AlertTitle>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit">{form.formState.isSubmitting ? t('submitting') : t('submit')}</Button>
      </form>
    </Form>
  );
}
