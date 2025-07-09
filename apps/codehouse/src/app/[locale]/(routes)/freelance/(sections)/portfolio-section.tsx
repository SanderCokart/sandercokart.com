import { getTranslations } from 'next-intl/server';

import { PortfolioSectionComponent } from './components/portfolio-section-component';

export async function PortfolioSection() {
  const t = await getTranslations('portfolio');

  return <PortfolioSectionComponent t={t} />;
}
