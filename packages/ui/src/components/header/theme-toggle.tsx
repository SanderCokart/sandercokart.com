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
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Prevents flash of unstyled content
  if (!mounted) {
    return (
      <div className="grid h-full place-items-center overflow-hidden">
        <button type="button" className="size-8" disabled aria-label="Toggle color theme">
          <MoonIcon className="hidden size-8 dark:block" aria-hidden="true" focusable="false" />
          <SunIcon className="block size-8 dark:hidden" aria-hidden="true" focusable="false" />
        </button>
      </div>
    );
  }

  return (
    <div className="grid h-full place-items-center overflow-hidden">
      <button
        type="button"
        onClick={toggleTheme}
        className="focus-visible:text-accent hover:text-accent transition-colors"
        suppressHydrationWarning
        role="switch"
        aria-label="Dark mode"
        aria-checked={isDark}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <MotionMoonIcon
              key={`resolved-${resolvedTheme}`}
              variants={moonIconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={iconTransition}
              className="size-8"
              suppressHydrationWarning
              aria-hidden="true"
              focusable="false"
            />
          ) : (
            <MotionSunIcon
              key={`resolved-${resolvedTheme}`}
              variants={sunIconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={iconTransition}
              className="size-8"
              suppressHydrationWarning
              aria-hidden="true"
              focusable="false"
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
