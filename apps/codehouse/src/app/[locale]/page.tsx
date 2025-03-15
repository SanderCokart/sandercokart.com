import { setRequestLocale } from 'next-intl/server';

import { LocaleCode } from '@/i18n/config';

import { Line } from './components/line';
import { ContactSection } from './sections/contact-section';
import { HeroSection } from './sections/hero-section';
import { PortfolioSection } from './sections/portfolio-section';
import { TechStackSection } from './sections/tech-stack-section';
import { TestimonialsSection } from './sections/testimonials-section';

type LandingPageParams = { params: Promise<{ locale: LocaleCode }> };
export default async function LandingPage({ params }: LandingPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="grow">
      <HeroSection />
      <div className="container mb-16 max-w-screen-lg">
        <Line />
        <PortfolioSection />
        <Line />
        <TechStackSection />
        <Line />
        <TestimonialsSection />
        <Line />
        <ContactSection />
      </div>
    </main>
  );
}
