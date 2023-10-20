/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
    'light': '#ffffff',
    'dark': '#303030',
    'accent': '#16e0bd',
    'primary': '#007bff',
    'secondary': '#6c757d',
    'success': '#28a745',
    'info': '#17a2b8',
    'warning': '#ffc107',
    'danger': '#dc3545',
    'blue': '#007bff',
    'indigo': '#6610f2',
    'purple': '#6f42c1',
    'pink': '#e83e8c',
    'red': '#dc3545',
    'orange': '#fd7e14',
    'yellow': '#ffc107',
    'green': '#28a745',
    'teal': '#20c997',
    'cyan': '#17a2b8',
    'white': '#fff',
    'gray': '#6c757d',
    'gray-dark': '#343a40',
    
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: []
}

