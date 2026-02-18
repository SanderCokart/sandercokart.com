import { CarouselSection } from '@/app/components/carousel';
import { getArticlesByType, getArticleTypes } from '@/lib/actions/articles';

export default async function LandingPage() {
  const articleTypes = await getArticleTypes();

  // The types listed here will be displayed first in the carousel
  const featuredArticleTypes = ['reviews', 'guides', 'code', 'tips'];

  // Sort articleTypes: featured first, then alphabetical
  const sortedArticleTypes = [...articleTypes].sort((a, b) => {
    const aFeaturedIndex = featuredArticleTypes.indexOf(a);
    const bFeaturedIndex = featuredArticleTypes.indexOf(b);

    if (aFeaturedIndex !== -1 && bFeaturedIndex !== -1) {
      return aFeaturedIndex - bFeaturedIndex; // Both are featured, maintain order
    }

    if (aFeaturedIndex !== -1) {
      return -1; // a is featured, b is not, a comes first
    }

    if (bFeaturedIndex !== -1) {
      return 1; // b is featured, a is not, b comes first
    }

    return a.localeCompare(b); // Neither is featured, sort alphabetically
  });

  return (
    <main className="flex grow flex-col py-6">
      {sortedArticleTypes.map(async articleType => {
        const titleCase = articleType.charAt(0).toUpperCase() + articleType.slice(1);
        const articles = await getArticlesByType(articleType);
        return <CarouselSection key={articleType} title={titleCase} articles={articles} />;
      })}
    </main>
  );
}
