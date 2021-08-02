/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 11:05:25
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:09:09
 * @Description: file content
 * @FilePath: /blast-1/src/plugins/ant-design-vue.ts
 */
import type { App } from 'vue'
import Antd from 'ant-design-vue'
import '../antd-variables.less'
export function setupAntd(app: App<Element>) {
  // app.component('AButton', AButton)

  app.use(Antd)
}
