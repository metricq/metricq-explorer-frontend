const CopyPlugin = require('copy-webpack-plugin')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'src/configuration.json',
            to: 'configuration.json',
            transform (content, absoluteFrom) {
              const config = JSON.parse(content.toString())
              config.backend = process.env.VUE_APP_METRICQ_WIZARD_BACKEND
              return JSON.stringify(config)
            }
          }
        ]
      })
    ]
  }
})
