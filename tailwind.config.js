module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["'Orbitron'", 'sans-serif'],
      },
      spacing: {
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        '124': '31rem',
        '128': '32rem',
        '192': '48rem',
      },
      screens: {
        '4k': '160rem',
      },
      cursor: {
        none: 'none',
      },
    },
  },
  variants: {},
  plugins: [],
};
