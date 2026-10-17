import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps } from 'react';

import styles from './selling-points.module.css';

type SellingPointsProps = ComponentProps<'ul'> & {
  points: readonly string[];
};

/**
 * A service's selling points as a rail of plain lines, each with a tick in the chapter accent, like the chapter index.
 * One rail up to 1280px, then two columns of three, then three columns of two from 1920px. Paint and columns:
 * selling-points.module.css.
 */
export function SellingPoints({ points, className, ...props }: SellingPointsProps) {
  return (
    <ul role="list" className={cn(styles.points, className)} {...props}>
      {points.map(point => (
        <li key={point} className={styles.point}>
          {point}
        </li>
      ))}
    </ul>
  );
}
