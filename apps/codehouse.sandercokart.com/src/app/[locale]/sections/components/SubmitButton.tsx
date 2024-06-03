'use client';

import { Button } from '@repo/ui/button';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const t = useTranslations('home.contact-form');
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? t('form.submitting') : t('form.submit')}</Button>;
}
