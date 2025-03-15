import type { ReactNode } from 'react';

interface QuoteProps {
  author: string;
  children: ReactNode;
}

export function Quote({ children, author }: QuoteProps) {
  return (
    <figure className="pointer-events-none my-12 px-4 lg:pointer-events-auto">
      <div className="m-4 md:m-0">
        <blockquote className="bg-primary rounded-3xl transition-colors dark:bg-transparent">
          <p className="before:text-accent after:text-accent relative before:absolute before:left-2 before:top-2 before:grid before:h-8 before:place-items-start before:font-serif before:text-7xl before:content-['\\201C'] after:absolute after:bottom-2 after:right-2 after:grid after:h-8 after:place-items-end after:font-serif after:text-7xl after:content-['\\201D'] md:before:left-0 md:before:top-0 md:before:h-14 before:md:text-9xl md:after:bottom-0 md:after:right-0 md:after:h-14 after:md:text-9xl">
            <span className="block p-8 text-center text-2xl font-bold italic text-white md:p-12 md:text-left md:text-3xl">
              {children}
            </span>
          </p>
        </blockquote>
        <figcaption className="text-muted-foreground mt-2 text-center text-xl italic sm:text-right sm:text-2xl">
          &#8212; {author}
        </figcaption>
      </div>
    </figure>
  );
}
