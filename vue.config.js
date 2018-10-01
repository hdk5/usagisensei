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

  outputDir: 'docs',

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
