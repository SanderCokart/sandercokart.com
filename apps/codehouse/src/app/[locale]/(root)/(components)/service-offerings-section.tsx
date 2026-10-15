import { useTranslations } from 'next-intl';

import { SegmentLogo } from '@/components/segment-logo';

import { serviceHrefs } from '@/lib/nav-links';

import { ServiceConsole } from './service-console';
import { serviceOfferings } from './service-offerings';

import './service-offerings-section.css';

/**
 * "Console": the CodeHouse as a display with four channels. The server renders the display and every channel's
 * copy; ServiceConsole only adds the selection state. Layout, paint and motion live in
 * service-offerings-section.css and segment-logo.css.
 */
export function ServiceOfferingsSection() {
  const t = useTranslations('ServiceOfferingsSection');
  const tCommon = useTranslations('common');

  const channels = serviceOfferings.map(({ icon: Icon, ...offering }) => ({
    id: offering.id,
    accent: offering.accent,
    icon: <Icon />,
    label: tCommon(offering.label),
    title: t(offering.title),
    description: t(offering.description),
    features: offering.features.map(feature => t(feature)),
    href: serviceHrefs[offering.id],
  }));

  return (
    <ServiceConsole
      channels={channels}
      callToAction={t('callToAction')}
      selectorLabel={t('title')}
      display={
        <header className="ch-display">
          <SegmentLogo label="Sander's CodeHouse" className="ch-display-logo h-auto" />
          <div className="ch-display-text">
            <h1 id="services-title" className="ch-display-title font-bold">
              <span className="block">{t('title')}</span>
            </h1>
            <p className="ch-tagline font-digital text-(--console-accent)">Let&apos;s code...</p>
          </div>
        </header>
      }
    />
  );
}
