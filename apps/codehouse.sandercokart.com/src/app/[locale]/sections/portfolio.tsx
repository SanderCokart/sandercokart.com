import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/carousel';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import NaWijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';

export function Portfolio() {
  const t = useTranslations('home.portfolio');

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-center text-5xl font-bold" id="portfolio">
        {t('title')}
      </h1>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold md:text-4xl">NaWijzer.nl</h1>
        <p>{t('nawijzer.description')}</p>
        <Carousel>
          <CarouselContent className="aspect-video">
            <CarouselItem>
              <figure className="relative">
                <Image alt="NaWijzer Questionnaire" src={NaWijzerQuestionnaire} />
                <figcaption className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-primary/80 bg-red-500 px-8 pb-1 pt-2  font-bold text-primary-foreground">
                  {t('nawijzer.caption-1')}
                </figcaption>
              </figure>
            </CarouselItem>
            <CarouselItem>
              <figure className="relative">
                <Image alt="NaWijzer Admin" src={NaWijzerAdmin} />
                <figcaption className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-primary/80 bg-red-500 px-8 pb-1 pt-2  font-bold text-primary-foreground">
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
    </div>
  );
}
