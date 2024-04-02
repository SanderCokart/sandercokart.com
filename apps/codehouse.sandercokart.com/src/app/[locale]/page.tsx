import { unstable_setRequestLocale } from 'next-intl/server';

import { Hero } from './components/hero';

export default async function LandingPage({
  params: { locale },
}: {
  params: {
    locale: 'en' | 'nl';
  };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <div className="h-96" />
    </main>
  );
}

export function generateStaticParams() {
  return ['en', 'nl'].map(locale => ({ locale }));
}
