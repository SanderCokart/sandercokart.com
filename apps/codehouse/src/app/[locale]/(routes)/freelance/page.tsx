import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { GenericTestimonialsSection } from '@/src/components/generic-testimonials-section';
import { Line } from '@/src/components/line';
import { LocaleCode } from '@/src/i18n/config';

import { FreelanceHeroSection } from './(sections)/freelance-hero-section';
import { PortfolioSection } from './(sections)/portfolio-section';
import { TechStackSection } from './(sections)/tech-stack-section';

type FreelancePageParams = { params: Promise<{ locale: string }> };

export default function FreelancePage({ params }: FreelancePageParams) {
  const { locale } = use(params) as { locale: LocaleCode };
  setRequestLocale(locale);

  const t = useTranslations('FreelancePage');

  const testimonials = [
    {
      author: t('testimonials_1_author'),
      quote: t('testimonials_1_quote'),
    },
  ];

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
        {/*<ContactSection className="container max-w-screen-lg" />*/}
      </div>
    </main>
  );
}
