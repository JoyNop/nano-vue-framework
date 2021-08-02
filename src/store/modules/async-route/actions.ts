/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-27 15:27:58
 * @Description: file content
 * @FilePath: /blast-browser/src/store/modules/async-route/actions.ts
 */
import { generatorDynamicRouter } from '@/router/generator-routers'

export const actions = {
  async generateRoutes({ commit }) {
    // 动态获取菜单
    const routers = await generatorDynamicRouter()

    commit('setRouters', routers)
    return routers
  }
}
