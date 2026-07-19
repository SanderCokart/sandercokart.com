'use client';

import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps, FC, ReactNode } from 'react';

/** Shared chrome for faux product UI panels — decorative, not interactive. */
export const MockWindow: FC<
  ComponentProps<'div'> & {
    title: string;
    toolbar?: ReactNode;
  }
> = ({ title, toolbar, className, children, ...props }) => (
  <div
    aria-hidden
    className={cn(
      'border-primary/30 bg-card/80 overflow-hidden rounded-lg border-2 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.45)]',
      'dark:border-primary/50 dark:bg-card/60',
      className,
    )}
    {...props}>
    <div className="border-border/60 flex items-center gap-3 border-b px-3 py-2">
      <div className="flex gap-1.5">
        <span className="bg-muted-foreground/40 size-2.5 rounded-full" />
        <span className="bg-muted-foreground/40 size-2.5 rounded-full" />
        <span className="bg-accent/80 size-2.5 rounded-full" />
      </div>
      <span className="text-muted-foreground truncate text-xs font-medium tracking-wide uppercase">{title}</span>
      {toolbar ? <div className="ml-auto flex items-center gap-2">{toolbar}</div> : null}
    </div>
    {children}
  </div>
);

export const MockSidebar: FC<{ items: string[]; activeIndex?: number; className?: string }> = ({
  items,
  activeIndex = 0,
  className,
}) => (
  <aside className={cn('border-border/50 bg-muted/30 hidden w-40 shrink-0 border-r p-3 sm:block', className)}>
    <ul className="space-y-1.5">
      {items.map((item, index) => (
        <li
          key={item}
          className={cn(
            'rounded-md px-2.5 py-1.5 text-xs',
            index === activeIndex
              ? 'bg-primary/15 text-foreground dark:bg-accent/15 dark:text-accent'
              : 'text-muted-foreground',
          )}>
          {item}
        </li>
      ))}
    </ul>
  </aside>
);

export const MockStat: FC<{ label: string; value: string; trend?: string; className?: string }> = ({
  label,
  value,
  trend,
  className,
}) => (
  <div className={cn('border-border/40 bg-background/50 rounded-md border p-3', className)}>
    <p className="text-muted-foreground text-[10px] tracking-wider uppercase">{label}</p>
    <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
    {trend ? <p className="text-accent mt-0.5 text-[10px] font-medium">{trend}</p> : null}
  </div>
);

export const MockBarChart: FC<{ heights: number[]; className?: string }> = ({ heights, className }) => (
  <div className={cn('flex h-24 items-end gap-1.5', className)}>
    {heights.map((height, index) => (
      <div
        key={index}
        className={cn(
          'w-full rounded-t-sm',
          index % 3 === 0 ? 'bg-accent/70' : 'bg-primary/50 dark:bg-primary/70',
        )}
        style={{ height: `${height}%` }}
      />
    ))}
  </div>
);

export const MockTableRow: FC<{ cells: string[]; highlight?: boolean }> = ({ cells, highlight }) => (
  <div
    className={cn(
      'grid grid-cols-3 gap-2 border-b border-border/40 px-3 py-2 text-xs last:border-0',
      highlight && 'bg-primary/5 dark:bg-accent/5',
    )}>
    {cells.map((cell, index) => (
      <span key={index} className={cn('truncate', index === 0 ? 'font-medium' : 'text-muted-foreground')}>
        {cell}
      </span>
    ))}
  </div>
);

export const MockCalendarDay: FC<{ day: string; busy?: boolean; selected?: boolean }> = ({
  day,
  busy,
  selected,
}) => (
  <div
    className={cn(
      'flex aspect-square flex-col items-center justify-center rounded-md text-[10px]',
      selected && 'bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground',
      !selected && busy && 'bg-primary/15 dark:bg-accent/20',
      !selected && !busy && 'bg-muted/40 text-muted-foreground',
    )}>
    <span className="font-medium">{day}</span>
  </div>
);
