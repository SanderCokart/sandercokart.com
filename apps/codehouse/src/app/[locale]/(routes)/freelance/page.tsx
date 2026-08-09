import { setRequestLocale } from 'next-intl/server';

import { Line } from '@/src/components/line';
import type { LocaleCode } from '@/src/i18n/config';

import { AskForAQuote } from '../consumer/(sections)/ask-for-a-quote';

import { FreelanceFaqSection } from './(sections)/freelance-faq-section';
import { FreelanceHeroSection } from './(sections)/freelance-hero-section';
import { FreelanceShowcaseSection } from './(sections)/freelance-showcase-section';
import { FreelanceSkillsSection } from './(sections)/freelance-skills-section';
import { FreelanceTechIndexSection } from './(sections)/freelance-tech-index-section';

type PageParams = { params: Promise<{ locale: string }> };

export default async function Page({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <FreelanceHeroSection />
      <div className="mb-16">
        <Line />
        <FreelanceSkillsSection className="container max-w-screen-lg" />
        <Line />
        <FreelanceShowcaseSection />
        <Line />
        <FreelanceTechIndexSection className="container max-w-screen-lg" />
        <Line />
        <FreelanceFaqSection className="container max-w-screen-lg" />
        <AskForAQuote className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
