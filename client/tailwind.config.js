module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Circular-Book', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'heading': ['Circular-Bold']
    },
    fontSize: {
      'xxs': '.65rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#121212',
      orange: '#F3A74D',
      gray: {
        DEFAULT: '#aaa',
        600: '#666',
        800: '#222'
      },
      lime: {
        100: '#85d7ff',
        DEFAULT: '#f3f1e5',
        500: '#E3E1D2',
        700: '#8F8A6C'
      },
      blue: {
        300: '#5984F8',
        600: '#1946BA'
      }
    },
    borderRadius: {
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.6rem',
      'xl': '30px',
      'full': '9999px'
    },
    extend: {
      animation: {
        fade: 'fadeIn 0.3s ease-in-out',
        fadeFast: 'fadeIn 0.2s ease-in-out',
      },
      fontFamily: {
        'cabin': ['"Cabin"'],
        'circular': ['"Circular"'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))'
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100' },
        },
      }),
      inset: {
       '-4': '-12px',
       '-8': '-24px',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}