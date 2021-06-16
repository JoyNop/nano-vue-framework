/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:06:47
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 09:25:26
 * @Description: file content
 * @FilePath: /vue3-ts/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { App } from 'vue'
import { errorRoutes, notFound } from './modules/error'
import common from '@/router/common'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },

  {
    path: '/',
    name: 'Layout',
    // redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: {
      title: '首页'
    },
    children: [...common]
  },
  errorRoutes,
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

// export default router

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  // createRouterGuards(router)
}
export default router
