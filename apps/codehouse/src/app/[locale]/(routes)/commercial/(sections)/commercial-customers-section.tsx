'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

import { MockSidebar, MockTableRow, MockWindow } from './components/mock-ui';

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const CommercialCustomersSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialCustomers');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)} id="examples" {...props}>
      <MotionDiv
        className="grid items-center gap-10 lg:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12%' }}>
        <MotionDiv variants={sectionReveal} className="order-2 lg:order-1" aria-hidden>
          <MockWindow title={t('mock_title')}>
            <div className="flex min-h-[16rem]">
              <MockSidebar
                items={[t('mock_nav_all'), t('mock_nav_active'), t('mock_nav_leads'), t('mock_nav_archived')]}
                activeIndex={1}
              />
              <div className="flex-1">
                <div className="border-border/40 text-muted-foreground grid grid-cols-3 gap-2 border-b px-3 py-2 text-[10px] tracking-wider uppercase">
                  <span>{t('mock_col_name')}</span>
                  <span>{t('mock_col_type')}</span>
                  <span>{t('mock_col_status')}</span>
                </div>
                <MockTableRow cells={[t('mock_row_1_name'), t('mock_row_1_type'), t('mock_row_1_status')]} highlight />
                <MockTableRow cells={[t('mock_row_2_name'), t('mock_row_2_type'), t('mock_row_2_status')]} />
                <MockTableRow cells={[t('mock_row_3_name'), t('mock_row_3_type'), t('mock_row_3_status')]} />
                <MockTableRow cells={[t('mock_row_4_name'), t('mock_row_4_type'), t('mock_row_4_status')]} />
                <MockTableRow cells={[t('mock_row_5_name'), t('mock_row_5_type'), t('mock_row_5_status')]} />
              </div>
            </div>
          </MockWindow>
        </MotionDiv>
        <MotionDiv variants={sectionReveal} className="order-1 space-y-4 lg:order-2">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
