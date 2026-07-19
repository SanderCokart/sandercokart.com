import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';
import { ProposalCAnalyticsSection } from './(sections)/proposal-c-analytics-section';
import { ProposalCBookingSection } from './(sections)/proposal-c-booking-section';
import { ProposalCCustomersSection } from './(sections)/proposal-c-customers-section';
import { ProposalCFaqSection } from './(sections)/proposal-c-faq-section';
import { ProposalCHeroSection } from './(sections)/proposal-c-hero-section';
import { ProposalCScopeSection } from './(sections)/proposal-c-scope-section';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * Business Solutions — Proposal C (Product Showcase).
 * Sells custom business web apps by showing what the software feels like.
 */
export default async function CommercialProposalCPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <ProposalCHeroSection />
      <div className="mb-16">
        <Line />
        <ProposalCCustomersSection />
        <Line />
        <ProposalCAnalyticsSection />
        <Line />
        <ProposalCBookingSection />
        <Line />
        <ProposalCScopeSection />
        <Line />
        <ProposalCFaqSection />
        <div id="ask-for-a-quote">
          <AskForAQuote className="container max-w-screen-lg" />
        </div>
      </div>
    </main>
  );
}
