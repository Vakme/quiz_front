// vue.config.js
const { WebpackWarPlugin } = require('webpack-war-plugin');

module.exports = {
  devServer: {
    port: 8081
  },
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    plugins: [
      new WebpackWarPlugin()
    ]
  }
}
