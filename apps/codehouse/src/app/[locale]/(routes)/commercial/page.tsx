import { Line } from '@/src/components/line';

import { AskForAQuote } from '../consumer/(sections)/ask-for-a-quote';

import { CommercialBookingSection } from './(sections)/commercial-booking-section';
import { CommercialCustomersSection } from './(sections)/commercial-customers-section';
import { CommercialFaqSection } from './(sections)/commercial-faq-section';
import { CommercialHeroSection } from './(sections)/commercial-hero-section';
import { CommercialHowWeWorkSection } from './(sections)/commercial-how-we-work-section';
import { CommercialNumbersSection } from './(sections)/commercial-numbers-section';
import { CommercialScaleSection } from './(sections)/commercial-scale-section';
import { CommercialTrustSection } from './(sections)/commercial-trust-section';

export default function Page() {
  return (
    <main className="grow">
      <CommercialHeroSection />
      <div className="mb-16">
        <Line />
        <CommercialCustomersSection />
        <Line />
        <CommercialNumbersSection />
        <Line />
        <CommercialBookingSection />
        <Line />
        <CommercialScaleSection className="container max-w-(--breakpoint-lg)" />
        <Line />
        <CommercialHowWeWorkSection className="container max-w-(--breakpoint-lg)" />
        <Line />
        <CommercialTrustSection className="container max-w-(--breakpoint-lg)" />
        <Line />
        <CommercialFaqSection className="container max-w-(--breakpoint-lg)" />
        <AskForAQuote className="container max-w-(--breakpoint-lg)" />
      </div>
    </main>
  );
}
