import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

export default async function CatchAllPage(props: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = (await props.params) as { locale: 'en' | 'nl' };

  setRequestLocale(locale);
  notFound();
}
