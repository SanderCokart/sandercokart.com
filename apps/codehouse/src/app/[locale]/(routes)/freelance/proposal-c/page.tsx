import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';
import { ProposalCDeliveryPhasesSection } from './(sections)/proposal-c-delivery-phases-section';
import { ProposalCFaqSection } from './(sections)/proposal-c-faq-section';
import { ProposalCHeroSection } from './(sections)/proposal-c-hero-section';
import { ProposalCShowcaseSection } from './(sections)/proposal-c-showcase-section';
import { ProposalCTechSection } from './(sections)/proposal-c-tech-section';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * Freelance Development — Proposal C (End-to-End Delivery).
 * Sells freelance web development by leading with concept-to-production ownership.
 */
export default async function FreelanceProposalCPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <ProposalCHeroSection />
      <div className="mb-16">
        <Line />
        <ProposalCDeliveryPhasesSection />
        <Line />
        <ProposalCTechSection />
        <Line />
        <ProposalCShowcaseSection />
        <Line />
        <ProposalCFaqSection />
        <div id="ask-for-a-quote">
          <AskForAQuote className="container max-w-screen-lg" />
        </div>
      </div>
    </main>
  );
}
