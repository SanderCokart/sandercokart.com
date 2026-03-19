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
import { motion } from 'motion/react';

import { FC } from 'react';

import type { ArticleModel } from '@/types/model-types';

import { BlogCardItem } from './blog-card-item';

const BlogCard: FC<{ article: ArticleModel }> = ({ article }) => {
  const publishedDate = article.attributes.publishedAt ? new Date(article.attributes.publishedAt) : null;

  const timeAgo = publishedDate ? formatDistanceToNow(publishedDate, { addSuffix: true }) : 'DRAFT';

  const articleClassName = cn(
    'relative aspect-video overflow-hidden rounded-sm',
    'focus-within:border-accent transition-[scale,border] focus-within:scale-95 focus-within:border-2',
    'hover:border-accent transition-[scale,border] hover:scale-95 hover:border-2',
  );

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
      <motion.article className={articleClassName}>
        <BlogCardItem article={article} timeAgo={timeAgo} publishedDate={publishedDate} />
      </motion.article>
    </CarouselItem>
  );
};

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <header className="py-4">
    <h2
      className={cn(
        'border-accent border-l-4 pl-3',
        'font-digital text-foreground font-bold uppercase tracking-wide',
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
