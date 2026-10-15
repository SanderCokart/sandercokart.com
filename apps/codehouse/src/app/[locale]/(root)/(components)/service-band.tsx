import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';
import type { ServiceOffering } from './service-offerings';

import { SellingPoints } from '@/components/selling-points';

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
  /** Accent of the band above (stacked) or to the left (xl columns), which this one blends out of. */
  previousAccent?: string;
  /** Accent of the band to the right; xl columns meet their neighbours halfway so there is no seam. */
  nextAccent?: string;
};

/**
 * One offering. Below sm it is a full-bleed band that butts against its neighbours; from sm to xl a rounded card;
 * at xl a borderless full-height column. The `li` itself is the painted surface and never animates; its five rows
 * (icon, title, description, selling points, call to action) do. At xl the rows are a subgrid of the list so all
 * four columns line up.
 */
export function ServiceBand({ offering, index, previousAccent, nextAccent }: ServiceBandProps) {
  const t = useTranslations('ServiceOfferingsSection');
  const { icon: Icon } = offering;
  const titleId = `service-${offering.id}-title`;

  return (
    <li
      className={cn(
        'ch-band text-card-foreground grid gap-4 px-4 pt-4 pb-8 text-sm',
        'sm:ring-foreground/10 sm:rounded-lg sm:ring-1',
        'xl:row-span-7 xl:grid-rows-subgrid xl:gap-3 xl:rounded-none xl:px-8 xl:py-0 xl:ring-0',
      )}
      style={
        {
          '--column': index,
          '--band': offering.accent,
          '--band-prev': previousAccent ?? offering.accent,
          '--band-next': nextAccent ?? offering.accent,
        } as CSSProperties
      }>
      <Icon
        aria-hidden
        className="ch-band-item ch-band-icon size-16 justify-self-center text-(--band) xl:size-12"
        style={item(0)}
      />
      <h2 id={titleId} className="ch-band-item mt-1 text-center text-3xl font-bold xl:mt-0 xl:text-2xl" style={item(1)}>
        {t(offering.title)}
      </h2>
      <p className="ch-band-item mt-2 text-center text-lg xl:mt-0 xl:text-base" style={item(2)}>
        {t(offering.description)}
      </p>
      <SellingPoints
        className="ch-band-item justify-center"
        style={item(3)}
        points={offering.features.map(feature => t(feature))}
      />
      <div className="ch-band-item flex items-center justify-center py-4 xl:py-1" style={item(4)}>
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
