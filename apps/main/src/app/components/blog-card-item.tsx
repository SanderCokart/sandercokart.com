'use client';

import { YouTubeEmbed } from '@next/third-parties/google';
import { motion } from 'motion/react';
import { FC, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ArticleModel } from '@/types/model-types';
import placeholder from '@/app/placeholder.webp';
import { useBlogView } from './blog-view-switch';

interface BlogCardProps {
  article: ArticleModel;
  timeAgo: string;
  publishedDate: Date | null;
}

export const BlogCard: FC<BlogCardProps> = ({ article, timeAgo, publishedDate }) => {
  return (
    <div className="relative h-full w-full">
      <Link
        href={`/articles/${article.attributes.slug}`}
        aria-label={`Read article: ${article.attributes.title}${publishedDate ? `, published ${timeAgo}` : ', draft'}`}>
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

export const VideoCard: FC<BlogCardProps> = ({ article, timeAgo, publishedDate }) => {
  const { view, isInitializing } = useBlogView();
  const videoEmbedRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="preserve-3d relative h-full w-full"
      transition={{ duration: 0.3, delay: isInitializing ? 1 : 0 }}
      initial={{ rotateY: view === 'blog' ? 0 : 180 }}
      animate={{ rotateY: view === 'blog' ? 0 : 180 }}
      style={{ transformStyle: 'preserve-3d' }}>
      <div className="backface-hidden absolute inset-0">
        <Link
          inert={view === 'video'}
          href={`/articles/${article.attributes.slug}`}
          className="backface-hidden"
          aria-label={`Read article: ${article.attributes.title}${publishedDate ? `, published ${timeAgo}` : ', draft'}`}>
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
      <motion.div
        ref={videoEmbedRef}
        className="backface-hidden [&_button]:user-select-none absolute inset-0 [&_button:focus-visible]:outline-none"
        style={{ transform: 'rotateY(180deg)' }}>
        {/* @ts-expect-error - inert is not a registered prop but it works */}
        <YouTubeEmbed inert={view === 'blog'} videoid={article.attributes.videoId!} />
        <TimeOverlay timeAgo={timeAgo} publishedDate={publishedDate} />
      </motion.div>
    </motion.div>
  );
};

const TimeOverlay: FC<{ timeAgo: string; publishedDate: Date | null }> = ({ timeAgo, publishedDate }) => (
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

export const BlogCardItem: FC<BlogCardProps> = (props) => {
  const hasVideo = Boolean(props.article.attributes.videoId);

  if (hasVideo) {
    return <VideoCard {...props} />;
  }

  return <BlogCard {...props} />;
};
