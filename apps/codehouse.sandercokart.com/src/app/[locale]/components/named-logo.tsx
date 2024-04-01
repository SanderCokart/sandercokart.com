import Link from 'next/link';

export function NamedLogo() {
  return (
    <Link href="/apps/codehouse.sandercokart.com/public">
      <h1 className="group flex w-min flex-col whitespace-nowrap font-digital">
        <span className="text-base !leading-none transition-colors  group-hover:text-accent sm:text-3xl">
          Sander's CodeHouse
        </span>
        <span className="self-end text-xs !leading-none  transition-colors sm:text-xl">Let's code...</span>
      </h1>
    </Link>
  );
}
