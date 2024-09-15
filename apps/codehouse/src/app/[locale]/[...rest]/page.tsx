import { unstable_setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

export default function CatchAllPage({
  params: { locale },
}: {
  params: {
    locale: 'en' | 'nl';
  };
}) {
  unstable_setRequestLocale(locale);
  notFound();
}
