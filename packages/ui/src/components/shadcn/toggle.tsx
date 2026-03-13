'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cn } from '@repo/ui/lib/utils';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

const toggleVariants = cva(
  [
    'group/toggle',
    // Background
    'data-[state=on]:bg-accent hover:bg-accent/50 aria-pressed:bg-accent bg-transparent',
    // Text
    'hover:text-accent-foreground aria-pressed:text-accent-foreground data-[state=on]:text-accent-foreground text-sm font-medium',
    // Borders
    'rounded-lg outline-none',
    'aria-invalid:border-destructive focus-visible:border-ring',
    // Ring
    'focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 focus-visible:ring-[3px]',
    // Effects
    'transition-all disabled:pointer-events-none disabled:opacity-50',
    // Layout
    'inline-flex items-center justify-center gap-1 whitespace-nowrap',
    // SVG
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-input border bg-transparent',
      },
      size: {
        default: 'h-8 min-w-8 px-2',
        sm: 'h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-1.5 text-[0.8rem]',
        lg: 'h-9 min-w-9 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Toggle({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />;
}

export { Toggle, toggleVariants };
