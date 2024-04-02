import { unstable_setRequestLocale } from 'next-intl/server';

import { Portfolio } from '@/app/[locale]/sections/Portfolio';

import { Line } from './components/line';
import { Hero } from './sections/hero';

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
      <div className="container max-w-screen-lg">
        <Line />
        <Portfolio />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return ['en', 'nl'].map(locale => ({ locale }));
}
