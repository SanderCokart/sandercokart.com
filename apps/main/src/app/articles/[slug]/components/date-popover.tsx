'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/shadcn/popover';

type DatePopoverItem = {
  label: string;
  value: React.ReactNode;
};

type DatePopoverProps = {
  triggerChildren: React.ReactNode;
  items: DatePopoverItem[];
};

const DatePopover = ({ triggerChildren, items }: DatePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="text-muted-foreground font-mono text-xs uppercase tracking-widest" variant="ghost" />
        }>
        {triggerChildren}
      </PopoverTrigger>
      <PopoverContent className="w-fit font-mono">
        {items.map((item, index) => (
          <span key={index}>
            <span className="font-bold">{item.label}</span>
            {item.value}
          </span>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export type { DatePopoverItem, DatePopoverProps };
export default DatePopover;

