import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

import { Quote } from './components/quote';

export const TestimonialsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('home.testimonials');

  return (
    <section className={cn('scroll-mt-16 sm:scroll-mt-16', className)} id="testimonials" {...props}>
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="sm:p-6">
        <MotionDiv style={{ scale: 0.95 }} viewport={{ margin: '-50%' }} whileInView={{ scale: 1 }}>
          <Quote author="Sythe Veenje - adequaat.nl">{t('testimonials.adequaat')}</Quote>
        </MotionDiv>
      </div>
    </section>
  );
};
