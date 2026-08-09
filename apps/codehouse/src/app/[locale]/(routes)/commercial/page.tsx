import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../consumer/(sections)/ask-for-a-quote';

import { CommercialBookingSection } from './(sections)/commercial-booking-section';
import { CommercialCustomersSection } from './(sections)/commercial-customers-section';
import { CommercialFaqSection } from './(sections)/commercial-faq-section';
import { CommercialHeroSection } from './(sections)/commercial-hero-section';
import { CommercialHowWeWorkSection } from './(sections)/commercial-how-we-work-section';
import { CommercialNumbersSection } from './(sections)/commercial-numbers-section';
import { CommercialScaleSection } from './(sections)/commercial-scale-section';
import { CommercialTrustSection } from './(sections)/commercial-trust-section';

type PageParams = { params: Promise<{ locale: string }> };

export default async function Page({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <CommercialHeroSection />
      <div className="mb-16">
        <Line />
        <CommercialCustomersSection />
        <Line />
        <CommercialNumbersSection />
        <Line />
        <CommercialBookingSection />
        <Line />
        <CommercialScaleSection className="container max-w-screen-lg" />
        <Line />
        <CommercialHowWeWorkSection className="container max-w-screen-lg" />
        <Line />
        <CommercialTrustSection className="container max-w-screen-lg" />
        <Line />
        <CommercialFaqSection className="container max-w-screen-lg" />
        <AskForAQuote className="container max-w-screen-lg" id="ask-for-a-quote" />
      </div>
    </main>
  );
}
