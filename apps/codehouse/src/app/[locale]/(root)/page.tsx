import { setRequestLocale } from 'next-intl/server';

import { ServiceOfferingsSection } from '@/src/app/[locale]/(routes)/freelance/(sections)/service-offerings-section';
import { LocaleCode } from '@/src/i18n/config';

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
