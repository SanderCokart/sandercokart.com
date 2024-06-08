import { unstable_setRequestLocale } from 'next-intl/server';

import { Line } from './components/line';
import { ContactSection } from './sections/contact-section';
import { HeroSection } from './sections/hero-section';
import { PortfolioSection } from './sections/portfolio-section';
import { TechStackSection } from './sections/tech-stack-section';
import { TestimonialsSection } from './sections/testimonials-section';

export default async function LandingPage({
  params: { locale },
}: {
  params: {
    locale: 'en' | 'nl';
  };
}) {
  unstable_setRequestLocale(locale);

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

export function generateStaticParams() {
  return ['en', 'nl'].map(locale => ({ locale }));
}
