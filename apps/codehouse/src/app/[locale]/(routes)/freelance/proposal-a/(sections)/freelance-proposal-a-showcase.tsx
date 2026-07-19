'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/shadcn/carousel';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import NaWijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';
import { MotionDiv } from '@/src/lib/motion';

import type { ComponentProps, FC } from 'react';

const highlights = [
  { title: 'highlight_1_title', description: 'highlight_1_description' },
  { title: 'highlight_2_title', description: 'highlight_2_description' },
  { title: 'highlight_3_title', description: 'highlight_3_description' },
] as const;

const screenshots = [
  {
    src: NaWijzerQuestionnaire,
    alt: 'nawijzer_caption_1_alt',
    caption: 'nawijzer_caption_1_text',
    featured: true,
  },
  {
    src: NaWijzerAdmin,
    alt: 'nawijzer_caption_2_alt',
    caption: 'nawijzer_caption_2_text',
    featured: false,
  },
] as const;

export const FreelanceProposalAShowcase: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalAShowcase');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-10 sm:scroll-mt-16', className)}
      id="showcase"
      {...props}>
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-balance">{t.rich('description', richText)}</p>
      </div>

      <div className="border-accent dark:border-primary bg-card/30 grid gap-8 rounded-xl border-2 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10 lg:p-10">
        <div className="flex flex-col justify-center gap-6">
          <div className="text-left">
            <p className="font-digital text-primary dark:text-accent mb-2 text-xs tracking-widest uppercase">
              {t('case_eyebrow')}
            </p>
            <h3 className="text-2xl font-bold md:text-3xl">{t('case_title')}</h3>
            <p className="text-muted-foreground mt-3 text-balance">{t.rich('case_description', richText)}</p>
          </div>

          <ul className="flex flex-col gap-4">
            {highlights.map((item, index) => (
              <MotionDiv
                key={item.title}
                className="border-border/60 bg-background/60 rounded-lg border p-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}>
                <p className="font-semibold">{t(item.title)}</p>
                <p className="text-muted-foreground mt-1 text-sm text-balance">{t.rich(item.description, richText)}</p>
              </MotionDiv>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="hidden flex-col gap-4 lg:flex">
            <MotionDiv
              className="border-accent dark:border-primary relative overflow-hidden rounded-lg border-2 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}>
              <figure className="relative">
                <Image
                  alt={t('nawijzer_caption_1_alt')}
                  className="h-auto w-full"
                  placeholder="blur"
                  priority
                  src={NaWijzerQuestionnaire}
                />
                <figcaption className="bg-primary/90 text-primary-foreground absolute bottom-0 left-0 right-0 px-4 py-2 text-center text-sm font-semibold">
                  {t('nawijzer_caption_1_text')}
                </figcaption>
              </figure>
            </MotionDiv>

            <MotionDiv
              className="border-primary dark:border-accent relative -mt-2 ml-8 overflow-hidden rounded-lg border-2 shadow-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}>
              <figure className="relative">
                <Image
                  alt={t('nawijzer_caption_2_alt')}
                  className="h-auto w-full"
                  placeholder="blur"
                  src={NaWijzerAdmin}
                />
                <figcaption className="bg-accent/90 text-accent-foreground absolute bottom-0 left-0 right-0 px-4 py-2 text-center text-sm font-semibold">
                  {t('nawijzer_caption_2_text')}
                </figcaption>
              </figure>
            </MotionDiv>
          </div>

          <div className="lg:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {screenshots.map(screenshot => (
                  <CarouselItem key={screenshot.caption}>
                    <figure className="border-accent dark:border-primary relative overflow-hidden rounded-lg border-2">
                      <Image alt={t(screenshot.alt)} className="h-auto w-full" src={screenshot.src} />
                      <figcaption className="bg-primary/90 text-primary-foreground absolute bottom-0 left-0 right-0 px-4 py-2 text-center text-sm font-semibold">
                        {t(screenshot.caption)}
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" variant="default" />
              <CarouselNext className="right-2" variant="default" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
