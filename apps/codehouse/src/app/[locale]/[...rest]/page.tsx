import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

export default async function CatchAllPage(props: {
  params: Promise<{
    locale: 'en' | 'nl';
  }>;
}) {
  const params = await props.params;

  const { locale } = params;

  setRequestLocale(locale);
  notFound();
}
