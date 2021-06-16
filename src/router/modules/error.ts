/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-09 09:17:29
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 09:24:48
 * @Description: file content
 * @FilePath: /vue3-ts/src/router/modules/error.ts
 */
import { RouterTransition } from '@/components/transition'

const routeName = 'error'

export const notFound = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/error/404',
  component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
}

export const errorRoutes = {
  path: '/error',
  name: routeName,
  redirect: '/error/404',
  component: RouterTransition,
  meta: {
    title: '错误页',
    icon: 'EditOutlined',
    hidden: true
  },
  children: [
    {
      path: '404',
      name: `${routeName}-404`,
      meta: {
        title: '404',
        icon: 'UserOutlined'
      },
      component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
    }
  ]
}
