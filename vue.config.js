const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false
    },
    proxy: {
      '/user': {
        target: 'http://222.20.126.128:8087/',
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
      },
      '/admin': {
        target: 'http://222.20.126.128:8087/',
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
      },
      '/Crypto': {
        target: 'http://222.20.126.128:8087/',
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
      },
    },
  },
  lintOnSave: false
})
