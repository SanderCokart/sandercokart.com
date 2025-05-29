import { Line } from '@/src/components/line';

import { BespokeHeroSection } from './(sections)/bespoke-hero-section';

export default function Page() {
  return (
    <main className="grow">
      <BespokeHeroSection />
      <div className="mb-16">
        <Line />

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
