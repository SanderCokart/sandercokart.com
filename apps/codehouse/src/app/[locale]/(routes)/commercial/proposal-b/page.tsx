import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';

import { ProposalBEngagementSection } from './(sections)/proposal-b-engagement-section';
import { ProposalBFaqSection } from './(sections)/proposal-b-faq-section';
import { ProposalBHeroSection } from './(sections)/proposal-b-hero-section';
import { ProposalBScaleSection } from './(sections)/proposal-b-scale-section';
import { ProposalBTrustSection } from './(sections)/proposal-b-trust-section';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * Business Solutions - Proposal B: Partnership & Scale.
 */
export default async function CommercialProposalBPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <ProposalBHeroSection />
      <div className="mb-16">
        <Line />
        <ProposalBScaleSection className="container max-w-screen-lg" />
        <Line />
        <ProposalBEngagementSection className="container max-w-screen-lg" />
        <Line />
        <ProposalBTrustSection className="container max-w-screen-lg" />
        <Line />
        <ProposalBFaqSection className="container max-w-screen-lg" />
        <AskForAQuote className="container max-w-screen-lg" id="ask-for-a-quote" />
      </div>
    </main>
  );
}
