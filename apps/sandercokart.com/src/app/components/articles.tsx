import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/carousel';

import Image from 'next/image';
import Link from 'next/link';

import { getArticlesByType } from '@/lib/actions/articles';

import placeholder from '../placeholder.webp';

export async function Articles() {
  const generalArticles = await getArticlesByType('general');
  const tipsArticles = await getArticlesByType('tips');

  return (
    <>
      <h1 className="font-digital bg-accent text-accent-foreground w-full text-center text-3xl uppercase">General</h1>
      <Carousel className="bg-muted w-full">
        <CarouselContent className="px-8">
          {generalArticles.map(article => (
            <CarouselItem key={article.attributes.slug} className="basis-1/3">
              <figure className="relative aspect-video max-h-96 grow">
                <Link href={`/articles/${article.attributes.slug}`}>
                  <Image
                    fill
                    alt={article.attributes.title}
                    className="absolute inset-0"
                    src="/banners/oneplus-5-review.jpg"
                  />
                  <figcaption className="bg-muted/75 absolute inset-x-0 bottom-0 h-20 px-2">
                    <span className="line-clamp-3">{article.attributes.summary}</span>
                  </figcaption>
                </Link>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute inset-y-0 left-0 h-full transform-none rounded-none" />
        <CarouselNext className="absolute inset-y-0 right-0 h-full transform-none rounded-none" />
      </Carousel>
      <h1 className="font-digital bg-accent text-accent-foreground w-full text-center text-3xl uppercase">Tips</h1>
      <Carousel className="bg-muted w-full">
        <CarouselContent className="px-8">
          {tipsArticles.map(article => (
            <CarouselItem key={article.attributes.slug} className="basis-1/3">
              <figure className="relative aspect-video max-h-96 grow">
                <Link href={`/articles/${article.attributes.slug}`}>
                  {article.attributes && (
                    <Image
                      fill
                      alt={article.attributes.title}
                      className="absolute inset-0"
                      src={article.attributes.banner || placeholder}
                    />
                  )}
                  <figcaption className="bg-muted/75 absolute inset-x-0 bottom-0 h-20 px-2">
                    <span className="line-clamp-3">{article.attributes.summary}</span>
                  </figcaption>
                </Link>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute inset-y-0 left-0 h-full transform-none rounded-none" />
        <CarouselNext className="absolute inset-y-0 right-0 h-full transform-none rounded-none" />
      </Carousel>
    </>
  );
}
