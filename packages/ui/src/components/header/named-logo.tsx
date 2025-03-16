interface NamedLogoProps {
  name: string;
  slogan: string;
}

export function NamedLogo({ name, slogan }: NamedLogoProps) {
  return (
    <h1 className="!font-digital group flex w-min flex-col whitespace-nowrap">
      <span className="group-hover:text-accent text-base !leading-none transition-colors sm:text-3xl">{name}</span>
      <span className="self-end text-xs !leading-none transition-colors sm:text-xl">{slogan}</span>
    </h1>
  );
}
