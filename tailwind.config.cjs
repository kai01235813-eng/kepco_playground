/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif']
      },
      colors: {
        kepco: {
          navy: '#001b3d',
          navyDeep: '#000921',
          blue: '#1d4ed8',
          cyan: '#22d3ee',
          sky: '#38bdf8'
        }
      }
    }
  },
  plugins: []
};


