import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

import type { Testimonial } from '@/src/components/generic-testimonials-section';

import { GenericTestimonialsSection } from '@/src/components/generic-testimonials-section';

export const ConsumersTestimonialsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('BespokeTestimonialsSection');

  const testimonials: Testimonial[] = [];

  return (
    <GenericTestimonialsSection
      className={cn('container max-w-screen-lg', className)}
      testimonials={testimonials}
      {...props}
    />
  );
};
