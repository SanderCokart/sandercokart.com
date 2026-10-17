import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps } from 'react';

import styles from './selling-points.module.css';

type SellingPointsProps = ComponentProps<'div'> & {
  points: readonly string[];
};

/**
 * A service's selling points as a rail of plain lines, each with a tick in the chapter accent, like the chapter index.
 * One rail, or three columns of two once the list itself is wide enough that no point wraps past two lines. The
 * wrapper is the size container the columns query. Paint and columns: selling-points.module.css.
 */
export function SellingPoints({ points, className, ...props }: SellingPointsProps) {
  return (
    <div className={cn(styles.frame, className)} {...props}>
      <ul role="list" className={styles.points}>
        {points.map(point => (
          <li key={point} className={styles.point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
