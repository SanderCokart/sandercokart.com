import { useTranslations } from 'next-intl';

import { Quote } from './components/quote';

export function Testimonials() {
  const t = useTranslations('home.testimonials');

  return (
    <section id="testimonials">
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="sm:p-6">
        <Quote author="Sythe Veenje - adequaat.nl">{t('testimonials.adequaat')}</Quote>
      </div>
    </section>
  );
}
