/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-15 09:31:19
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 16:11:26
 * @Description: file content
 * @FilePath: /blast-web/src/router/modules/shared.ts
 */
import { RouteRecordRaw } from 'vue-router'

/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/shared/login/index.vue')
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import(/* webpackChunkName: "icons" */ '@/views/shared/icons/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "icons" */ '@/views/shared/test/index.vue')
  }
]

export default routes
