import { cn } from '@repo/ui/lib/utils';

import { ComponentProps, FC } from 'react';

import type { Testimonial } from '@/components/generic-testimonials-section';

import { GenericTestimonialsSection } from '@/components/generic-testimonials-section';

export const ConsumersTestimonialsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const testimonials: Testimonial[] = [];

  return (
    <GenericTestimonialsSection
      className={cn('container max-w-(--breakpoint-lg)', className)}
      testimonials={testimonials}
      {...props}
    />
  );
};
