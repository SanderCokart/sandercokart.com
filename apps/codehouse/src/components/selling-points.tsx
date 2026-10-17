import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps } from 'react';

type SellingPointsProps = ComponentProps<'div'> & {
  points: readonly string[];
};

function chunk<T>(items: readonly T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );
}

/**
 * A service's selling points as a rail: plain text hanging off a thin line, each point with a short tick in the
 * chapter accent where it meets the line, like the chapter index. The line is drawn only between ticks.
 *
 * The points are split into columns that stack independently in a flex row, so a point that wraps only pushes down
 * its own column. Flexbox can't regroup items per breakpoint, so both groupings are rendered and one is shown:
 * - Below xl: the columns of three stacked into one rail (the line runs on from one column into the next).
 * - xl up to 1920px: the columns of three side by side, each its own rail.
 * - From 1920px (no Tailwind breakpoint there): the columns of two side by side.
 */
export function SellingPoints({ points, className, ...props }: SellingPointsProps) {
  return (
    <div className={className} {...props}>
      <PointColumns points={points} perColumn={3} className="flex-col xl:flex-row min-[120rem]:hidden" />
      <PointColumns points={points} perColumn={2} className="hidden min-[120rem]:flex" />
    </div>
  );
}

type PointColumnsProps = {
  points: readonly string[];
  perColumn: number;
  className: string;
};

function PointColumns({ points, perColumn, className }: PointColumnsProps) {
  return (
    <div className={cn('flex gap-x-8 gap-y-[0.7rem]', className)}>
      {chunk(points, perColumn).map(column => (
        <ul key={column.join()} role="list" className="group/column flex min-w-0 flex-1 flex-col gap-[0.7rem]">
          {column.map(point => (
            <li
              key={point}
              className={cn(
                'text-foreground relative pl-[calc(1rem+2px)] text-base leading-[1.4]',
                // Tick: this point's piece of the rail, in exactly the color of the chapter number.
                'before:absolute before:top-[0.1em] before:left-0 before:h-[1.2em] before:w-0.5 before:rounded-[1px] before:bg-(--accent-ink)',
                // Rail: from the bottom of this tick to the top of the next one, across the gap.
                'after:bg-foreground/18 after:absolute after:top-[1.3em] after:bottom-[calc(-0.7rem-0.1em)] after:left-0 after:w-0.5',
                // Nothing below the last point of a rail: the last column when stacked, every column side by side.
                'group-last/column:last:after:hidden xl:last:after:hidden',
              )}>
              {point}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
