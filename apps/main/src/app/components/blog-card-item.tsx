'use client';

import { YouTubeEmbed } from '@next/third-parties/google';
import { cn } from '@repo/ui/lib/utils';
import { motion } from 'motion/react';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';

import placeholder from '@/app/placeholder.webp';

import { useBlogView } from './blog-view-switch';

export type BlogCardProps = {
  article: ArticleModel;
  timeAgo: string;
  publishedDate: Date | null;
};

type TimeOverlayProps = Pick<BlogCardProps, 'timeAgo' | 'publishedDate'>;

function articleLinkAriaLabel({ article, timeAgo, publishedDate }: BlogCardProps): string {
  return `Read article: ${article.attributes.title}${publishedDate ? `, published ${timeAgo}` : ', draft'}`;
}

const TimeOverlay: React.FC<TimeOverlayProps> = ({ timeAgo, publishedDate }) => (
  <div
    className="bg-accent text-accent-foreground absolute bottom-3 left-3 rounded px-2 py-1 text-sm font-medium"
    suppressHydrationWarning
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

export const BlogCard: React.FC<BlogCardProps & React.ComponentProps<'div'>> = ({
  article,
  timeAgo,
  publishedDate,
  className,
  ...props
}) => {
  return (
    <div className={cn('relative h-full w-full', className)} {...props}>
      <Link
        href={`/articles/${article.attributes.slug}`}
        aria-label={articleLinkAriaLabel({ article, timeAgo, publishedDate })}>
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
    </div>
  );
};

export const VideoCard: React.FC<BlogCardProps & React.ComponentProps<'div'>> = ({
  article,
  timeAgo,
  publishedDate,
  className,
  ...props
}) => {
  const { view } = useBlogView();

  return (
    <div
      className={cn(
        'backface-hidden [&_button]:user-select-none absolute inset-0 [&_button:focus-visible]:outline-none',
        className,
      )}
      {...props}
      style={{ transform: 'rotateY(180deg)' }}>
      {/* @ts-expect-error - inert is not a registered prop but it works */}
      <YouTubeEmbed inert={view === 'blog'} videoid={article.attributes.videoId!} />
      <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
    </div>
  );
};

export const FlippableCard: React.FC<BlogCardProps & React.ComponentProps<typeof motion.div>> = ({
  article,
  timeAgo,
  publishedDate,
  className,
  ...motionDivProps
}) => {
  const { view, isInitializing } = useBlogView();
  const cardProps: BlogCardProps = { article, timeAgo, publishedDate };
  const cardFaceClipClassName = 'overflow-hidden rounded-sm';

  return (
    <motion.div
      className={cn('preserve-3d relative h-full w-full', className)}
      transition={{ duration: 0.3, delay: isInitializing ? 1 : 0 }}
      initial={{ rotateY: view === 'blog' ? 0 : 180 }}
      animate={{ rotateY: view === 'blog' ? 0 : 180 }}
      style={{ transformStyle: 'preserve-3d' }}
      {...motionDivProps}>
      <div className={cn('backface-hidden absolute inset-0', cardFaceClipClassName)}>
        <BlogCard {...cardProps} />
      </div>
      <VideoCard {...cardProps} className={cardFaceClipClassName} />
    </motion.div>
  );
};

export const BlogCardItem: React.FC<BlogCardProps> = props => {
  /** YouTube posts use a 3D flip; static posts are a single image/link surface. */
  const hasVideo = Boolean(props.article.attributes.videoId);

  /** Shared hover/focus treatment (scale + accent border). Applied where the visible card “shell” lives for each variant. */
  const cardHoverFocusClassName = cn(
    'rounded-sm',
    'focus-within:border-accent transition-[scale,border] focus-within:scale-95 focus-within:border-2',
    'hover:border-accent transition-[scale,border] hover:scale-95 hover:border-2',
  );

  /**
   * Static cards: clip the image to `rounded-sm` and attach hover/focus here so the whole tile responds (BlogCard has no outer wrapper class).
   * Video cards: only `aspect-video` + positioning on `<article>` — overflow and hover/focus stay on `FlippableCard` so preserve-3d / flip layout is not clipped or scaled at the wrong level.
   */
  const rootArticleClassName = cn('relative aspect-video', !hasVideo && ['overflow-hidden', cardHoverFocusClassName]);

  return (
    <article className={rootArticleClassName}>
      {hasVideo ? <FlippableCard {...props} className={cardHoverFocusClassName} /> : <BlogCard {...props} />}
    </article>
  );
};
