'use client';

import { useTranslations } from 'next-intl';

export function CopyrightMessage() {
  const t = useTranslations('Footer');
  const date = new Date().getFullYear();

  return t('Copyright_message', { date });
}
