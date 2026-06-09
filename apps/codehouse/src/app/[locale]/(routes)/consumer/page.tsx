import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from './(sections)/ask-for-a-quote';
import { ConsumersHeroSection } from './(sections)/consumers-hero-section';
import { ConsumersTestimonialsSection } from './(sections)/consumers-testimonials-section';
import { ConsumersWhyChooseSection } from './(sections)/consumers-why-choose-section';

type ConsumerPageParams = { params: Promise<{ locale: string }> };

export default async function Page({ params }: ConsumerPageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <ConsumersHeroSection />
      <div className="mb-16">
        <Line />
        <ConsumersWhyChooseSection className="container max-w-screen-lg" />
        <Line />
        <ConsumersTestimonialsSection className="container max-w-screen-lg" />
        <AskForAQuote className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
