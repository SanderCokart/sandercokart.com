'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/shadcn/carousel';
import { Card, CardContent } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import type { ComponentProps, FC } from 'react';

import NaWijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';
import { MotionDiv } from '@/src/lib/motion';

const showcaseImages = [
  { src: NaWijzerQuestionnaire, caption: 'nawijzer_caption_1' },
  { src: NaWijzerAdmin, caption: 'nawijzer_caption_2' },
] as const;

export const FreelanceProposalBShowcase: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalBShowcase');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="showcase"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}>
        <Card className="border-accent dark:border-primary border-2">
          <CardContent className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-2">
              <p className="font-digital text-primary dark:text-accent text-sm tracking-widest uppercase">
                {t('nawijzer_eyebrow')}
              </p>
              <h3 className="text-2xl font-bold md:text-3xl">{t('nawijzer_title')}</h3>
              <p className="text-muted-foreground text-balance">{t.rich('nawijzer_description', richText)}</p>
            </div>

            <Carousel>
              <CarouselContent className="aspect-video">
                {showcaseImages.map(image => (
                  <CarouselItem key={image.caption}>
                    <figure className="relative">
                      <Image
                        alt={t(`${image.caption}_alt`)}
                        src={image.src}
                        className="rounded-md"
                        placeholder="blur"
                      />
                      <figcaption className="bg-primary/80 text-primary-foreground absolute bottom-0 left-0 right-0 mx-auto rounded-t-full px-4 py-1 text-center text-xs font-bold md:w-min md:whitespace-nowrap md:px-8 md:py-2 md:text-base">
                        {t(`${image.caption}_text`)}
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="bottom-16 left-0 top-16 h-auto transform-none rounded-l-none"
                variant="default"
              />
              <CarouselNext
                className="bottom-16 right-0 top-16 h-auto transform-none rounded-r-none"
                variant="default"
              />
            </Carousel>
          </CardContent>
        </Card>
      </MotionDiv>
    </section>
  );
};
