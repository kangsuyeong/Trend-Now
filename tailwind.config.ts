import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#157EFF',
        negative: '#FF4227',
        gray: {
          100: '#F7F9FB',
          200: '#E4E8ED',
          300: '#D3D8DE',
          400: '#C0C4C9',
          500: '#9C9FA2',
          600: '#E4E8ED',
          700: '#F7F9FB',
          800: '#222323',
        },
        brand: {
          500: '#157EFF',
        },
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
        md: [
          '0.938rem',
          {
            lineHeight: '1.406rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.313rem',
          },
        ],
        xs: [
          '0.813rem',
          {
            lineHeight: '1.219rem',
          },
        ],
        '2xs': [
          '0.75rem',
          {
            lineHeight: '1.125rem',
          },
        ],
        '3xs': [
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
