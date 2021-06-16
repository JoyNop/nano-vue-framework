/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 10:00:39
 * @Description: file content
 * @FilePath: /vue3-ts/src/store/modules/async-route/mutations.ts
 */
import { RouteRecordRaw } from 'vue-router'
import { IAsyncRouteState } from './state'

export const mutations = {
  setRouters: (state: IAsyncRouteState, routers: any): void => {
    // 设置动态路由
    state.menus = routers
  },
  setKeepAliveComponents: (state: IAsyncRouteState, compNames: any): void => {
    // 设置需要缓存的组件
    state.keepAliveComponents = compNames
  }
}
