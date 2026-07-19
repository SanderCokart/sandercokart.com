import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';

import { FreelanceProposalBCollaboration } from './(sections)/freelance-proposal-b-collaboration';
import { FreelanceProposalBFaq } from './(sections)/freelance-proposal-b-faq';
import { FreelanceProposalBHero } from './(sections)/freelance-proposal-b-hero';
import { FreelanceProposalBShowcase } from './(sections)/freelance-proposal-b-showcase';
import { FreelanceProposalBSkills } from './(sections)/freelance-proposal-b-skills';

type PageParams = { params: Promise<{ locale: string }> };

export default async function FreelanceProposalBPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <FreelanceProposalBHero />
      <div className="mb-16">
        <Line />
        <FreelanceProposalBCollaboration className="container max-w-screen-lg" />
        <Line />
        <FreelanceProposalBSkills className="container max-w-screen-lg" />
        <Line />
        <FreelanceProposalBShowcase className="container max-w-screen-lg" />
        <Line />
        <FreelanceProposalBFaq className="container max-w-screen-lg" />
        <AskForAQuote id="quote" className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
