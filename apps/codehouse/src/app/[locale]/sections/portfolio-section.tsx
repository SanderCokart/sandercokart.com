import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/shadcn/carousel';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import NaWijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';

export function PortfolioSection() {
  const t = useTranslations('home.portfolio');

  return (
    <section className="flex scroll-mt-16 flex-col sm:scroll-mt-16" id="portfolio">
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold md:text-4xl">NaWijzer.nl</h1>
        <p>{t('nawijzer.description')}</p>
        <Carousel>
          <CarouselContent className="aspect-video">
            <CarouselItem>
              <figure className="relative">
                <Image alt="NaWijzer Questionnaire" src={NaWijzerQuestionnaire} />
                <figcaption className="bg-primary/80 text-primary-foreground absolute bottom-0 left-0 right-0 mx-auto rounded-t-full px-4 py-1 text-center text-xs font-bold md:w-min md:whitespace-nowrap md:px-8 md:py-2 md:text-base">
                  {t('nawijzer.caption-1')}
                </figcaption>
              </figure>
            </CarouselItem>
            <CarouselItem>
              <figure className="relative">
                <Image alt="NaWijzer Admin" src={NaWijzerAdmin} />
                <figcaption className="bg-primary/80 text-primary-foreground absolute bottom-0 left-0 right-0 mx-auto rounded-t-full px-4 py-1 text-center text-xs font-bold md:w-min md:whitespace-nowrap md:px-8 md:py-2 md:text-base">
                  {t('nawijzer.caption-2')}
                </figcaption>
              </figure>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious
            className="bottom-16 left-0 top-16 h-auto transform-none rounded-l-none"
            variant="default"
          />
          <CarouselNext className="bottom-16 right-0 top-16 h-auto transform-none rounded-r-none" variant="default" />
        </Carousel>
      </div>
    </section>
  );
}
