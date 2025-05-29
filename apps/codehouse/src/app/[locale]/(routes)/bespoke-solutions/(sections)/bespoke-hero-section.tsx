import { cn } from '@repo/ui/lib/utils';
import {
  EuroIcon,
  GlobeIcon,
  PaintbrushIcon,
  RefreshCcwDotIcon,
  ServerIcon,
  TabletSmartphoneIcon,
  ZapIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ServiceFeature } from '../(components)/service-feature';

const service_features = [
  {
    icon: <ZapIcon className="h-8 w-8" />,
    label: 'Performant',
    tooltip: 'We build websites that are fast and efficient using the latest technologies in web development.',
  },
  {
    icon: <ServerIcon className="h-8 w-8" />,
    label: 'Hosting',
    tooltip: 'We handle all the hosting for you so you can focus on your business.',
  },
  {
    icon: <GlobeIcon className="h-8 w-8" />,
    label: 'Internationalization',
    tooltip: 'We build websites that are accessible to users all over the world.',
  },
  {
    icon: <TabletSmartphoneIcon className="h-8 w-8" />,
    label: 'Mobile-Friendly',
    tooltip: 'We build responsive websites that look great on all devices.',
  },
  {
    icon: <PaintbrushIcon className="h-8 w-8" />,
    label: 'Unique Design',
    tooltip: 'We build websites that are unique and tailored to your business.',
  },
  {
    icon: <RefreshCcwDotIcon className="h-8 w-8" />,
    label: 'Iterative Development',
    tooltip:
      'We build websites that are iteratively developed to ensure they are always up to date and meet your needs.',
  },
  {
    icon: <EuroIcon className="h-8 w-8" />,
    label: 'Transparent Pricing',
    tooltip: 'We provide transparent pricing for our services so you know exactly what you are getting.',
  },
];

export function BespokeHeroSection() {
  const t = useTranslations('bespoke-solutions-page');

  return (
    <section
      className={cn(
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
        'min-h-[calc(100dvh-theme(spacing.11))] sm:min-h-[calc(100dvh-theme(spacing.16))]',
        'container grid place-items-center',
      )}
      id="hero">
      <article className="flex flex-col gap-16">
        <h2 className="text-balance text-center text-3xl font-bold uppercase sm:text-5xl">
          {t.rich('title', {
            highlight: (chunks: string) => <span className="text-accent">{chunks}</span>,
          })}
        </h2>

        <div className="flex items-center justify-between">
          {service_features.map(feature => (
            <ServiceFeature key={feature.label} feature={feature} />
          ))}
        </div>
      </article>
    </section>
  );
}
