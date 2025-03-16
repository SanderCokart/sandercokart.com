'use client';

import { useClipboard } from '@mantine/hooks';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/components/shadcn/tooltip';

export function CopyToClipboardTooltip({ children }: { children: string }) {
  const { copy, copied } = useClipboard({ timeout: 500 });

  const copyToClipboard = () => {
    copy(children);
  };

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger className="hover:text-accent transition-colors" onClick={copyToClipboard}>
          {children}
        </TooltipTrigger>
        <TooltipContent>Copied to clipboard!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
