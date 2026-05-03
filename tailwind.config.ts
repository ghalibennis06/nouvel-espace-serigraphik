import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── New design system ──────────────────────────────────────
        ink: {
          DEFAULT: '#0C0A08',
          2: '#1A1612',
          3: '#2E2820',
        },
        cream: {
          DEFAULT: '#F5EDD8',
          2: '#EFE5C8',
          3: '#B8AA94',
        },
        gold: {
          DEFAULT: '#C8891F',
          light: '#E8A830',
          dark: '#9B6A10',
        },
        teal: {
          DEFAULT: '#0B6B5E',
          light: '#0F9080',
        },
        // ── Legacy (inner pages) ────────────────────────────────────
        navy: {
          950: '#04070F',
          900: '#0A0F1E',
          800: '#111827',
          700: '#1F2937',
          600: '#374151',
        },
        brand: {
          red:     '#DC2626',
          redDark: '#B91C1C',
          amber:   '#F59E0B',
          green:   '#059669',
          teal:    '#0F9080',
        },
        // ── FileTree component ──────────────────────────────────────
        'file-tree-bg':    '#0F0F18',
        'file-tree-hover': 'rgba(255,255,255,0.05)',
        'folder-icon':     '#4B7BEC',
      },
      fontFamily: {
        sans:    ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
      },
      boxShadow: {
        card:         '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.12)',
        nav:          '0 2px 8px rgba(0,0,0,0.08)',
        gold:         '0 8px 32px rgba(200,137,31,0.35)',
        wa:           '0 4px 22px rgba(37,211,102,0.35)',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in':        'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
