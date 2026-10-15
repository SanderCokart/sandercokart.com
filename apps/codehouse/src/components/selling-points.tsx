import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps } from 'react';

import './selling-points.css';

type SellingPointsProps = ComponentProps<'ul'> & {
  points: readonly string[];
};

/**
 * A service's selling points as compact labels instead of a bullet list. Painted in the brand violet rather than
 * the section accent so they contrast with the (mostly green) page. Styles: selling-points.css.
 */
export function SellingPoints({ points, className, ...props }: SellingPointsProps) {
  return (
    <ul role="list" className={cn('flex flex-wrap content-start gap-2', className)} {...props}>
      {points.map(point => (
        <li key={point} className="selling-point">
          {point}
        </li>
      ))}
    </ul>
  );
}
