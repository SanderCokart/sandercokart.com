import { Line } from '@/src/components/line';

import { ContactSection } from './(sections)/contact-section';
import { FreelanceHeroSection } from './(sections)/freelance-hero-section';
import { PortfolioSection } from './(sections)/portfolio-section';
import { TechStackSection } from './(sections)/tech-stack-section';
import { TestimonialsSection } from './(sections)/testimonials-section';

export default function Page() {
  return (
    <main className="grow">
      <FreelanceHeroSection />
      <div className="mb-16">
        <Line />
        <PortfolioSection className="container max-w-screen-lg" />
        <Line />
        <TechStackSection className="container" />
        <Line />
        <TestimonialsSection className="container max-w-screen-lg" />
        <Line />
        <ContactSection className="container max-w-screen-lg" />
      </div>
    </main>
  );
}
