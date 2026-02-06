import { NetflixCarouselSection } from '@/app/components/netflix-carousel';
import { getArticlesByType } from '@/lib/actions/articles';

export default async function LandingPage() {
  const generalArticles = await getArticlesByType('general');
  const tipsArticles = await getArticlesByType('tips');

  return (
    <main className="flex grow flex-col py-6">
      <NetflixCarouselSection title="General" articles={generalArticles} />
      <NetflixCarouselSection title="Tips" articles={tipsArticles} />
    </main>
  );
}
