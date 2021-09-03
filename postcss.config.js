module.exports = {
  plugins: [

    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    }),

    require('autoprefixer')({
      grid: true
    }),

  ],
};

// postcss dist/uncss.css > ../css/combined.css
