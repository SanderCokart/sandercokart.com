import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';

import { ProposalDFaqSection } from './(sections)/proposal-d-faq-section';
import { ProposalDHeroSection } from './(sections)/proposal-d-hero-section';
import { ProposalDShowcaseSection } from './(sections)/proposal-d-showcase-section';
import { ProposalDSkillsSection } from './(sections)/proposal-d-skills-section';
import { ProposalDTechIndexSection } from './(sections)/proposal-d-tech-index-section';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * Freelance Development — Proposal D: A's hero + C's shipped showcase + B's skills/FAQ + searchable tech index.
 */
export default async function FreelanceProposalDPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <ProposalDHeroSection />
      <div className="mb-16">
        <Line />
        <ProposalDSkillsSection className="container max-w-screen-lg" />
        <Line />
        <ProposalDShowcaseSection />
        <Line />
        <ProposalDTechIndexSection className="container max-w-screen-lg" />
        <Line />
        <ProposalDFaqSection className="container max-w-screen-lg" />
        <AskForAQuote id="ask-for-a-quote" className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
