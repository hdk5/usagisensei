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
          loaders: ['vue-style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  },
  outputDir: 'docs'
}
