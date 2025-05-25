import { setRequestLocale } from 'next-intl/server';

import { LocaleCode } from '@/src/i18n/config';

import { Line } from './components/line';
import { ServiceOfferingsSection } from './sections/service-offerings-section';

type LandingPageParams = { params: Promise<{ locale: LocaleCode }> };
export default async function LandingPage({ params }: LandingPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex grow flex-col">
      <ServiceOfferingsSection />
    </main>
  );
}
