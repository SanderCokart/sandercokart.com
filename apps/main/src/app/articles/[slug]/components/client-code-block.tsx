import { Skeleton } from '@repo/ui/components/shadcn/skeleton';

import { Suspense } from 'react';

import type { ComponentPropsWithoutRef } from 'react';

import { AsyncCodeBlock } from './async-code-block';

/**
 * Client-side code block component that handles async syntax highlighting for articles.
 *
 * This component provides a client-side wrapper around AsyncCodeBlock that includes
 * a loading skeleton fallback while the syntax highlighting is being processed.
 * It's designed to work with Next.js static generation while deferring the heavy
 * highlighting work to the client side.
 */

/**
 * Skeleton loading component that displays while code syntax highlighting is being processed.
 *
 * Shows an animated placeholder that mimics the structure of a code block with
 * language indicator and multiple lines of code-like content.
 */
function CodeBlockSkeleton({ code }: { code: string }) {
  // Calculate number of skeleton lines based on code content
  const lineCount = Math.max(3, Math.min(15, code.split('\n').length)) + 2;

  // Generate varied widths that mimic code structure (some short, some long)
  const generateSkeletonWidth = (index: number) => {
    const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/6', 'w-2/6', 'w-1/2'];
    // Use a pseudo-random but deterministic pattern based on index
    const pattern = [0, 1, 2, 0, 3, 4, 0, 1, 5, 2, 0, 3, 1, 4, 0];
    const patternIndex = index % pattern.length;
    const widthIndex = pattern[patternIndex]!;
    return widths[widthIndex] || widths[0];
  };

  return (
    <div className="not-prose border-accent relative overflow-hidden rounded-md border pb-2 pt-6">
      <pre className="[white-space-collapse:preserve]">
        <code className="block w-fit min-w-full px-2">
          <div className="space-y-1">
            {Array.from({ length: lineCount }, (_, i) => (
              <Skeleton key={i} className={`h-4 ${generateSkeletonWidth(i)}`} />
            ))}
          </div>
        </code>
      </pre>
    </div>
  );
}

/**
 * Client-side code block component that renders syntax-highlighted code with Suspense.
 *
 * This component wraps AsyncCodeBlock in a Suspense boundary, showing a skeleton
 * loader while the syntax highlighting is being performed. It accepts code content,
 * language identifier, optional metadata, and standard HTML code element props.
 *
 * @param code - The raw code content to be highlighted
 * @param lang - The programming language identifier for syntax highlighting
 * @param meta - Optional metadata string for additional highlighting features
 * @param className - Optional CSS class name for styling
 * @param props - Additional HTML code element properties
 */
export function ClientCodeBlock({
  code,
  lang,
  meta,
  className,
  ...props
}: {
  code: string;
  lang: string;
  meta?: string;
  className?: string;
} & ComponentPropsWithoutRef<'code'>) {
  return (
    <Suspense fallback={<CodeBlockSkeleton code={code} />}>
      <AsyncCodeBlock code={code} lang={lang} meta={meta} className={className} {...props} />
    </Suspense>
  );
}
