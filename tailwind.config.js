/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4B5563', // Custom gray
          DEFAULT: '#1F2937', // Main color
          dark: '#111827', // Darker shade
        },
        accent: {
          light: '#93C5FD', // Light blue
          DEFAULT: '#3B82F6', // Blue
          dark: '#1D4ED8', // Dark blue
        },
        background: {
          light: '#F3F4F6',
          DEFAULT: '#1F2937',
          dark: '#111827',
        },
        text: {
          light: '#F9FAFB',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
        }
      },
    },
  },
  plugins: [],
} 