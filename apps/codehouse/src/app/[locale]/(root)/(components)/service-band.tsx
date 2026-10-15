import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';
import type { ServiceOffering } from './service-offerings';

import { SellingPoints } from '@/components/selling-points';
import { ServiceCta } from '@/components/service-cta';

import { serviceHrefs } from '@/lib/nav-links';

/** Position of an element in its band's entrance sequence (see `.ch-band-item`). */
function item(index: number): CSSProperties {
  return { '--item': index } as CSSProperties;
}

type ServiceBandProps = {
  offering: ServiceOffering;
  /** Order in the list, used to cascade the load entrance band after band. */
  index: number;
  /** Accent of the band above when they stack, which this one blends out of. */
  previousAccent?: string;
};

/**
 * One offering. Below lg a full-bleed band that blends out of the one above; from lg a cell of the shared surface
 * (no paint of its own). The `li` never animates; its five rows (icon, title, description, selling points, call to
 * action) do. From lg the rows are a subgrid of the list, so cells side by side line up.
 */
export function ServiceBand({ offering, index, previousAccent }: ServiceBandProps) {
  const t = useTranslations('ServiceOfferingsSection');
  const { icon: Icon } = offering;
  const titleId = `service-${offering.id}-title`;

  return (
    <li
      className={cn(
        'ch-band text-card-foreground grid justify-items-center gap-4 px-6 pt-6 pb-10 text-sm',
        '*:w-full *:max-w-2xl',
        'lg:row-span-5 lg:grid-rows-subgrid lg:px-12 lg:pt-10 lg:pb-12',
        '2xl:row-span-8 2xl:gap-3 2xl:px-8 2xl:py-0',
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
        className="ch-band-item ch-band-icon size-16 w-16! justify-self-center text-(--band) 2xl:size-12 2xl:w-12!"
        style={item(0)}
      />
      <h2
        id={titleId}
        className="ch-band-item mt-1 text-center text-3xl font-bold 2xl:mt-0 2xl:text-2xl"
        style={item(1)}>
        {t(offering.title)}
      </h2>
      <p className="ch-band-item mt-2 text-center text-lg 2xl:mt-0 2xl:text-base" style={item(2)}>
        {t(offering.description)}
      </p>
      <SellingPoints
        className="ch-band-item justify-center"
        style={item(3)}
        points={offering.features.map(feature => t(feature))}
      />
      <div className="ch-band-item flex justify-center pt-4 2xl:pt-2" style={item(4)}>
        <ServiceCta
          href={serviceHrefs[offering.id]}
          aria-describedby={titleId}
          accent={offering.accent}
          label={t('callToAction')}
        />
      </div>
    </li>
  );
}
