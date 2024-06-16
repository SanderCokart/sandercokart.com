import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor as MDXEditorComponent,
  quotePlugin,
  StrikeThroughSupSubToggles,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';

import type { ImageUploadHandler, MDXEditorProps } from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';
import './mdx-editor.overrides.css';

import { forwardRef, useMemo } from 'react';

import type { ElementRef } from 'react';

import { api } from '@/lib/api.ts';
import { cn } from '@/lib/utils.ts';

function Divider() {
  return <div className="h-6 border-r border-white/25" />;
}

function ToolbarContents() {
  return (
    <>
      <DiffSourceToggleWrapper>
        <UndoRedo />
        <Divider />
        <BoldItalicUnderlineToggles />
        <CodeToggle />
        <Divider />
        <StrikeThroughSupSubToggles />
        <Divider />
        <ListsToggle />
        <Divider />
        <BlockTypeSelect />
        <Divider />
        <CreateLink />
        <InsertImage />
        <Divider />
        <InsertTable />
        <InsertThematicBreak />
        <Divider />
        <ConditionalContents
          options={[
            { when: editor => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
            // { when: editor => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
            {
              fallback: () => <InsertCodeBlock />,
            },
          ]}
        />
        {/*<Divider />*/}
        {/*<InsertAdmonition />*/}
      </DiffSourceToggleWrapper>
      <Divider />
    </>
  );
}

const imageUploadHandler: ImageUploadHandler = async image => {
  const { data } = await api.uploadFile<{ url: string }>('/articles/upload', image);

  return data.url;
};

export const MDXEditor = forwardRef<ElementRef<typeof MDXEditorComponent>, Omit<MDXEditorProps, 'plugins'>>(
  function MDXEditor({ contentEditableClassName, className, ...restOfProps }, ref) {
    const initialContent = useMemo(() => {
      return restOfProps.markdown;
    }, []);

    return (
      <div>
        <MDXEditorComponent
          ref={ref}
          className={cn('editor', className)}
          contentEditableClassName={cn(
            'text-foreground bg-background prose dark:prose-invert max-w-none',
            contentEditableClassName,
          )}
          {...restOfProps}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => <ToolbarContents />,
            }),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'ts' }),
            codeMirrorPlugin({ codeBlockLanguages: { ts: 'Typescript', css: 'CSS' } }),
            diffSourcePlugin({ diffMarkdown: initialContent, viewMode: 'rich-text' }),
            headingsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            listsPlugin(),
            // directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
            markdownShortcutPlugin(),
            markdownShortcutPlugin(),
            quotePlugin(),
            imagePlugin({
              disableImageResize: true,
              imageUploadHandler,
              imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
            }),
            tablePlugin(),
            thematicBreakPlugin(),
          ]}
        />
      </div>
    );
  },
);
