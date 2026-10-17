import { cn } from '@repo/ui/lib/utils';

import type { ComponentProps, CSSProperties } from 'react';

import { Link } from '@/i18n/navigation';

import styles from './service-cta.module.css';

type ServiceCtaProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  label: string;
  /** The service's accent; it fills the button so the button belongs to its section. */
  accent?: string;
};

/**
 * Primary call to action for a service: a button in the service's accent. On hover a sheen sweeps across.
 * Paint and hover: service-cta.module.css.
 */
export function ServiceCta({ label, accent, className, style, ...props }: ServiceCtaProps) {
  return (
    <Link
      className={cn(
        styles.cta,
        'relative isolate inline-flex w-fit items-center overflow-hidden rounded-[0.8rem] px-5 py-3',
        'text-base font-semibold tracking-[0.01em] text-[oklch(0.2_0.02_280)]',
        className,
      )}
      style={{ ...(accent ? { '--cta-accent': accent } : {}), ...style } as CSSProperties}
      {...props}>
      {label}
    </Link>
  );
}
