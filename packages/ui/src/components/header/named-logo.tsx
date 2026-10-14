import type { ElementType, ReactNode } from 'react';

interface NamedLogoProps {
  name: string;
  slogan: string;
  href: string;
  logo: ReactNode;
  Component?: ElementType;
}

export function NamedLogo({ name, slogan, href = '/', logo, Component = 'a' }: NamedLogoProps) {
  return (
    <Component href={href} className="group shrink-0">
      <div className="font-digital! grid grid-cols-[auto_auto] items-stretch gap-x-2 sm:gap-x-3">
        <span className="relative row-span-2 aspect-square h-full min-h-0 p-1">
          <span className="relative block size-full drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]">{logo}</span>
        </span>
        <h1 className="group-hover:text-accent group-focus:text-accent text-base leading-none! whitespace-nowrap transition-colors sm:text-3xl">
          {name}
        </h1>
        <p className="self-end text-xs leading-none! whitespace-nowrap transition-colors sm:text-xl">{slogan}</p>
      </div>
    </Component>
  );
}
