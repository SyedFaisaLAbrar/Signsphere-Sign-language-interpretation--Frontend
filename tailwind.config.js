/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF', // Purple color theme
        secondary: '#f4f4f4', // Light background
        dark: '#232323', // Dark text
      },
      animation: {
        'wave-beam': 'waveBeam 6s linear infinite',
        'scroll': 'scroll 20s linear infinite',    // Infinite scrolling effect
        'pulse': "pulse 1s linear infinite",
      },
      keyframes: {
        waveBeam: {
          '0%': { backgroundPosition: '100% 0' }, // Start from the right
          '100%': { backgroundPosition: '-100% 0' }, // Move to the left
        },
        lightBeam: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulse: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
    },
  }
  },
  plugins: [require('@tailwindcss/forms')],
};

