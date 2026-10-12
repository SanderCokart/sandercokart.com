import { Line } from '@/src/components/line';
import { getOpenSourceProjectsWithVersions } from '@/src/lib/github-source-versions';

import { AskForAQuote } from '../consumer/(sections)/ask-for-a-quote';

import { OpenSourceFaqSection } from './(sections)/open-source-faq-section';
import { OpenSourceHeroSection } from './(sections)/open-source-hero-section';
import { OpenSourceProjectsSection } from './(sections)/open-source-projects-section';

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
