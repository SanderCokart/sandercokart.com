import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';

import { ProposalDBookingSection } from './(sections)/proposal-d-booking-section';
import { ProposalDCustomersSection } from './(sections)/proposal-d-customers-section';
import { ProposalDFaqSection } from './(sections)/proposal-d-faq-section';
import { ProposalDHeroSection } from './(sections)/proposal-d-hero-section';
import { ProposalDHowWeWorkSection } from './(sections)/proposal-d-how-we-work-section';
import { ProposalDNumbersSection } from './(sections)/proposal-d-numbers-section';
import { ProposalDScaleSection } from './(sections)/proposal-d-scale-section';
import { ProposalDTrustSection } from './(sections)/proposal-d-trust-section';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * Business Solutions — Proposal D: C imagery + B structure, plain language.
 */
export default async function CommercialProposalDPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <ProposalDHeroSection />
      <div className="mb-16">
        <Line />
        <ProposalDCustomersSection />
        <Line />
        <ProposalDNumbersSection />
        <Line />
        <ProposalDBookingSection />
        <Line />
        <ProposalDScaleSection className="container max-w-screen-lg" />
        <Line />
        <ProposalDHowWeWorkSection className="container max-w-screen-lg" />
        <Line />
        <ProposalDTrustSection className="container max-w-screen-lg" />
        <Line />
        <ProposalDFaqSection className="container max-w-screen-lg" />
        <AskForAQuote className="container max-w-screen-lg" id="ask-for-a-quote" />
      </div>
    </main>
  );
}
