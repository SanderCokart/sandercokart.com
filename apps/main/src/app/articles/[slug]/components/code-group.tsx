import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/shadcn/tabs';
import { FileIcon } from 'lucide-react';

import React from 'react';

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const blocks = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];

  if (blocks.length === 0) return null;
  if (blocks.length === 1) return <>{children}</>;

  const defaultTab = blocks[0].props.name || 'tab-0';

  return (
    <Tabs defaultValue={defaultTab} className="not-prose my-6 w-full">
      <TabsList variant="line" className="mb-2 w-full justify-start border-b">
        {blocks.map((block, index) => {
          const name = block.props.name || `Tab ${index + 1}`;
          return (
            <TabsTrigger key={name} value={name}>
              <FileIcon className="mr-2 h-4 w-4" />
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {blocks.map((block, index) => {
        const name = block.props.name || `Tab ${index + 1}`;
        return (
          <TabsContent key={name} value={name} className="mt-0">
            {React.cloneElement(block, { isGrouped: true })}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
