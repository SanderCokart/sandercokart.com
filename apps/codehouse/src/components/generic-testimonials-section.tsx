import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

import { Quote } from '@/src/components/quote';

export type Testimonial = {
  author: string;
  quote: string;
};

export interface GenericTestimonialsSectionProps extends ComponentProps<'section'> {
  testimonials: Testimonial[];
}

export const GenericTestimonialsSection: FC<GenericTestimonialsSectionProps> = ({ className, testimonials, ...props }) => {
  const t = useTranslations('GenericTestimonialsSection');
  
  if (testimonials.length === 0) {
    return null; // Don't render if there are no testimonials
  }

  return (
    <section className={cn('scroll-mt-16 sm:scroll-mt-16', className)} id="testimonials" {...props}>
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="sm:p-6">
        {testimonials.map((testimonial, index) => {
          return (
            <MotionDiv key={index} style={{ scale: 0.95 }} viewport={{ margin: '-50%' }} whileInView={{ scale: 1 }}>
              <Quote author={testimonial.author}>{testimonial.quote}</Quote>
            </MotionDiv>
          );
        })}
      </div>
    </section>
  );
};
