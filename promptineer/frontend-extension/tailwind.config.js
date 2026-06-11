/**
 * Tailwind CSS Configuration for Promptineer Extension
 * 
 * Configuration for:
 * - Dark mode first (extension-friendly)
 * - Modern AI SaaS design tokens
 * - Custom colors and spacing
 * - Font and typography settings
 * - Animation utilities
 */

module.exports = {
  /**
   * Dark mode strategy
   * 'class' allows toggling via class attribute
   * 'media' uses system preference
   */
  darkMode: 'class',

  /**
   * Content files to scan for class names
   */
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,jsx}',
  ],

  /**
   * Theme customization
   */
  theme: {
    extend: {
      /**
       * Custom color palette
       * Inspired by modern AI SaaS applications
       */
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae3ff',
          300: '#7ccbff',
          400: '#36b3ff',
          500: '#0099ff',
          600: '#0072ff',
          700: '#0052cc',
          800: '#003da3',
          900: '#002866',
        },
        // Accent colors for AI/tech feel
        accent: {
          50: '#f5f3ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bfadff',
          400: '#a585ff',
          500: '#8866ff',
          600: '#7644ff',
          700: '#6b2eff',
          800: '#5a1ecf',
          900: '#411099',
        },
        // Neutral colors for light/dark backgrounds
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          150: '#e8eaed',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#18212e',
          900: '#111827',
          950: '#030712',
        },
        // Status colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
      },

      /**
       * Custom spacing scale
       */
      spacing: {
        xs: '0.25rem',  // 4px
        sm: '0.5rem',   // 8px
        md: '1rem',     // 16px
        lg: '1.5rem',   // 24px
        xl: '2rem',     // 32px
        '2xl': '3rem',  // 48px
        '3xl': '4rem',  // 64px
      },

      /**
       * Custom font sizes
       */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      },

      /**
       * Custom border radius
       */
      borderRadius: {
        none: '0',
        xs: '0.25rem',   // 4px
        sm: '0.375rem',  // 6px
        base: '0.5rem',  // 8px
        md: '0.75rem',   // 12px
        lg: '1rem',      // 16px
        xl: '1.25rem',   // 20px
        '2xl': '1.5rem', // 24px
        full: '9999px',
      },

      /**
       * Custom shadows for depth
       */
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.1)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        glow: '0 0 20px rgb(0 153 255 / 0.5)',
        'glow-lg': '0 0 40px rgb(0 153 255 / 0.3)',
      },

      /**
       * Custom animations
       */
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'bounce-gentle': 'bounce-gentle 0.6s ease-in-out',
      },

      /**
       * Custom keyframes for animations
       */
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },

      /**
       * Custom transitions
       */
      transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
      },

      /**
       * Custom font families
       */
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Courier New', 'monospace'],
      },

      /**
       * Custom width/height for extension UI
       */
      width: {
        popup: '400px',
        sidebar: '300px',
      },
      minWidth: {
        popup: '400px',
      },
      maxWidth: {
        popup: '400px',
        sidebar: '300px',
      },
    },
  },

  /**
   * Plugins configuration
   */
  plugins: [
    // Form styling is handled through custom CSS in globals.css
  ],

  /**
   * Safety list for dynamic classes
   */
  safelist: [
    // Responsive classes
    'sm:',
    'md:',
    'lg:',
    // State variants
    'hover:',
    'focus:',
    'active:',
    'disabled:',
    'dark:',
    // Custom patterns
    {
      pattern: /^(bg|text|border|shadow)-(primary|accent|success|warning|danger|info)/,
    },
  ],

  /**
   * Suppress warnings for unused selectors in node_modules
   */
  corePlugins: {
    preflight: true,
  },
};
