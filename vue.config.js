module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'iview-loader',
              options: {
                prefix: false
              }
            }
          ]
        }
      ]
    }
  },

  lintOnSave: undefined,
  baseUrl: '',
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}
