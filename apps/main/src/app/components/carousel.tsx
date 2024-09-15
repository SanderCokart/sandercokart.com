import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/carousel';
import { format, formatDistanceToNow } from 'date-fns';

import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';
import type {
  CarouselContentProps,
  CarouselItemProps,
  CarouselNextProps,
  CarouselPreviousProps,
  CarouselProps,
} from '@repo/ui/carousel';

import placeholder from '@/app/placeholder.webp';
import { cn } from '@/lib/utils';

const ArticleCarousel = forwardRef<HTMLDivElement, CarouselProps>(({ className, ...props }, ref) => {
  return <Carousel ref={ref} className={cn('bg-muted w-full px-8', className)} {...props} />;
});

const ArticleCarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(({ className, ...props }, ref) => {
  return <CarouselContent ref={ref} className={cn('m-0', className)} {...props} />;
});

const ArticleCarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(({ className, ...props }, ref) => {
  return (
    <CarouselItem
      ref={ref}
      className={cn(
        '3xl:basis-1/4 4xl:basis-1/5 border-accent m-0 p-0 first:border-l-0 last:border-r-0 md:basis-1/2 md:border-x-8 2xl:basis-1/3',
        className,
      )}
      {...props}
    />
  );
});

const ArticleCarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(({ className, ...props }, ref) => {
  return (
    <CarouselPrevious
      ref={ref}
      className={cn(
        'bg-primary text-primary-foreground disabled:text-primary disabled:hover:bg-primary absolute inset-y-0 left-0 h-full transform-none rounded-none border-none disabled:opacity-100',
        className,
      )}
      {...props}
    />
  );
});

const ArticleCarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(({ className, ...props }, ref) => {
  return (
    <CarouselNext
      ref={ref}
      className={cn(
        'bg-primary text-primary-foreground disabled:text-primary disabled:hover:bg-primary absolute inset-y-0 right-0 h-full transform-none rounded-none border-none disabled:opacity-100',
        className,
      )}
      {...props}
    />
  );
});

function ArticleFigure({ article }: { article: ArticleModel }) {
  return (
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
}

export {
  ArticleFigure,
  ArticleCarousel,
  ArticleCarouselContent,
  ArticleCarouselItem,
  ArticleCarouselPrevious,
  ArticleCarouselNext,
};
