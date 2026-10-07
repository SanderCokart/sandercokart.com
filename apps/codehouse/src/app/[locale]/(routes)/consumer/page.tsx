import { Line } from '@/src/components/line';

import { AskForAQuote } from './(sections)/ask-for-a-quote';
import { ConsumersHeroSection } from './(sections)/consumers-hero-section';
import { ConsumersTestimonialsSection } from './(sections)/consumers-testimonials-section';
import { ConsumersWhyChooseSection } from './(sections)/consumers-why-choose-section';

export default function Page() {
  return (
    <main className="grow">
      <ConsumersHeroSection />
      <div className="mb-16">
        <Line />
        <ConsumersWhyChooseSection className="container max-w-(--breakpoint-lg)" />
        <Line />
        <ConsumersTestimonialsSection className="container max-w-(--breakpoint-lg)" />
        <AskForAQuote className="container max-w-(--breakpoint-lg)" />
      </div>
    </main>
  );
}
