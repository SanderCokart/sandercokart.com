import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';

import { FreelanceProposalACapabilities } from './(sections)/freelance-proposal-a-capabilities';
import { FreelanceProposalAFaq } from './(sections)/freelance-proposal-a-faq';
import { FreelanceProposalAHero } from './(sections)/freelance-proposal-a-hero';
import { FreelanceProposalAShowcase } from './(sections)/freelance-proposal-a-showcase';

type PageParams = { params: Promise<{ locale: string }> };

/**
 * Freelance Development - Proposal A (Portfolio & Craft).
 * Sells freelance development by leading with shipped work and craftsmanship.
 */
export default async function FreelanceProposalAPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <FreelanceProposalAHero />
      <div className="mb-16">
        <Line />
        <FreelanceProposalAShowcase className="max-w-screen-xl" />
        <Line />
        <FreelanceProposalACapabilities className="max-w-screen-lg" />
        <Line />
        <FreelanceProposalAFaq className="max-w-screen-lg" />
        <div id="ask-for-a-quote">
          <AskForAQuote className="container max-w-screen-lg" />
        </div>
      </div>
    </main>
  );
}
