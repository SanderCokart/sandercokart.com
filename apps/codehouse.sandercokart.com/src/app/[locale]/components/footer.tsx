import { getTranslations } from 'next-intl/server';
import { FaEnvelope, FaGithub, FaInstagram, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';

import Link from 'next/link';

import { CopyToClipboardTooltip as Copy } from '@/app/[locale]/components/copy-to-clipboard-tooltip';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer
      className="fond-bold flex flex-col justify-center bg-primary p-8 font-mono text-primary-foreground transition-colors"
      id="footer">
      <div className="flex justify-center gap-16">
        <Address />
        <div className="hidden shrink border border-primary-foreground sm:block" />
        <Links className="hidden sm:flex" />
      </div>
      <Copyright />
      <Socials />
    </footer>
  );
}

function Socials() {
  return (
    <section className="mx-auto flex gap-8" id="footer-socials">
      <Link
        aria-label="Sander's Github"
        className="text-4xl transition-colors hover:text-accent"
        href="https://github.com/sandercokart">
        <FaGithub />
      </Link>
      <Link
        aria-label="Sander's Instagram"
        className="text-4xl transition-colors hover:text-accent"
        href="https://www.instagram.com/sandercokart/">
        <FaInstagram />
      </Link>
      <Link
        aria-label="Sander's Youtube"
        className="text-4xl transition-colors hover:text-accent"
        href="https://youtube.com/SanderCokart">
        <FaYoutube />
      </Link>
      <Link
        aria-label="Sander's Twitter"
        className="text-4xl transition-colors hover:text-accent"
        href="https://twitter.com/sandercokart">
        <FaTwitter />
      </Link>
    </section>
  );
}

async function Links({ className }: { className?: string }) {
  const t = await getTranslations('nav');

  return (
    <nav
      aria-label="footer navigation"
      className={cn('flex-col gap-2 font-digital text-2xl', className)}
      id="footer-navigation"
      role="navigation">
      <Link className="transition-colors hover:text-accent" href="/#portfolio">
        {t('portfolio')}
      </Link>
      <Link className="transition-colors hover:text-accent" href="/#techstack">
        {t('tech-stack')}
      </Link>
      <Link className="transition-colors hover:text-accent" href="/#testimonials">
        {t('testimonials')}
      </Link>
      <Link className="transition-colors hover:text-accent" href="/#contact">
        {t('contact')}
      </Link>
    </nav>
  );
}

async function Address() {
  const t = await getTranslations();

  return (
    <section id="footer-address">
      <address className="space-y-2">
        <div className="flex items-center gap-4">
          <FaEnvelope />
          <Link
            className="text-xs transition-colors hover:text-accent sm:text-base"
            href="mailto:sandercokart.business@gmail.com">
            sandercokart.business@gmail.com
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <FaPhone />
          <Link className="text-xs transition-colors hover:text-accent sm:text-base" href="tel:+31630137594">
            +31630137594
          </Link>
        </div>

        <div className="flex flex-col justify-evenly md:justify-between">
          <span className="text-xs sm:text-base">
            {t('footer.KvK')}: <Copy>89270738</Copy>
          </span>
          <span className="text-xs sm:text-base">
            {t('footer.BTW')}: <Copy>NL004710701B39</Copy>
          </span>
        </div>
      </address>
    </section>
  );
}

async function Copyright() {
  const t = await getTranslations('footer');
  const date = new Date().getFullYear();

  return (
    <section className="mx-auto my-8" id="footer-copyright">
      <p className="text-center text-xs">{t('copyright', { date })}</p>
    </section>
  );
}
