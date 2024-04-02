import { Card, CardContent } from '@repo/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/carousel';

import Image from 'next/image';

import NawijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';

export function Portfolio() {
  return (
    <div className="mt-8 flex flex-col">
      <h1 className="mb-4 text-center text-5xl font-bold">Portfolio</h1>
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <h1 className="mb-4 text-2xl font-bold md:text-4xl">NaWijzer.nl</h1>
                <Carousel>
                  <CarouselContent className="aspect-video">
                    <CarouselItem>
                      <Image alt="NaWijzer Admin" src={NawijzerAdmin} />
                    </CarouselItem>
                    <CarouselItem>
                      <Image alt="NaWijzer Questionnaire" src={NaWijzerQuestionnaire} />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
