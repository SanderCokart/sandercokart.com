import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../../consumer/(sections)/ask-for-a-quote';

import { CommercialProposalAFaq } from './(sections)/commercial-proposal-a-faq';
import { CommercialProposalAHero } from './(sections)/commercial-proposal-a-hero';
import { CommercialProposalARoi } from './(sections)/commercial-proposal-a-roi';
import { CommercialProposalASystems } from './(sections)/commercial-proposal-a-systems';

type PageParams = { params: Promise<{ locale: string }> };

export default async function CommercialProposalAPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <CommercialProposalAHero />
      <div className="mb-16">
        <Line />
        <CommercialProposalASystems className="container max-w-screen-lg" />
        <Line />
        <CommercialProposalARoi className="container max-w-screen-lg" />
        <Line />
        <CommercialProposalAFaq className="container max-w-screen-lg" />
        <AskForAQuote id="quote" className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
