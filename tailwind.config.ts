import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontSize: {
        '4xl': [
          '2.5rem',
          {
            lineHeight: '3.25rem',
          },
        ],
        '3xl': [
          '2rem',
          {
            lineHeight: '2.6rem',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '1.85rem',
          },
        ],
        '1xl': [
          '1.25rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        lg: [
          '1.125rem',
          {
            lineHeight: '1.688rem',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.313rem',
          },
        ],
        s: [
          '0.813rem',
          {
            lineHeight: '1.219rem',
          },
        ],
        xs: [
          '0.75rem',
          {
            lineHeight: '1.125rem',
          },
        ],
        xxs: [
          '0.625rem',
          {
            lineHeight: '0.938rem',
          },
        ],
      },
      fontWeight: {
        light: '400',
        regular: '500',
        semiBold: '600',
        bold: '700',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
