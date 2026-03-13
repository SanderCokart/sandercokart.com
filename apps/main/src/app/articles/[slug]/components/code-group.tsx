import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/shadcn/tabs';
import { FileIcon } from 'lucide-react';

import React from 'react';

import { languageIconMap } from '../utils/language-icons';

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const blocks = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{
    name?: string;
    className?: string;
    isGrouped?: boolean;
  }>[];

  if (blocks.length === 0) return null;
  if (blocks.length === 1) return <>{children}</>;

  const defaultTab = blocks[0]?.props?.name || 'tab-0';

  const getLanguageIcon = (block: (typeof blocks)[0]) => {
    const name = block.props?.name ?? '';
    const ext = name.includes('.') ? name.split('.').at(-1)?.toLowerCase() : null;
    if (ext && languageIconMap[ext]) return languageIconMap[ext];

    const className = block.props?.className ?? '';
    const lang = className.replace(/^language-/, '') || 'plaintext';
    const icon = languageIconMap[lang];
    if (icon) return icon;

    return <FileIcon className="size-4" />;
  };

  return (
    <Tabs defaultValue={defaultTab} className="not-prose">
      <TabsList variant="editor">
        {blocks.map((block, index) => {
          const name = block.props.name || `Tab ${index + 1}`;
          return (
            <TabsTrigger key={name} value={name}>
              <span className="text-accent mr-2 flex size-4 shrink-0 items-center justify-center">
                {getLanguageIcon(block)}
              </span>
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {blocks.map((block, index) => {
        const name = block.props.name || `Tab ${index + 1}`;
        return (
          <TabsContent key={name} value={name}>
            {React.cloneElement(block, { isGrouped: true })}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}