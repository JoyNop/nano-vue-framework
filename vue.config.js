// 去除console
const UglifyJsPlugin = require('terser-webpack-plugin')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir) // 路径

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development'].includes(process.env.NODE_ENV)

module.exports = {
  // publicPath: isDev ? '' : querystring.unescape('<%=request.getContextPath()%>'),
  publicPath: process.env.BASE_URL,

  // filenameHashing: false,
  productionSourceMap: false,

  css: {
    requireModuleExtension: true, // 是否开启CSSmodule并保留xxx.module.css后缀
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      sass: {
        additionalData: `
        @use 'sass:math';
        @import "@/styles/global.scss";`
      }
    }
  },

  chainWebpack: (config) => {
    // 移除 preload 插件
    // config.plugins.delete('preload')
    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, (config) => config.devtool('cheap-source-map'))

    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set('@', resolve('src'))
    // 打包分析
    if (IS_PROD) {
      config.optimization.delete('splitChunks')
    }
    config.plugin('html').tap((args) => {
      args[0].title = 'admin-title'
      return args
    })

    // svg rule loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  configureWebpack: (config) => {
    if (IS_PROD) {
      config.plugins.push(
        new UglifyJsPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_debugger: true, // 注释console
              drop_console: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          extractComments: false, // 是否将注释提取到一个单独的文件中
          sourceMap: false,
          parallel: true
        })
      )
    }
  },

  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        // target: 'http://localhost:8888',
        changeOrigin: true,
        // logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  pluginOptions: {
    moment: {
      locales: ['zh-cn']
    }
  }
}
