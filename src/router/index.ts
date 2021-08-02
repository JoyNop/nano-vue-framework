/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 10:58:51
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 14:35:53
 * @Description: file content
 * @FilePath: /blast-1/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { App } from 'vue'
import { createRouterGuards } from './router-guards'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
