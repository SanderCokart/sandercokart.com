'use client';

import { YouTubeEmbed } from '@next/third-parties/google';
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

import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';

import placeholder from '@/app/placeholder.webp';

import { useBlogView } from './blog-view-switch';

const TimeOverlay: FC<{ timeAgo: string; publishedDate: Date | null }> = ({ timeAgo, publishedDate }) => (
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
);

const BlogCard: FC<{ article: ArticleModel }> = ({ article }) => {
  const publishedDate = article.attributes.publishedAt ? new Date(article.attributes.publishedAt) : null;

  const timeAgo = publishedDate ? formatDistanceToNow(publishedDate, { addSuffix: true }) : 'DRAFT';

  const { view, isInitializing } = useBlogView();

  const hasVideo = Boolean(article.attributes.videoId);

  const videoEmbedRef = useRef<HTMLDivElement>(null);

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
      <motion.article
        className={cn(
          'relative aspect-video overflow-hidden rounded-sm',
          'focus-within:border-accent transition-[scale,border] focus-within:scale-95 focus-within:border-2',
          'hover:border-accent transition-[scale,border] hover:scale-95 hover:border-2',
        )}>
        {hasVideo ? (
          <motion.div // This motion.div creates a 3D space for the flip animation.
            className="preserve-3d relative h-full w-full"
            transition={{ duration: 0.3, delay: isInitializing ? 1 : 0 }}
            initial={{ rotateY: view === 'blog' ? 0 : 180 }}
            animate={{ rotateY: view === 'blog' ? 0 : 180 }}
            style={{ transformStyle: 'preserve-3d' }} // transformStyle: 'preserve-3d' makes the children inherit the 3D transform
          >
            <div className="backface-hidden absolute inset-0">
              <Link
                inert={view === 'video'}
                href={`/articles/${article.attributes.slug}`}
                className="backface-hidden" // backface-visibility: hidden; hides the back side when rotated
                aria-label={`Read article: ${article.attributes.title}${
                  publishedDate ? `, published ${timeAgo}` : ', draft'
                }`}
                title={article.attributes.title}>
                <figure className="relative h-full w-full">
                  <Image
                    fill
                    alt={article.attributes.title}
                    className="object-cover transition-transform duration-200"
                    src={article.attributes.banner || placeholder}
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                  />
                </figure>
                <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
              </Link>
            </div>
            {/* Back side - Video view */}
            <motion.div
              ref={videoEmbedRef}
              className="backface-hidden [&_button]:user-select-none absolute inset-0 [&_button:focus-visible]:outline-none" // backface-visibility: hidden; hides the back side when rotated
              style={{ transform: 'rotateY(180deg)' }} // Rotates the back side to face forward initially
            >
              {/* @ts-expect-error - inert is not a registered prop but it works */}
              <YouTubeEmbed inert={view === 'blog'} videoid={article.attributes.videoId!} />
              <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
            </motion.div>
          </motion.div>
        ) : (
          // Static content for items without video - no animation, no unmounting
          <Link
            href={`/articles/${article.attributes.slug}`}
            aria-label={`Read article: ${article.attributes.title}${publishedDate ? `, published ${timeAgo}` : ', draft'}`}
            title={article.attributes.title}>
            <figure className="relative h-full w-full">
              <Image
                fill
                alt={article.attributes.title}
                className="object-cover transition-transform duration-200"
                src={article.attributes.banner || placeholder}
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            </figure>
            <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
          </Link>
        )}
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

      <div>
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
      </div>
    </section>
  );
};
