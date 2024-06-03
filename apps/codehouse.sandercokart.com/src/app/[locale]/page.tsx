import { unstable_setRequestLocale } from 'next-intl/server';

import { Line } from './components/line';
import { ContactForm } from './sections/contact-form';
import { Hero } from './sections/hero';
import { Portfolio } from './sections/portfolio';
import { TechStack } from './sections/tech-stack';
import { Testimonials } from './sections/testimonials';

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
      <Hero />
      <div className="container mb-16 max-w-screen-lg">
        <Line />
        <Portfolio />
        <Line />
        <TechStack />
        <Line />
        <Testimonials />
        <Line />
        <ContactForm />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return ['en', 'nl'].map(locale => ({ locale }));
}
