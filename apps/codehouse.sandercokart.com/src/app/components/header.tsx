import Link from "next/link";
import {ThemeToggle} from "./theme-toggle";

export function Header() {
  return (
    <header className="bg-primary flex h-16 text-primary-foreground transition-colors">
      <div className="container h-full justify-between grow items-center flex">
        <Link href="/">
          <h1 className="flex flex-col w-min whitespace-nowrap font-digital group">
            <span className="block transition-colors !leading-none text-base  sm:text-3xl group-hover:text-accent">Sander's CodeHouse</span>
            <span className="self-end text-xl">Let's code...</span>
          </h1>
        </Link>



        <ThemeToggle/>
      </div>
    </header>
  );
}