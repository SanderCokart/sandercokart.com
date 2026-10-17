import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { SegmentLogo } from '@/components/segment-logo';

import { heroItem, heroStagger } from '@/lib/hero-reveal';
import { MotionDiv } from '@/lib/motion';

export function ConsumersHeroSection() {
  const t = useTranslations('BespokeHeroSection');

  return (
    <section className={cn('dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]', 'mt-16')} id="hero">
      <MotionDiv variants={heroStagger} initial="hidden" animate="show" className="flex flex-col items-center gap-8">
        <SegmentLogo glow label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />

        <MotionDiv variants={heroItem}>
          <h2 className="mx-auto max-w-6xl text-center text-3xl font-bold text-balance uppercase sm:text-5xl">
            {t.rich('title', {
              highlight: chunks => <span className="text-accent-ink">{chunks}</span>,
            })}
          </h2>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
