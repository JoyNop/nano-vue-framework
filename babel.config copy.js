/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 11:00:27
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:01:38
 * @Description: file content
 * @FilePath: /blast-1/babel.config copy.js
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
