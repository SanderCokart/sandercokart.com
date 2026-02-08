'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/shadcn/carousel';
import { cn } from '@repo/ui/lib/utils';
import { formatDistanceToNow } from 'date-fns';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';

import placeholder from '@/app/placeholder.webp';

const BlogCard: FC<{ article: ArticleModel }> = ({ article }) => {
  return (
    <Link
      href={`/articles/${article.attributes.slug}`}
      className="relative block aspect-video overflow-hidden rounded-sm">
      <figure className="h-full w-full">
        <Image
          fill
          alt={article.attributes.title}
          className="object-cover"
          src={article.attributes.banner || placeholder}
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
      </figure>
    </Link>
  );
};

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-4 md:px-8">
    <h2
      className={cn(
        'border-accent border-l-4 pl-3',
        'font-digital text-foreground font-bold uppercase tracking-wide',
        'text-2xl md:text-3xl lg:text-4xl',
      )}>
      {title}
    </h2>
  </div>
);

export const CarouselSection: FC<{
  title: string;
  articles: ArticleModel[];
}> = ({ title, articles }) => {
  return (
    <section>
      <div>
        <SectionHeader title={title} />

        <div className="px-4 md:px-8">
          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            className="group/carousel relative w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {articles.map(article => (
                <CarouselItem
                  key={article.attributes.slug}
                  className="basis-[85%] pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                  <BlogCard article={article} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-primary/90 text-primary-foreground hover:bg-primary absolute left-0 top-1/2 z-10 h-full w-10 -translate-y-1/2 rounded-none border-none opacity-0 transition-all duration-300 disabled:pointer-events-none disabled:opacity-0 group-hover/carousel:opacity-100 md:w-14" />
            <CarouselNext className="bg-primary/90 text-primary-foreground hover:bg-primary absolute right-0 top-1/2 z-10 h-full w-10 -translate-y-1/2 rounded-none border-none opacity-0 transition-all duration-300 disabled:pointer-events-none disabled:opacity-0 group-hover/carousel:opacity-100 md:w-14" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { BlogCard };
