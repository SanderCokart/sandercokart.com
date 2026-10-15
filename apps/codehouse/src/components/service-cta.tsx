import { cn } from '@repo/ui/lib/utils';
import { ArrowRightIcon } from 'lucide-react';

import type { ComponentProps, CSSProperties } from 'react';

import { Link } from '@/i18n/navigation';

import './service-cta.css';

type ServiceCtaProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  label: string;
  /** The service's accent; it fills the arrow tile so the button belongs to its section. */
  accent?: string;
};

/**
 * Primary call to action for a service: a brand-violet button with an accent arrow tile. On hover a sheen sweeps
 * across and the arrow is swapped for the next one sliding in. Styles: service-cta.css.
 */
export function ServiceCta({ label, accent, className, style, ...props }: ServiceCtaProps) {
  return (
    <Link
      className={cn('service-cta', className)}
      style={{ ...(accent ? { '--cta-accent': accent } : {}), ...style } as CSSProperties}
      {...props}>
      <span className="service-cta-label">{label}</span>
      <span aria-hidden className="service-cta-tile">
        <ArrowRightIcon className="service-cta-arrow" />
        <ArrowRightIcon className="service-cta-arrow" />
      </span>
    </Link>
  );
}
