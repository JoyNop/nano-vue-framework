/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 10:05:24
 * @Description: file content
 * @FilePath: /vue3-ts/src/store/types.ts
 */
import { IAsyncRouteState } from '@/store/modules/async-route'
// import { IUserState } from '@/store/modules/user/state'
import { ILockscreenState } from '@/store/modules/lockscreen'
import { ITabsViewState } from '@/store/modules/tabs-view'

export interface IStore {
  asyncRoute: IAsyncRouteState
  // user: IUserState
  lockscreen: ILockscreenState
  tabsView: ITabsViewState
}
