import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  directivesPlugin,
  headingsPlugin,
  InsertAdmonition,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
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

import '@mdxeditor/editor/style.css';
import './mdx-editor.overrides.css';

import { forwardRef } from 'react';

import type { ElementRef } from 'react';
import type { MDXEditorProps } from '@mdxeditor/editor';

import { cn } from '@/lib/utils.ts';

function Divider() {
  return <div className="h-6 border-r border-white" />;
}

function ToolbarContents() {
  return (
    <>
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
      <Divider />
      <InsertAdmonition />
    </>
  );
}

export const MDXEditor = forwardRef<ElementRef<typeof MDXEditorComponent>, Omit<MDXEditorProps, 'plugins'>>(
  function MDXEditor({ contentEditableClassName, className, ...restOfProps }, ref) {
    return (
      <div>
        <MDXEditorComponent
          ref={ref}
          className={cn('editor', className)}
          contentEditableClassName={cn(
            'text-foreground bg-background dark:prose-invert max-w-none',
            contentEditableClassName,
          )}
          {...restOfProps}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => <ToolbarContents />,
            }),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'ts' }),
            codeMirrorPlugin({ codeBlockLanguages: { ts: 'Typescript', css: 'CSS' } }),

            headingsPlugin(),
            listsPlugin(),
            directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
            markdownShortcutPlugin(),
            markdownShortcutPlugin(),
            quotePlugin(),
            tablePlugin(),
            thematicBreakPlugin(),
          ]}
        />
      </div>
    );
  },
);
