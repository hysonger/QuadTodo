/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Quadrant colors
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
      },
    },
  },
  plugins: [],
}
