import codeHouse from '@repo/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [codeHouse],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        digital: ['var(--font-digital)'],
      },
    },
  },
};
