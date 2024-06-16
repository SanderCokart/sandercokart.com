import { Button } from '@repo/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { Textarea } from '@repo/ui/textarea';
import { useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';

import type { ArticleShow } from '@/types/models.ts';

import { MDXEditor } from '@/components/mdx-editor/mdx-editor.tsx';

export interface ArticleFormProps {
  onSubmit: (data: ArticleShow) => Promise<void>;
  defaultValues?: ArticleShow;
}

export const ArticleForm = ({ onSubmit, defaultValues }: ArticleFormProps) => {
  const form = useForm({
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async data => {
    await onSubmit(data);
  });

  return (
    <Form {...form}>
      <form noValidate className="@container h-full" onSubmit={handleSubmit}>
        <header className="bg-accent text-accent-foreground sticky top-0 z-10 flex h-12 items-center rounded-b border px-10">
          <Button disabled={form.formState.isSubmitting} size="icon" type="submit" variant="ghost">
            {form.formState.isSubmitting ? <FaSpinner className="animate-spin" /> : <FaSave />}
          </Button>
        </header>
        <div className="@3xl:grid-cols-2 grid gap-8">
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
          render={({ field: { value, ...restOfField } }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDXEditor markdown={value} {...restOfField} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
