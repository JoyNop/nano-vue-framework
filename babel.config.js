/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:06:47
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 17:15:09
 * @Description: file content
 * @FilePath: /vue3-ts/babel.config.js
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    'lodash',
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      },
      'ant-design-vue'
    ]
  ]
}
