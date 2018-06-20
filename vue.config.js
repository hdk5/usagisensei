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

  lintOnSave: undefined
}
