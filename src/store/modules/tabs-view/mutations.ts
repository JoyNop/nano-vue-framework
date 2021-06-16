/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 18:17:21
 * @Description: file content
 * @FilePath: /vue3-ts/src/store/modules/tabs-view/mutations.ts
 */
import { TABS_ROUTES } from '@/store/mutation-types'
import { ITabsViewState } from './state'

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login']

export const mutations = {
  initTabs(state: ITabsViewState, routes: any) {
    // 初始化标签页
    state.tabsList = routes
  },
  addTabs(state: ITabsViewState, route: any): boolean {
    // 添加标签页
    if (whiteList.includes(route.name)) return false
    const isExists = state.tabsList.some((item) => item.fullPath == route.fullPath)
    if (!isExists) {
      state.tabsList.push(route)
    }
    return true
  },
  closeLeftTabs(state: ITabsViewState, route: any) {
    // 关闭左侧
    const index = state.tabsList.findIndex((item) => item.fullPath == route.fullPath)
    state.tabsList.splice(0, index)
  },
  closeRightTabs(state: ITabsViewState, route: any) {
    // 关闭右侧
    const index = state.tabsList.findIndex((item) => item.fullPath == route.fullPath)
    state.tabsList.splice(index + 1)
  },
  closeOtherTabs(state: ITabsViewState, route: any) {
    // 关闭其他
    state.tabsList = state.tabsList.filter((item) => item.fullPath == route.fullPath)
  },
  closeCurrentTab(state: ITabsViewState, route: any) {
    // 关闭当前页
    const index = state.tabsList.findIndex((item) => item.fullPath == route.fullPath)
    state.tabsList.splice(index, 1)
  },
  closeAllTabs(state: ITabsViewState) {
    // 关闭全部
    state.tabsList = []
    localStorage.removeItem(TABS_ROUTES)
  }
}
