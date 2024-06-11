import { createFileRoute } from '@tanstack/react-router';

import type { Article } from '@/types/models.ts';

import { ArticlesTable } from '@/components/articles-table.tsx';

import { api } from '@/lib/api.ts';

export const Route = createFileRoute('/_auth/articles')({
  beforeLoad: () => ({
    fetchArticles: async ({ signal }: { signal: AbortSignal }) => {
      const { data: articles } = await api.get<Article[]>('/articles', { signal });

      return articles;
    },
  }),
  loader: async ({ context: { fetchArticles }, abortController }) => {
    const articles = await fetchArticles({
      signal: abortController.signal,
    });

    return { articles };
  },
  component: ArticlesTable,
});
