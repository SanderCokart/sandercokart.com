import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps, ReactNode } from 'react';

type PreviewWindowProps = ComponentProps<'div'> & {
  /** Shown in the address/title pill of the window bar. */
  address: ReactNode;
};

/**
 * Window chrome for the decorative service previews: a bar with three dots and a centered address pill over a
 * card surface, tinted by the chapter's `--accent`. Purely illustrative, so it is hidden from assistive tech.
 */
export function PreviewWindow({ address, className, children, ...props }: PreviewWindowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'bg-card/85 border-border shadow-[0_18px_40px_-22px_rgb(0_0_0/0.2)] dark:border-(--accent)/25 dark:shadow-[0_24px_60px_-30px_var(--accent)]',
        'pointer-events-none overflow-hidden rounded-xl backdrop-blur-sm',
        className,
      )}
      {...props}>
      <div className="border-border/60 relative flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-foreground/15 size-2.5 rounded-full" />
        <span className="bg-foreground/15 size-2.5 rounded-full" />
        <span className="size-2.5 rounded-full bg-(--accent)/70" />
        <span className="bg-muted/70 text-muted-foreground absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate rounded-md px-3 py-0.5 font-mono text-[11px]">
          {address}
        </span>
      </div>
      {children}
    </div>
  );
}
