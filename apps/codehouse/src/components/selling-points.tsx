import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps } from 'react';

import styles from './selling-points.module.css';

type SellingPointsProps = ComponentProps<'ul'> & {
  points: readonly string[];
};

/**
 * A service's selling points as compact labels instead of a bullet list; on phones, where the labels would stack one
 * per line, a rail of plain lines instead (selling-points.module.css). Painted in the brand violet rather than the
 * section accent so they contrast with the (mostly green) page; a lifted violet on dark, where the theme's own
 * `--primary` (violet-950) would disappear.
 */
export function SellingPoints({ points, className, ...props }: SellingPointsProps) {
  return (
    <ul role="list" className={cn(styles.points, 'flex flex-wrap content-start gap-2', className)} {...props}>
      {points.map(point => (
        <li
          key={point}
          className={cn(
            styles.point,
            'border-brand-violet/26 bg-brand-violet/8 text-primary inline-flex items-center rounded-[0.4rem] border px-[0.7rem] py-[0.35rem] text-sm leading-[1.3] font-medium',
            'dark:bg-brand-violet-bright/16 dark:border-[#9b5cf6]/38 dark:text-[oklch(0.86_0.09_293)]',
          )}>
          {point}
        </li>
      ))}
    </ul>
  );
}
