/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#77B6FF',
          dark: '#4A90E2',
        },
        ink: {
          light: '#2C2C3A',
          dark: '#E8E8F0',
        },
        canvas: {
          light: '#F7F8FA',
          card: '#FFFFFF',
          dark: '#1A1A2E',
          'dark-card': '#23233B',
          'dark-border': '#2F2F4A',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"PT Mono"', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
        'slide-in': 'slide-in 0.3s ease forwards',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            a: { color: '#4A90E2', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
