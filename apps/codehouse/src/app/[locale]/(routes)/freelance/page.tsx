import { Line } from '@/src/components/line';

import { AskForAQuote } from '../consumer/(sections)/ask-for-a-quote';

import { FreelanceFaqSection } from './(sections)/freelance-faq-section';
import { FreelanceHeroSection } from './(sections)/freelance-hero-section';
import { FreelanceShowcaseSection } from './(sections)/freelance-showcase-section';
import { FreelanceSkillsSection } from './(sections)/freelance-skills-section';
import { FreelanceTechIndexSection } from './(sections)/freelance-tech-index-section';

export default function Page() {
  return (
    <main className="grow">
      <FreelanceHeroSection />
      <div className="mb-16">
        <Line />
        <FreelanceSkillsSection className="container max-w-(--breakpoint-lg)" />
        <Line />
        <FreelanceShowcaseSection />
        <Line />
        <FreelanceTechIndexSection className="container max-w-(--breakpoint-lg)" />
        <Line />
        <FreelanceFaqSection className="container max-w-(--breakpoint-lg)" />
        <AskForAQuote className="container max-w-(--breakpoint-lg)" />
      </div>
    </main>
  );
}
