import preset from '@repo/ui/tailwind.config';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [preset],
  plugins: [typography, containerQueries],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist'],
        mono: ['GeistMono'],
      },
    },
  },
};
