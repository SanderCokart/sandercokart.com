'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/shadcn/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/components/shadcn/tooltip';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ReactNode, useEffect, useState } from 'react';

type GlossaryTermProps = {
  /** Glossary key used to look up `{term}_description` in the glossary namespace. */
  term: string;
  /** Visible label, usually the text inside a `<term>` rich-text tag. */
  children: ReactNode;
  /** Optional classes merged onto the trigger (e.g. highlight styling). */
  className?: string;
  /** Translation namespace for `{term}_description` keys. Defaults to `Glossary`. */
  namespace?: string;
};

/**
 * Inline glossary term with tooltip (desktop) or drawer (mobile).
 *
 * @see `.cursor/skills/docs/glossary.md` - adding terms, translation tags, and usage
 */
export function GlossaryTerm({ term, children, className, namespace = 'Glossary' }: GlossaryTermProps) {
  const t = useTranslations(namespace);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerClassName = cn('cursor-help underline decoration-dotted underline-offset-4', className);

  const description = t(`${term}_description`);

  if (!mounted) {
    return <strong className={triggerClassName}>{children}</strong>;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className={cn(triggerClassName, 'font-inherit inline border-0 bg-transparent p-0 text-left')}>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{children}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<strong className={triggerClassName} />}>{children}</TooltipTrigger>
        <TooltipContent className="max-w-xs text-pretty">{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
