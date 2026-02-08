import { CarouselSection } from '@/app/components/carousel';
import { getArticlesByType } from '@/lib/actions/articles';

export default async function LandingPage() {
  const generalArticles = await getArticlesByType('general');
  const tipsArticles = await getArticlesByType('tips');

  return (
    <main className="flex grow flex-col py-6">
      <CarouselSection title="General" articles={generalArticles} />
      <CarouselSection title="Tips" articles={tipsArticles} />
    </main>
  );
}
