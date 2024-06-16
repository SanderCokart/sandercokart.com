import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { ArticleFormProps } from '@/components/forms/article-form.tsx';
import type { ArticleShow } from '@/types/models.ts';

import { ArticleForm } from '@/components/forms/article-form.tsx';

import { api } from '@/lib/api.ts';

export const Route = createFileRoute('/_auth/articles/$articleSlug/edit')({
  beforeLoad: ({ params: { articleSlug } }) => ({
    fetchArticle: async ({ signal }: { signal: AbortSignal }) => {
      const { data: article } = await api.get<ArticleShow>(`/articles/${articleSlug}`, { signal });

      return article;
    },
  }),
  loader: async ({ context: { fetchArticle }, abortController }) => {
    const article = await fetchArticle({
      signal: abortController.signal,
    });

    return { article };
  },
  component: EditArticleForm,
});

function EditArticleForm() {
  const { article } = useLoaderData({ from: '/_auth/articles/$articleSlug/edit' });

  const onSubmit: ArticleFormProps['onSubmit'] = async data => {
    await api.put(`/articles/${article.slug}`, data);
  };

  return (
    <main className="grow">
      <ArticleForm defaultValues={article} onSubmit={onSubmit} />
    </main>
  );
}
