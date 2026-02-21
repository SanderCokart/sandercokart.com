import type { ReactNode } from 'react';

interface NamedLogoProps {
  name: string;
  slogan: string;
  href: string;
  Component?: React.ElementType;
}

export function NamedLogo({ name, slogan, href = '/', Component = 'a' }: NamedLogoProps) {
  return (
    <Component href={href} className="group">
      <h1 className="!font-digital flex w-min flex-col whitespace-nowrap">
        <span className="group-hover:text-accent group-focus:text-accent text-base !leading-none transition-colors sm:text-3xl">
          {name}
        </span>
        <span className="self-end text-xs !leading-none transition-colors sm:text-xl">{slogan}</span>
      </h1>
    </Component>
  );
}
