require('colors')

module.exports = {
  lintOnSave: true,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/variables.scss";',
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: () => {
    return {
      devtool: 'source-map',
      name: 'ecwid-vue-test-task',
      plugins: [
        // new CompressionWebpackPlugin({
        //   filename: '[path].gz[query]',
        //   algorithm: 'brotliCompress',
        //   test: /\.(js|css)$/,
        //   compressionOptions: { level: 11 },
        //   threshold: 10240,
        //   minRatio: 0.8,
        //   deleteOriginalAssets: false
        // })
      ],
    }
  },
}
