export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,html}"
    ],
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'system-ui', 'sans-serif']
        },
        colors: {
          primary: {
            50: '#eef2ff',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca'
          }
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'scroll': 'scroll 20s linear infinite'
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          },
          scroll: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' }
          }
        }
      }
    },
    plugins: []
  }