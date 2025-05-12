import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#157EFF',
        positive: '#246DFF',
        negative: '#FF4227',
        warning: '#F0D36A',
        success: '#6BD876',
        information: '#61B1EA',
        white: '#FFFFFF',
        gray: {
          100: '#F7F9FB',
          200: '#E4E8ED',
          300: '#D3D8DE',
          400: '#C0C4C9',
          500: '#9C9FA2',
          600: '#696A6D',
          700: '#3F4042',
          800: '#222323',
        },
        brand: {
          100: '#F4F9FF',
          500: '#157EFF',
          700: '#0F4382',
        },
        point: {
          500: '#117D10',
        },
        blackOpacity: {
          600: '#000000/[60%]',
          500: '#000000/[48%]',
          400: '#000000/[28%]',
          300: '#000000/[16%]',
          200: '#000000/[8%]',
          100: '#000000/[4%]',
        },
        whiteOpacity: {
          600: '#FFFFFF/[60%]',
          500: '#FFFFFF/[48%]',
          400: '#FFFFFF/[28%]',
          300: '#FFFFFF/[16%]',
          200: '#FFFFFF/[8%]',
          100: '#FFFFFF/[4%]',
        },
        hover: {
          primary: '#0F58B2',
          black: '#343535',
          gray: '#CFD1D3',
          error: '#B8301C',
        },
        active: {
          primary: '#0B4285',
          black: '#454646',
          gray: '#B2B3B5',
          error: '#852214',
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
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        himpun: ['var(--font-himpun)'],
      },
      padding: {
        screenXPadding: '17.5%',
      },
    },
  },
  plugins: [],
} satisfies Config;
