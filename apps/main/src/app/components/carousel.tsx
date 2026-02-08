'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/shadcn/carousel';
import { Switch } from '@repo/ui/components/shadcn/switch';
import { cn } from '@repo/ui/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Expand, Pause, Play, Tv } from 'lucide-react';

import { ComponentProps, FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/model-types';

import placeholder from '@/app/placeholder.webp';

// Blog card component
const BlogCard: FC<{ article: ArticleModel }> = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/articles/${article.attributes.slug}`}
      className="group/card focus:ring-accent focus:ring-offset-background relative block aspect-video overflow-hidden rounded-sm transition-transform duration-300 ease-out hover:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2">
      <figure
        className="group/figure relative h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Image
          fill
          alt={article.attributes.title}
          className="scale-110 object-cover transition-transform duration-500 group-hover/card:scale-100"
          src={article.attributes.banner || placeholder}
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />

        <span
          className="bg-accent text-accent-foreground absolute left-3 top-3 w-fit rounded px-2 py-0.5 text-xs font-medium"
          title={format(article.attributes.createdAt, 'PPPPpp')}>
          {formatDistanceToNow(article.attributes.createdAt, { addSuffix: true })}
        </span>

        <figcaption className="absolute inset-0 flex flex-col justify-between p-3">
          <div className="bg-card/80 text-card-foreground absolute inset-x-0 bottom-0">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}>
                  <h3 className="text-foreground line-clamp-2 text-balance text-sm font-semibold drop-shadow-md md:text-base">
                    {article.attributes.title}
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
            {article.attributes.videoId && (
              <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                <Tv className="h-3 w-3" />
                Video available
              </span>
            )}
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

// YouTube video player with controls
const VideoCard: FC<{ article: ArticleModel }> = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoId = article.attributes.videoId;

  const handleMouseEnter = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      const action = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: action, args: [] }), '*');
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'group/video relative aspect-video overflow-hidden rounded-sm transition-all duration-300 ease-out',
        isHovered && 'shadow-background/50 z-20 scale-110 shadow-2xl',
        isFullscreen && 'scale-100',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* Thumbnail when not hovered */}
      {!isHovered && (
        <div className="relative h-full w-full">
          <Image
            fill
            alt={article.attributes.title}
            className="object-cover"
            src={article.attributes.banner || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
          {/* Play button overlay */}
          <div className="bg-background/30 absolute inset-0 flex items-center justify-center">
            <div className="bg-accent/90 text-accent-foreground flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110">
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            </div>
          </div>
          {/* Gradient overlay */}
          <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80" />
          {/* Title */}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <h3 className="text-foreground line-clamp-2 text-balance text-sm font-semibold drop-shadow-md md:text-base">
              {article.attributes.title}
            </h3>
          </div>
        </div>
      )}

      {/* YouTube embed when hovered */}
      {isHovered && (
        <>
          <iframe
            ref={iframeRef}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&controls=0&modestbranding=1&rel=0`}
            title={article.attributes.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Custom controls overlay */}
          <div className="from-background/90 absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t to-transparent p-3 opacity-0 transition-opacity group-hover/video:opacity-100">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="bg-accent text-accent-foreground hover:bg-accent/80 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
                )}
              </button>
              <span className="text-foreground/80 line-clamp-1 text-xs font-medium">{article.attributes.title}</span>
            </div>
            <button
              onClick={handleFullscreen}
              className="bg-primary text-primary-foreground hover:bg-primary/80 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              aria-label="Fullscreen">
              <Expand className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Mode toggle component (desktop only) - uses primary colors
const ModeToggle: FC<{
  isVideoMode: boolean;
  onToggle: (checked: boolean) => void;
  hasVideos: boolean;
}> = ({ isVideoMode, onToggle, hasVideos }) => {
  if (!hasVideos) return null;

  return (
    <div className="bg-muted hidden items-center gap-3 rounded-full px-4 py-2 md:flex">
      <span
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
          !isVideoMode ? 'text-primary' : 'text-muted-foreground',
        )}>
        <BookOpen className="h-4 w-4" />
        Blog
      </span>
      <Switch checked={isVideoMode} onCheckedChange={onToggle} aria-label="Toggle video mode" />
      <span
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
          isVideoMode ? 'text-accent' : 'text-muted-foreground',
        )}>
        <Tv className="h-4 w-4" />
        Video
      </span>
    </div>
  );
};

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-between px-4 py-4 md:px-8">
    <h2 className="font-digital text-foreground text-2xl font-bold uppercase tracking-wide md:text-3xl lg:text-4xl">
      <span className="border-accent border-l-4 pl-3">{title}</span>
    </h2>
  </div>
);

export const CarouselSection: FC<{
  title: string;
  articles: ArticleModel[];
}> = ({ title, articles }) => {
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile and reset to blog mode
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && isVideoMode) {
        setIsVideoMode(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isVideoMode]);

  // Filter articles with videos for video mode
  const articlesWithVideos = articles.filter(article => article.attributes.videoId);
  const hasVideos = articlesWithVideos.length > 0;

  // In video mode, only show articles with videos; in blog mode show all
  const displayArticles = isVideoMode ? articlesWithVideos : articles;

  // Force blog mode on mobile
  const effectiveVideoMode = !isMobile && isVideoMode && hasVideos;

  return (
    <section>
      <div>
        <SectionHeader title={title} />

        <div className="px-4 md:px-8">
          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            className="group/carousel relative w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayArticles.map(article => (
                <CarouselItem
                  key={article.attributes.slug}
                  className="basis-[85%] pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                  {effectiveVideoMode && article.attributes.videoId ? (
                    <VideoCard article={article} />
                  ) : (
                    <BlogCard article={article} />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-primary/90 text-primary-foreground hover:bg-primary absolute left-0 top-1/2 z-10 h-full w-10 -translate-y-1/2 rounded-none border-none opacity-0 transition-all duration-300 disabled:pointer-events-none disabled:opacity-0 group-hover/carousel:opacity-100 md:w-14" />
            <CarouselNext className="bg-primary/90 text-primary-foreground hover:bg-primary absolute right-0 top-1/2 z-10 h-full w-10 -translate-y-1/2 rounded-none border-none opacity-0 transition-all duration-300 disabled:pointer-events-none disabled:opacity-0 group-hover/carousel:opacity-100 md:w-14" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { BlogCard, VideoCard, ModeToggle };
