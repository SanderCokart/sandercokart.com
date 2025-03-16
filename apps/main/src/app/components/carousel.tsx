import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/shadcn/carousel';
import { cn } from '@repo/ui/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';

import { ComponentProps, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';

import placeholder from '@/app/placeholder.webp';

const ArticleCarousel: FC<ComponentProps<typeof Carousel>> = ({ className, ...props }) => (
  <Carousel className={cn('bg-muted w-full px-8', className)} {...props} />
);

const ArticleCarouselContent: FC<ComponentProps<typeof CarouselContent>> = ({ className, ...props }) => (
  <CarouselContent className={cn('m-0', className)} {...props} />
);

const ArticleCarouselItem: FC<ComponentProps<typeof CarouselItem>> = ({ className, ...props }) => (
  <CarouselItem
    className={cn(
      '3xl:basis-1/4 4xl:basis-1/5 border-accent m-0 p-0 first:border-l-0 last:border-r-0 md:basis-1/2 md:border-x-8 2xl:basis-1/3',
      className,
    )}
    {...props}
  />
);

const ArticleCarouselPrevious: FC<ComponentProps<typeof CarouselPrevious>> = ({ className, ...props }) => (
  <CarouselPrevious
    className={cn(
      'bg-primary text-primary-foreground disabled:text-primary disabled:hover:bg-primary absolute inset-y-0 left-0 h-full transform-none rounded-none border-none disabled:opacity-100',
      className,
    )}
    {...props}
  />
);

const ArticleCarouselNext: FC<ComponentProps<typeof CarouselNext>> = ({ className, ...props }) => (
  <CarouselNext
    className={cn(
      'dark:bg-primary absolute inset-y-0 right-0 h-full',
      // 'dark:bg-primary dark:text-primary-foreground bg-primary dark:text-primary-foreground disabled:text-primary disabled:hover:bg-primary absolute inset-y-0 right-0 h-full transform-none rounded-none border-none disabled:opacity-100',
      className,
    )}
    {...props}
  />
);

const ArticleFigure: FC<{ article: ArticleModel }> = ({ article }) => (
  <figure className="relative aspect-video grow">
    <Link href={`/articles/${article.attributes.slug}`}>
      <Image
        fill
        alt={article.attributes.title}
        className="absolute inset-0"
        src={article.attributes.banner || placeholder}
      />
      <figcaption
        className="absolute inset-0 flex flex-col-reverse justify-between font-semibold"
        title={article.attributes.title}>
        <h1 className="bg-primary/75 text-primary-foreground line-clamp-2 text-balance px-2 py-1 text-center text-xs capitalize sm:text-lg">
          {article.attributes.title}
        </h1>
        <p
          className="bg-accent w-fit rounded-tr px-2 pb-1 text-xs sm:text-base"
          title={format(article.attributes.createdAt, 'PPPPpp')}>
          {formatDistanceToNow(article.attributes.createdAt, { addSuffix: true })}
        </p>
      </figcaption>
    </Link>
  </figure>
);

export {
  ArticleFigure,
  ArticleCarousel,
  ArticleCarouselContent,
  ArticleCarouselItem,
  ArticleCarouselPrevious,
  ArticleCarouselNext,
};
