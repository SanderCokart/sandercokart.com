'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cn } from '@repo/ui/lib/utils';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('group/tabs data-horizontal:flex-col flex', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'group-data-horizontal/tabs:h-8 group/tabs-list text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col inline-flex w-fit items-center justify-center rounded-lg p-[3px] data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
        editor: 'gap-0 bg-transparent p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Base styles
        'relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium transition-all',
        // Text colors
        'text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground',
        // Focus styles
        'focus-visible:border-ring focus-visible:outline-ring focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:ring-[3px]',
        // Disabled states
        'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
        // Vertical layout
        'group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start',
        // Active state
        'data-active:bg-background data-active:text-foreground dark:data-active:bg-input/30 dark:data-active:border-input dark:data-active:text-foreground',
        // Line variant
        'group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:shadow-none dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent group-data-[variant=line]/tabs-list:bg-transparent',
        // Default variant
        'group-data-[variant=default]/tabs-list:data-active:shadow-sm',
        // Editor variant
        'group-data-[variant=editor]/tabs-list:z-10 group-data-[variant=editor]/tabs-list:mt-[3px]',
        'group-data-[variant=editor]/tabs-list:data-active:bg-muted group-data-[variant=editor]/tabs-list:data-active:text-muted-foreground group-data-[variant=editor]/tabs-list:data-active:border-t-accent group-data-[variant=editor]/tabs-list:data-active:border-l-accent group-data-[variant=editor]/tabs-list:data-active:border-r-accent group-data-[variant=editor]/tabs-list:data-active:border-b-transparent dark:group-data-[variant=editor]/tabs-list:data-active:bg-muted dark:group-data-[variant=editor]/tabs-list:data-active:text-muted-foreground dark:group-data-[variant=editor]/tabs-list:data-active:border-t-accent dark:group-data-[variant=editor]/tabs-list:data-active:border-l-accent dark:group-data-[variant=editor]/tabs-list:data-active:border-r-accent dark:group-data-[variant=editor]/tabs-list:data-active:border-b-transparent group-data-[variant=editor]/tabs-list:gap-0 group-data-[variant=editor]/tabs-list:rounded-none',
        // Underline indicator
        'after:bg-foreground group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100 after:absolute after:opacity-0 after:transition-opacity',
        // Icon styles
        '[&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel data-slot="tabs-content" className={cn('flex-1 text-sm outline-none', className)} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
