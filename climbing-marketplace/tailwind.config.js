/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm stone grays (replacing default grays)
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Warm amber (main brand color)
        amber: {
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
        // Earthy moss green (success/nature)
        moss: {
          50: '#f7f8f3',
          100: '#eef1e6',
          200: '#dce3ce',
          300: '#c4d0ad',
          400: '#a8b888',
          500: '#8fa069',
          600: '#728151',
          700: '#596642',
          800: '#485238',
          900: '#3d4530',
        },
        // Terracotta/clay (warnings/errors)
        terra: {
          50: '#fdf4f3',
          100: '#fbe7e6',
          200: '#f7d4d2',
          300: '#f1b5b1',
          400: '#e78e88',
          500: '#d86660',
          600: '#c24943',
          700: '#a33934',
          800: '#87312e',
          900: '#712e2c',
        },
      },
      boxShadow: {
        // Custom warm shadows
        'warm': '0 4px 6px -1px rgba(180, 83, 9, 0.1), 0 2px 4px -1px rgba(180, 83, 9, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(180, 83, 9, 0.1), 0 4px 6px -2px rgba(180, 83, 9, 0.05)',
        'warm-xl': '0 20px 25px -5px rgba(180, 83, 9, 0.1), 0 10px 10px -5px rgba(180, 83, 9, 0.04)',
      },
      backgroundImage: {
        // Custom gradients
        'gradient-earthy': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #f59e0b 50%, #d97706 75%, #92400e 100%)',
        'gradient-stone': 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%)',
      },
    },
  },
  plugins: [],
}