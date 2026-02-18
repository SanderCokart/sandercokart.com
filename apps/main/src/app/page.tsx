import { CarouselSection } from '@/app/components/carousel';
import { getArticlesByType, getArticleTypes } from '@/lib/actions/articles';

export default async function LandingPage() {
  const articleTypes = await getArticleTypes();

  // The types listed here will be displayed first in the carousel
  const prioritizedArticleTypes = ['reviews', 'guides', 'code', 'tips'];

  // Sort articleTypes: prioritized first, then alphabetical
  const sortedArticleTypes = [...articleTypes].sort((a, b) => {
    const priorityA = prioritizedArticleTypes.indexOf(a);
    const priorityB = prioritizedArticleTypes.indexOf(b);

    if (priorityA !== -1 && priorityB !== -1) return priorityA - priorityB; // Both are prioritized, maintain order
    if (priorityA !== -1) return -1; // a is prioritized, b is not, a comes first
    if (priorityB !== -1) return 1; // b is prioritized, a is not, b comes first

    return a.localeCompare(b);
  });

  return (
    <main className="flex grow flex-col py-6">
      <div className="flex justify-end"></div>
      {sortedArticleTypes.map(async articleType => {
        const titleCase = articleType.charAt(0).toUpperCase() + articleType.slice(1);
        const articles = await getArticlesByType(articleType);
        return <CarouselSection mode="video" key={articleType} title={titleCase} articles={articles} />;
      })}
    </main>
  );
}
