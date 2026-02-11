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
  const publishedDate = article.attributes.publishedAt ? new Date(article.attributes.publishedAt) : null;

  const timeAgo = publishedDate ? formatDistanceToNow(publishedDate, { addSuffix: true }) : 'DRAFT';

  return (
    <CarouselItem
      // Responsive width control using flex-basis:
      // - Mobile: 85% width (prominent single item view)
      // - Small+: 50% width (2 items visible)
      // - Medium+: 33.3% width (3 items visible)
      // - Large+: 25% width (4 items visible)
      // - XL+: 20% width (5 items visible)
      // - 2XL+: 16.7% width (6 items visible)
      // Padding increases on larger screens (pl-2 on mobile, pl-4 on md+)
      className="basis-[85%] pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
      <article className="group relative">
        <Link
          href={`/articles/${article.attributes.slug}`}
          className={cn(
            'relative block aspect-video overflow-hidden rounded-sm',
            'focus:ring-accent focus:ring-offset-background focus:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2',
            'hover:ring-accent hover:ring-offset-background hover:scale-90 hover:ring-2 hover:ring-offset-2',
            'transition-all duration-200',
            'group-hover:shadow-lg',
          )}
          aria-label={`Read article: ${article.attributes.title}${publishedDate ? `, published ${timeAgo}` : ', draft'}`}
          title={article.attributes.title}>
          <figure className="h-full w-full">
            <Image
              fill
              alt={article.attributes.title}
              className="object-cover transition-transform duration-200"
              src={article.attributes.banner || placeholder}
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          </figure>
          <div
            className="bg-accent text-accent-foreground absolute bottom-3 left-3 rounded px-2 py-1 text-sm font-medium"
            title={
              publishedDate
                ? publishedDate.toLocaleString(navigator.language, {
                    dateStyle: 'long',
                    timeStyle: 'medium',
                  })
                : 'Draft article'
            }>
            {timeAgo}
          </div>
        </Link>
      </article>
    </CarouselItem>
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
              skipSnaps: false,
              containScroll: 'trimSnaps',
            }}
            className="group/carousel relative w-full"
            aria-label={`${title} carousel`}>
            <CarouselContent>
              {articles.map((article, index) => (
                <BlogCard key={article.attributes.slug} article={article} />
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="default"
              className={cn('absolute left-0 h-full', 'bg-accent text-accent-foreground rounded-none disabled:hidden')}
              aria-label={`Previous ${title.toLowerCase()}`}
            />
            <CarouselNext
              variant="default"
              className={cn('absolute right-0 h-full', 'bg-accent text-accent-foreground rounded-none disabled:hidden')}
              aria-label={`Next ${title.toLowerCase()}`}
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { BlogCard };
