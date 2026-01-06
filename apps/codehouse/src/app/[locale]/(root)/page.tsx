import { setRequestLocale } from 'next-intl/server';

import { ServiceOfferingsSection } from './(components)/service-offerings-section';
import { LocaleCode } from '@/src/i18n/config';

type LandingPageParams = { params: Promise<{ locale: string }> };
export default async function LandingPage({ params }: LandingPageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="flex grow flex-col">
      <ServiceOfferingsSection />
    </main>
  );
}
