import { useTranslations } from 'next-intl';

import { Link } from '@/lib/navigation';

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <main className="flex min-h-[calc(100dvh-theme(spacing.11))] sm:min-h-[calc(100dvh-theme(spacing.16))]">
      <div className="grid grow place-items-center">
        <div className="flex h-96 w-96 flex-col items-center justify-center rounded border border-primary bg-muted text-muted-foreground">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="text-lg">{t('not-found-page.message')}</p>
          <Link className="mt-4 dark:text-accent underline" href="/">
            {t('not-found-page.back-to-front')}
          </Link>
        </div>
      </div>
    </main>
  );
}
