import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { SegmentLogo } from '@/components/segment-logo';

export function ConsumersHeroSection() {
  const t = useTranslations('BespokeHeroSection');

  return (
    <section className={cn('dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]', 'mt-16')} id="hero">
      <article className="flex flex-col items-center gap-8">
        <span className="sc-logo-glow">
          <SegmentLogo label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />
        </span>

        <h2 className="mx-auto max-w-6xl text-center text-3xl font-bold text-balance uppercase sm:text-5xl">
          {t.rich('title', {
            highlight: chunks => <span className="text-accent">{chunks}</span>,
          })}
        </h2>
      </article>
    </section>
  );
}
