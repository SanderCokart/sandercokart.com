import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/carousel';

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
  return <Carousel ref={ref} className={cn('bg-muted w-full', className)} {...props} />;
});

const ArticleCarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(({ className, ...props }, ref) => {
  return <CarouselContent ref={ref} className={cn('px-8', className)} {...props} />;
});

const ArticleCarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(({ className, ...props }, ref) => {
  return <CarouselItem ref={ref} className={cn('md:basis-1/2 2xl:basis-1/5', className)} {...props} />;
});

const ArticleCarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(({ className, ...props }, ref) => {
  return (
    <CarouselPrevious
      ref={ref}
      className={cn('absolute inset-y-0 left-0 h-full transform-none rounded-none', className)}
      {...props}
    />
  );
});

const ArticleCarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(({ className, ...props }, ref) => {
  return (
    <CarouselNext
      ref={ref}
      className={cn('absolute inset-y-0 right-0 h-full transform-none rounded-none', className)}
      {...props}
    />
  );
});

function ArticleFigure({ article }: { article: ArticleModel }) {
  return (
    <figure className="relative aspect-video max-h-96 grow" title={article.attributes.title}>
      <Link href={`/articles/${article.attributes.slug}`}>
        <Image
          fill
          alt={article.attributes.title}
          className="absolute inset-0"
          src={article.attributes.banner || placeholder}
        />
        <figcaption className="absolute inset-0 flex flex-col justify-between font-semibold">
          <h1 className="bg-accent line-clamp-1 px-2 text-xl" title={article.attributes.summary}>
            {article.attributes.title}
          </h1>
          <p
            className="bg-muted/75 border-accent ml-16 line-clamp-3 rounded-tl border-l-4 border-t-4 px-2 text-xs 2xl:line-clamp-3"
            title={article.attributes.summary}>
            {article.attributes.summary}
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
