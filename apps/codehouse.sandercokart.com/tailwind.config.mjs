import typography from "@tailwindcss/typography";

const tailwindPlugins = [typography];

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "class",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
                digital: ["var(--font-digital)"],
            },
            borderRadius: {
                DEFAULT: "var(--radius)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground))",

                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",

                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",

                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground))",

                accent: "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground))",

                destructive: "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground))",

                react: "hsl(193 95% 68%)",
                laravel: "hsl(3 100% 56%)",
                vue: "hsl(153 47% 49%)",
            },
        },
    },
    plugins: tailwindPlugins,
};
