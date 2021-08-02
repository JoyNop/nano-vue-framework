/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-15 09:25:03
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 18:30:53
 * @Description: file content
 * @FilePath: /blast-web/src/router/modules/dashboard.ts
 */
import { RouteRecordRaw } from 'vue-router'
import WelcomeDashboard from '@/views/dashboard/welcome/index.vue'

import About from '@/views/About.vue'

import CreateIndex from '@/views/dashboard/create/index.vue'
import CreateStep1 from '@/views/dashboard/create/CreateSchemeStep1.vue'
import CreateStep2 from '@/views/dashboard/create/CreateSchemeStep2.vue'
import CreateStep3 from '@/views/dashboard/create/CreateSchemeStep3.vue'
import CreateFolder from '@/views/dashboard/create/CreateFolder.vue'

import SpecialDesign from '@/views/special/design/design.vue'
const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    component: About,
    meta: {
      title: '控制台',
      icon: 'icon-yibiaopan',
      layout: true,
      left: true,
      top: true
    }
  },
  {
    path: '/create',
    name: `${routeName}-create`,
    meta: {
      title: '创建',
      icon: 'icon-shouye',
      layout: true,

      left: false,
      top: true
    },
    component: CreateIndex
  },

  {
    path: '/create/scheme/1',
    name: `${routeName}-create-scheme-1`,
    meta: {
      title: '创建方案',
      icon: 'icon-shouye',
      layout: true,

      left: false,
      top: true
    },
    component: CreateStep1
  },
  {
    path: '/create/scheme/2',
    name: `${routeName}-create-scheme-2`,
    meta: {
      title: '创建方案',
      icon: 'icon-shouye',
      layout: true,

      left: false,
      top: true
    },
    component: CreateStep2
  },
  {
    path: '/create/scheme/3',
    name: `${routeName}-create-scheme-3`,
    meta: {
      title: '创建方案',
      icon: 'icon-shouye',
      layout: true,

      left: false,
      top: true
    },
    component: CreateStep3
  },
  {
    path: '/create/folder',
    name: `${routeName}-create-folder`,
    meta: {
      title: '创建文件夹',
      icon: 'icon-shouye',
      layout: true,
      left: false,
      top: true
    },
    component: CreateFolder
  },
  {
    path: '/design/pid/:pid/plan/:planId',
    name: `${routeName}-design`,
    meta: {
      title: '炮孔设计',
      icon: 'icon-paokogsheji',
      layout: true,

      top: true,
      left: true
    },
    props: true,
    component: SpecialDesign
  }
]

export default routes
