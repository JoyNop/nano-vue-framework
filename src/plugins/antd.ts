/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-08 17:04:26
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 17:05:26
 * @Description: file content
 * @FilePath: /vue3-ts/src/plugins/antd.ts
 */
import type { App } from 'vue'
import Antd from 'ant-design-vue'
// import { AButton } from '@/components/button/index'

import 'ant-design-vue/dist/antd.less'

export function setupAntd(app: App<Element>) {
  // app.component('AButton', AButton)

  app.use(Antd)
}
