import { getLocale, getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { Line } from '@/src/components/line';
import { env } from '@/src/env';
import { getOpenSourceProjectsWithVersions } from '@/src/lib/github-source-versions';

import { AskForAQuote } from '../consumer/(sections)/ask-for-a-quote';
import { OpenSourceFaqSection } from './(sections)/open-source-faq-section';
import { OpenSourceHeroSection } from './(sections)/open-source-hero-section';
import { OpenSourceProjectsSection } from './(sections)/open-source-projects-section';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('OpenSourceMetadata');
  const title = t('title');
  const description = t('description');
  const path = `/${locale}/open-source`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: '/en/open-source',
        nl: '/nl/open-source',
      },
    },
    openGraph: {
      type: 'website',
      url: `${env.SITE_URL}${path}`,
      siteName: "Sander's CodeHouse",
      title,
      description,
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function Page() {
  const projects = await getOpenSourceProjectsWithVersions();

  return (
    <main className="grow">
      <OpenSourceHeroSection />
      <div className="mb-16">
        <Line />
        <OpenSourceProjectsSection projects={projects} />
        <Line />
        <OpenSourceFaqSection className="container max-w-(--breakpoint-lg)" />
        <AskForAQuote className="container max-w-(--breakpoint-lg)" />
      </div>
    </main>
  );
}
