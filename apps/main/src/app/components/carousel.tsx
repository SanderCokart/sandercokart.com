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

import type { ArticleModel } from '@/types/model-types';

import { BlogCardItem } from './blog-card-item';

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
      <BlogCardItem article={article} timeAgo={timeAgo} publishedDate={publishedDate} />
    </CarouselItem>
  );
};

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <header className="py-4">
    <h2
      className={cn(
        'border-accent border-l-4 pl-3',
        'font-digital text-foreground font-bold tracking-wide uppercase',
        'text-3xl md:text-4xl',
      )}>
      {title}
    </h2>
  </header>
);

export const CarouselSection: FC<{
  title: string;
  articles: ArticleModel[];
}> = ({ title, articles }) => {
  return (
    <section>
      <SectionHeader title={title} />

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
          {articles.map(article => (
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
    </section>
  );
};
