import type { CSSProperties, ElementType, ReactNode } from 'react';

interface NamedLogoProps {
  name: string;
  slogan: string;
  href: string;
  logo: ReactNode;
  Component?: ElementType;
}

/** Seconds per typed character; keep in sync with the `type-on` utility in themes/default.css. */
const TYPE_STEP = 0.045;
const NAME_DELAY = 0.3;

function typed(text: string, delay: number): CSSProperties {
  return { '--chars': text.length, '--type-delay': `${delay}s` } as CSSProperties;
}

/**
 * Header lockup: mark, site name and slogan. On load the mark fades up (an inline SegmentLogo also powers on),
 * then the name types itself out and the slogan follows with a cursor (the `type-on` utilities in themes/default.css).
 */
export function NamedLogo({ name, slogan, href = '/', logo, Component = 'a' }: NamedLogoProps) {
  const sloganDelay = NAME_DELAY + name.length * TYPE_STEP + 0.1;

  return (
    <Component href={href} className="group shrink-0">
      <div className="font-digital! grid grid-cols-[auto_auto] items-stretch gap-x-2 sm:gap-x-3">
        {/* Phones: the mark matches the 32px theme toggle and overhangs the two text rows by 2px each side.
            From sm it is square to the text block, with 4px padding. */}
        <span className="relative row-span-2 -my-0.5 size-8 sm:my-0 sm:aspect-square sm:h-full sm:min-h-0 sm:w-auto sm:p-1">
          <span className="ease-snap fill-mode-both zoom-in-85 fade-in animation-duration-500 motion-safe:animate-in relative block size-full drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]">
            {logo}
          </span>
        </span>
        <h1
          className="type-on group-hover:text-accent group-focus:text-accent text-base leading-none! whitespace-nowrap transition-colors sm:text-3xl"
          style={typed(name, NAME_DELAY)}>
          {name}
        </h1>
        <p
          className="type-on type-on-caret self-end text-xs leading-none! whitespace-nowrap transition-colors sm:text-xl"
          style={typed(slogan, sloganDelay)}>
          {slogan}
        </p>
      </div>
    </Component>
  );
}
