/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:09:20
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 17:15:02
 * @Description: file content
 * @FilePath: /vue3-ts/vue.config.js
 */
module.exports = {
  pluginOptions: {
    antd: {
      importType: 'modularized', //importType?: 'full' | 'modularized';
      style: true
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}
