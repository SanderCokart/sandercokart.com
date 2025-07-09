'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Textarea } from '@repo/ui/components/ui/textarea';

import { sendContactMail } from '@/src/actions/send-contact-mail';
import { Form } from '@/src/components/ui/form';
import { useToast } from '@/src/components/ui/use-toast';

export function ContactForm() {
  const { toast } = useToast();

  const t = useTranslations('contact-form.form');

  const formSchema = z.object({
    name: z.string().min(1, { message: t('validation.name.required') }),
    email: z
      .string()
      .min(1, { message: t('validation.email.required') })
      .email({ message: t('validation.email.invalid') }),
    subject: z.string().min(1, { message: t('validation.subject.required') }),
    message: z.string().min(1, { message: t('validation.message.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendContactMail(values);

      toast({
        title: t('alert.success.title'),
        description: t('alert.success.description'),
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: t('alert.error.title'),
        description: t('alert.error.description'),
        variant: 'destructive',
      });
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" type="text" {...form.register('name')} />
        {form.formState.errors.name && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" {...form.register('email')} />
        {form.formState.errors.email && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="subject">{t('subject')}</Label>
        <Input id="subject" type="text" {...form.register('subject')} />
        {form.formState.errors.subject && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.subject.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" {...form.register('message')} />
        {form.formState.errors.message && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {form.formState.isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </Form>
  );
}
