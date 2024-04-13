'use client';

import { useClipboard } from '@mantine/hooks';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/tooltip';

export function CopyToClipboardTooltip({ children }: { children: string }) {
  const { copy, copied } = useClipboard({ timeout: 500 });

  const copyToClipboard = () => {
    copy(children);
  };

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger className="transition-colors hover:text-accent" onClick={copyToClipboard}>
          {children}
        </TooltipTrigger>
        <TooltipContent>Copied to clipboard!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
