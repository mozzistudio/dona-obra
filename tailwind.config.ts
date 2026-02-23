import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        coral: {
          DEFAULT: '#E8614D',
          dark: '#D14E3B',
        },
        sand: '#FFF5EB',
        cream: '#FFFBF5',
        warm: '#F9F3ED',
        jungle: {
          DEFAULT: '#2D5F4A',
          dark: '#1E4434',
        },
        charcoal: '#2B2B2B',
        muted: '#7A7068',
        // Keep legacy for backward compat
        primary: { 500: '#E8614D', 600: '#D14E3B' },
        secondary: { 500: '#2D5F4A', 600: '#1E4434' },
      },
    },
  },
  plugins: [],
};

export default config;
