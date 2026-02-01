import { NetflixCarouselSection } from '@/app/components/netflix-carousel';
import { getArticlesByType } from '@/lib/actions/articles';

export async function Articles() {
  const generalArticles = await getArticlesByType('general');
  const tipsArticles = await getArticlesByType('tips');

  return (
    <div className="flex flex-col gap-6 py-8 md:gap-10 md:py-12">
      <NetflixCarouselSection title="General" articles={generalArticles} />
      <NetflixCarouselSection title="Tips" articles={tipsArticles} />
    </div>
  );
}
