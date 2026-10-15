import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';
import type { ServiceOffering } from './service-offerings';

import { Link } from '@/i18n/navigation';
import { serviceHrefs } from '@/lib/nav-links';

/** Position of an element in its band's entrance sequence (see `.ch-band-item`). */
function item(index: number): CSSProperties {
  return { '--item': index } as CSSProperties;
}

type ServiceBandProps = {
  offering: ServiceOffering;
  /** Column order on desktop, used to cascade the load entrance across the row. */
  index: number;
  /** Accent of the band above, which this one blends out of when they stack on mobile. */
  previousAccent?: string;
};

/**
 * One offering. Below sm it is a full-bleed band that butts against its neighbours; from sm up it is a rounded
 * card. The `li` itself is the painted surface and never animates; its five rows (icon, title, description,
 * features, call to action) do. At xl the rows are a subgrid of the list so all four cards line up.
 */
export function ServiceBand({ offering, index, previousAccent }: ServiceBandProps) {
  const t = useTranslations('ServiceOfferingsSection');
  const { icon: Icon } = offering;
  const titleId = `service-${offering.id}-title`;

  return (
    <li
      className={cn(
        'ch-band text-card-foreground grid gap-4 px-4 pt-4 pb-8 text-sm',
        'sm:ring-foreground/10 sm:rounded-lg sm:ring-1',
        'xl:row-span-5 xl:grid-rows-subgrid',
      )}
      style={
        {
          '--column': index,
          '--band': offering.accent,
          '--band-prev': previousAccent ?? offering.accent,
        } as CSSProperties
      }>
      <Icon
        aria-hidden
        className="ch-band-item ch-band-icon size-16 justify-self-center text-(--band)"
        style={item(0)}
      />
      <h2 id={titleId} className="ch-band-item mt-1 text-center text-3xl font-bold" style={item(1)}>
        {t(offering.title)}
      </h2>
      <p className="ch-band-item mt-2 text-center text-lg" style={item(2)}>
        {t(offering.description)}
      </p>
      <ul role="list" className="ch-band-item space-y-2" style={item(3)}>
        {offering.features.map(feature => (
          <li key={feature} className="flex items-center gap-2">
            <span aria-hidden className="dark:text-accent text-primary">
              •
            </span>
            {t(feature)}
          </li>
        ))}
      </ul>
      <div className="ch-band-item flex items-center justify-center py-4" style={item(4)}>
        <Button
          variant="ghost"
          size="lg"
          nativeButton={false}
          render={<Link href={serviceHrefs[offering.id]} aria-describedby={titleId} />}
          className={cn(
            'text-lg font-semibold duration-500',
            'hover:bg-primary/30 hover:text-inherit',
            'dark:hover:bg-accent/60 dark:hover:text-accent-foreground',
          )}>
          {t('callToAction')}
        </Button>
      </div>
    </li>
  );
}
