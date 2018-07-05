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
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    }
  },
  outputDir: 'docs'
}
