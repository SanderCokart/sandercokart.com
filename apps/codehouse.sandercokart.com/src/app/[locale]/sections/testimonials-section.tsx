import { useTranslations } from 'next-intl';

import { MotionDiv } from '@/lib/motion';

import { Quote } from './components/quote';

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');

  return (
    <section className="scroll-mt-16 sm:scroll-mt-16" id="testimonials">
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="sm:p-6">
        <MotionDiv style={{ scale: 0.95 }} viewport={{ margin: '-50%' }} whileInView={{ scale: 1 }}>
          <Quote author="Sythe Veenje - adequaat.nl">{t('testimonials.adequaat')}</Quote>
        </MotionDiv>
      </div>
    </section>
  );
}
