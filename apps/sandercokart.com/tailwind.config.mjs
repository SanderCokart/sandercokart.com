import preset from '@repo/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}"],
    presets: [preset],
    theme:{
        extend: {
            screens: {
                '3xl': '2176px',
                '4xl': '3056px',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
                digital: ["var(--font-digital)"],
            },
            colors:{
                react: "hsl(193 95% 68%)",
                laravel: "hsl(3 100% 56%)",
                vue: "hsl(153 47% 49%)",
            }
        }
    }
};
