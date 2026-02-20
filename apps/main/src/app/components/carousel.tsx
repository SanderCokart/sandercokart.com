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

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';

import placeholder from '@/app/placeholder.webp';

import { useBlogView } from './blog-view-context';

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

const MotionLink = motion.create(Link);
const MotionDiv = motion.create('div');

const BlogCard: FC<{ article: ArticleModel }> = ({ article }) => {
  const publishedDate = article.attributes.publishedAt ? new Date(article.attributes.publishedAt) : null;

  const timeAgo = publishedDate ? formatDistanceToNow(publishedDate, { addSuffix: true }) : 'DRAFT';

  const { view } = useBlogView();

  // Only animate items that have a video - others stay static
  const hasVideo = Boolean(article.attributes.videoId);
  const shouldAnimate = hasVideo;

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
        <div className="relative aspect-video overflow-hidden rounded-sm">
          {shouldAnimate ? (
            <MotionDiv
              className="preserve-3d relative h-full w-full"
              transition={{ duration: 0.3 }}
              initial={{ rotateY: view === 'video' ? 180 : 0 }}
              animate={{ rotateY: view === 'video' ? 180 : 0 }}
              style={{ transformStyle: 'preserve-3d' }}>
              {/* Front side - Article view */}
              <MotionLink
                href={`/articles/${article.attributes.slug}`}
                className={cn(
                  'backface-hidden absolute inset-0',
                  'focus:border-accent focus:scale-95 focus:border-2 focus:outline-none',
                  'hover:border-accent hover:scale-95 hover:border-2',
                  'transition-all duration-150',
                  'group-hover:shadow-lg',
                )}
                aria-label={`Read article: ${article.attributes.title}${publishedDate ? `, published ${timeAgo}` : ', draft'}`}
                title={article.attributes.title}
                style={{ transform: 'rotateY(0deg)' }}>
                <figure className="h-full w-full">
                  <Image
                    fill
                    alt={article.attributes.title}
                    className="object-cover transition-transform duration-200"
                    src={article.attributes.banner || placeholder}
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                  />
                </figure>
                <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
              </MotionLink>

              {/* Back side - Video view */}
              <MotionDiv className="backface-hidden absolute inset-0" style={{ transform: 'rotateY(180deg)' }}>
                <YouTubeEmbed videoid={article.attributes.videoId!} />
                <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
              </MotionDiv>
            </MotionDiv>
          ) : (
            // Static content for items without video - no animation, no unmounting
            <MotionLink
              href={`/articles/${article.attributes.slug}`}
              className={cn(
                'relative block h-full w-full overflow-hidden rounded-sm',
                'focus:border-accent focus:scale-95 focus:border-2 focus:outline-none',
                'hover:border-accent hover:scale-95 hover:border-2',
                'transition-all duration-150',
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
              <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
            </MotionLink>
          )}
        </div>
      </article>
    </CarouselItem>
  );
};

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <div className="py-4">
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
      </div>
    </section>
  );
};

export { BlogCard };
