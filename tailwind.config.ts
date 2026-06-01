import type { Config } from 'tailwindcss'
import rtl from 'tailwindcss-rtl'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0f1e',
          surface: '#0d1526',
          card: '#111d35',
        },
        accent: {
          cyan: '#00c8ff',
          blue: '#3b82f6',
        },
        text: {
          primary: '#f0f4ff',
          secondary: '#8b9cc0',
          muted: '#4a5880',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        bounceChevron: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        bounceChevron: 'bounceChevron 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [rtl],
} satisfies Config
