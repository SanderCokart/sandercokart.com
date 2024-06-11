import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import { Button } from '@repo/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { Textarea } from '@repo/ui/textarea';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import type { Article } from '@/types/models.ts';

import { api } from '@/lib/api.ts';

import '@mdxeditor/editor/style.css';

export const Route = createFileRoute('/_auth/articles/$articleSlug/edit')({
  beforeLoad: ({ params: { articleSlug } }) => ({
    fetchArticle: async ({ signal }: { signal: AbortSignal }) => {
      const { data: article } = await api.get<Article>(`/articles/${articleSlug}`, { signal });

      return article;
    },
  }),
  loader: async ({ context: { fetchArticle }, abortController }) => {
    const article = await fetchArticle({
      signal: abortController.signal,
    });

    return { article };
  },
  component: () => (
    <main>
      <EditArticleForm />
    </main>
  ),
});

function EditArticleForm() {
  const { article } = useLoaderData({ from: '/_auth/articles/$articleSlug/edit' });
  const form = useForm({
    defaultValues: article,
  });

  const onSubmit = form.handleSubmit(async data => {
    await api.put(`/articles/${article.slug}`, data);
  });

  return (
    <Form {...form}>
      <form noValidate onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input required {...field} placeholder="Some cool article title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Some description" />
                </FormControl>
                <FormDescription>
                  It should be a short paragraph that describes what the article is about. It is shown to the user
                  before they click on the article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="content"
          render={({}) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDXEditor
                  markdown="bla"
                  plugins={[
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                        </>
                      ),
                    }),
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                  ]}
                />
              </FormControl>
              <FormDescription>This is where you write the article content.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
