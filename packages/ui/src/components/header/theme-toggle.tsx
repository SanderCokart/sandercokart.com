'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';

import { useEffect, useState } from 'react';

const MotionMoonIcon = motion.create(MoonIcon);
const MotionSunIcon = motion.create(SunIcon);

const moonIconVariants = {
  initial: { rotate: -360, filter: 'blur(2px)' },
  animate: { rotate: 0, filter: 'blur(0px)' },
  exit: { rotate: 360, filter: 'blur(2px)' },
};

const sunIconVariants = {
  initial: { rotate: 360, filter: 'blur(2px)' },
  animate: { rotate: 0, filter: 'blur(0px)' },
  exit: { rotate: -360, filter: 'blur(2px)' },
};

const iconTransition = { duration: 0.3 };

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevents flash of unstyled content
  if (!mounted) {
    return (
      <div className="grid h-full place-items-center overflow-hidden">
        <button className="size-8" disabled>
          <span className="sr-only dark:hidden"> Switch to light mode</span>
          <span className="sr-only hidden dark:inline"> Switch to dark mode</span>
          <MoonIcon className="hidden size-8 dark:block" />
          <SunIcon className="block size-8 dark:hidden" />
        </button>
      </div>
    );
  }

  return (
    <div className="grid h-full place-items-center overflow-hidden">
      <button
        onClick={toggleTheme}
        suppressHydrationWarning
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
        <span suppressHydrationWarning className="sr-only">
          {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <MotionMoonIcon
              key={`theme-${theme}`}
              variants={moonIconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={iconTransition}
              className="size-8"
              suppressHydrationWarning
            />
          ) : (
            <MotionSunIcon
              key={`theme-${theme}`}
              variants={sunIconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={iconTransition}
              className="size-8"
              suppressHydrationWarning
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
