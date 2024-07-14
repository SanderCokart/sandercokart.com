import {
  ArticleCarousel,
  ArticleCarouselContent,
  ArticleCarouselItem,
  ArticleCarouselNext,
  ArticleCarouselPrevious,
  ArticleFigure,
} from '@/app/components/carousel';
import { getArticlesByType } from '@/lib/actions/articles';

export async function Articles() {
  const generalArticles = await getArticlesByType('general');
  const tipsArticles = await getArticlesByType('tips');

  return (
    <>
      <h1 className="font-digital bg-accent text-accent-foreground w-full text-center text-3xl uppercase">General</h1>
      <ArticleCarousel>
        <ArticleCarouselContent>
          {generalArticles.map(article => (
            <ArticleCarouselItem key={article.attributes.slug}>
              <ArticleFigure article={article} />
            </ArticleCarouselItem>
          ))}
        </ArticleCarouselContent>
        <ArticleCarouselPrevious />
        <ArticleCarouselNext />
      </ArticleCarousel>
      <h1 className="font-digital bg-accent text-accent-foreground w-full text-center text-3xl uppercase">Tips</h1>
      <ArticleCarousel>
        <ArticleCarouselContent>
          {tipsArticles.map(article => (
            <ArticleCarouselItem key={article.attributes.slug}>
              <ArticleFigure article={article} />
            </ArticleCarouselItem>
          ))}
        </ArticleCarouselContent>
        <ArticleCarouselPrevious />
        <ArticleCarouselNext />
      </ArticleCarousel>
    </>
  );
}
