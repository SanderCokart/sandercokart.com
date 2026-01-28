import { Line } from '@/src/components/line';

import { ConsumersHeroSection } from './(sections)/consumers-hero-section';
import { ConsumersPricingSection } from './(sections)/consumers-pricing-section';
import { ConsumersTestimonialsSection } from './(sections)/consumers-testimonials-section';
import { ConsumersWhyChooseSection } from './(sections)/consumers-why-choose-section';
import { AskForAQuote } from './(sections)/ask-for-a-quote';
import { env } from '@/src/env';

export default function Page() {
  return (
    <main className="grow">
      <ConsumersHeroSection />
      <div className="mb-16">
        <Line />
        <ConsumersWhyChooseSection className="container max-w-screen-lg" />
        <Line />
        <ConsumersTestimonialsSection className="container max-w-screen-lg" />
        {/* <Line /> */}
        <AskForAQuote className="container max-w-screen-lg" />
        {/* <ContactSection className="container max-w-screen-lg" /> */}
      </div>
    </main>
  );
}
