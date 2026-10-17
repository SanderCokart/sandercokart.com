import { cn } from '@repo/ui/lib/utils';
import { ArrowRightIcon } from 'lucide-react';

import type { ComponentProps, CSSProperties } from 'react';

import { Link } from '@/i18n/navigation';

import styles from './service-cta.module.css';

type ServiceCtaProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  label: string;
  /** The service's accent; it fills the arrow tile so the button belongs to its section. */
  accent?: string;
};

/**
 * Primary call to action for a service: a brand-violet button with an accent arrow tile. On hover a sheen sweeps
 * across and the arrow is swapped for the next one sliding in. Paint and hover: service-cta.module.css.
 */
export function ServiceCta({ label, accent, className, style, ...props }: ServiceCtaProps) {
  return (
    <Link
      className={cn(
        styles.cta,
        'relative isolate inline-flex w-fit items-center gap-4 overflow-hidden rounded-[0.8rem] py-1.5 pr-1.5 pl-5',
        'text-base font-semibold tracking-[0.01em] text-white',
        className,
      )}
      style={{ ...(accent ? { '--cta-accent': accent } : {}), ...style } as CSSProperties}
      {...props}>
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          styles.tile,
          'grid size-9 place-items-center overflow-hidden rounded-[0.55rem] text-[oklch(0.2_0.02_280)]',
        )}>
        <ArrowRightIcon className={cn(styles.arrow, 'col-start-1 row-start-1 size-[1.1rem]')} />
        <ArrowRightIcon className={cn(styles.arrow, 'col-start-1 row-start-1 size-[1.1rem]')} />
      </span>
    </Link>
  );
}
