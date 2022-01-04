module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-pxtorem": {
      unitPrecision: 8,
      propList: ["font", "font-size", "line-height"],
    },
    "postcss-preset-env": {
      stage: 3,
      autoprefixer: {
        flexbox: "no-2009",
        grid: "no-autoplace",
      },
    },
  },
  options: {},
};
