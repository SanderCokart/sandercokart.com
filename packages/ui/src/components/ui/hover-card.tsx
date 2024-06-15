'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import * as React from 'react';

import { cn } from '@/lib/utils';

const HoverCard = ({
  closeDelay = 0,
  openDelay = 250,
  ...props
}: React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>) => (
  <HoverCardPrimitive.Root closeDelay={closeDelay} openDelay={openDelay} {...props} />
);

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    className={cn(
      'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-none',
      className,
    )}
    sideOffset={sideOffset}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };