'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useEffect, useState } from 'react';

export const ascensionAnimation = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: {
    hidden: { opacity: 0, y: 100, transition: { duration: 0.25, y: { duration: 0.5 } } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, y: { duration: 0.5 } } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.25, y: { duration: 0.5 } } },
  },
};

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-6 w-6" />;

  return (
    <div className={'relative grid h-full place-items-center overflow-hidden text-2xl'}>
      <AnimatePresence mode="wait">
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <motion.div key="light" {...ascensionAnimation}>
            <FaSun className="h-6 w-6 cursor-pointer" onClick={() => setTheme('light')} />
          </motion.div>
        )}

        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <motion.div key="dark" {...ascensionAnimation}>
            <FaMoon className="h-6 w-6 cursor-pointer" onClick={() => setTheme('dark')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
