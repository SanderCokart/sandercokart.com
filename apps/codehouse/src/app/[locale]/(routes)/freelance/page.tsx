import { useTranslations } from 'next-intl';

import { useMemo } from 'react';

import { GenericTestimonialsSection } from '@/src/components/generic-testimonials-section';
import { Line } from '@/src/components/line';

import { ContactSection } from './(sections)/contact-section';
import { FreelanceHeroSection } from './(sections)/freelance-hero-section';
import { PortfolioSection } from './(sections)/portfolio-section';
import { TechStackSection } from './(sections)/tech-stack-section';

export default function Page() {
  const t = useTranslations('testimonials');

  const testimonials = useMemo(
    () => [
      {
        author: t('adequaat.author'),
        quoteKey: 'adequaat.quote',
      },
    ],
    [t],
  );

  return (
    <main className="grow">
      <FreelanceHeroSection />
      <div className="mb-16">
        <Line />
        <PortfolioSection className="container max-w-screen-lg" />
        <Line />
        <TechStackSection className="container" />
        <Line />
        <GenericTestimonialsSection className="container max-w-screen-lg" testimonials={testimonials} />
        <Line />
        <ContactSection className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
