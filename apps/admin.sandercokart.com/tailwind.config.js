import preset from '@repo/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [preset],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist'],
        mono: ['GeistMono'],
      },
    },
  },
};
