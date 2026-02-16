/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Quadrant colors - Light mode
        q1: {
          bg: '#FEF2F2',
          border: '#FECACA',
          text: '#DC2626',
        },
        q2: {
          bg: '#FFFBEB',
          border: '#FDE68A',
          text: '#D97706',
        },
        q3: {
          bg: '#EFF6FF',
          border: '#BFDBFE',
          text: '#2563EB',
        },
        q4: {
          bg: '#F9FAFB',
          border: '#E5E7EB',
          text: '#4B5563',
        },
        // Quadrant colors - Dark mode
        'q1-dark': {
          bg: '#450a0a',
          border: '#7f1d1d',
          text: '#fca5a5',
        },
        'q2-dark': {
          bg: '#451a03',
          border: '#78350f',
          text: '#fcd34d',
        },
        'q3-dark': {
          bg: '#172554',
          border: '#1e40af',
          text: '#93c5fd',
        },
        'q4-dark': {
          bg: '#111827',
          border: '#374151',
          text: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
}
