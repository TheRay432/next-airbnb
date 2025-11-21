import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#020817',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#020817',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#020817',
        },
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#f8fafc',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f8fafc',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#2563eb',
        chart: {
          '1': '#e76e50',
          '2': '#2a9d90',
          '3': '#274754',
          '4': '#e8c468',
          '5': '#f4a462',
        },
        moreBtn: '#222222',
        footer: '#F7F7F7',
        lightgray: '#DDDDDD',
        hovergray: '#EBEBEB',
        lightPrimary: '#FF385C',
        darkPrimary: '#DE1362',
        darkgray: '#6A6A6A',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      flexBasis: {
        '7/100': '7%',
      },
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in-right': 'slideInFromRight 0.5s ease-out forwards',
      },
    },
    screens: {
      xs: '30rem', // 480px
      sm: '40rem', // 640px
      md: '48rem', // 768px
      lg: '64rem', // 1024px
      xl: '80rem', // 1280px
      '2xl': '96rem', // 1536px
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none',
        },
      });
    },
    require('tailwindcss-animate'),
  ],
};
export default config;
