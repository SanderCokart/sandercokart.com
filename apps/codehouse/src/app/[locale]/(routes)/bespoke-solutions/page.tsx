import { Line } from '@/src/components/line';

import { BespokeHeroSection } from './(sections)/bespoke-hero-section';
import { BespokePricingSection } from './(sections)/bespoke-pricing-section';
import { BespokeTestimonialsSection } from './(sections)/bespoke-testimonials-section';
import { BespokeWhyChooseSection } from './(sections)/bespoke-why-choose-section';

export default function Page() {
  return (
    <main className="grow">
      <BespokeHeroSection />
      <div className="mb-16">
        <Line />
        <BespokeWhyChooseSection className="container max-w-screen-lg" />
        <Line />
        <BespokePricingSection className="container max-w-screen-lg" />
        <Line />
        <BespokeTestimonialsSection className="container max-w-screen-lg" />
        {/* <Line />
        <PortfolioSection className="container max-w-screen-lg" />
        <Line />
        <TechStackSection className="container" />
        <Line />
        <TestimonialsSection className="container max-w-screen-lg" />
        <Line />
        <ContactSection className="container max-w-screen-lg" /> */}
      </div>
    </main>
  );
}
