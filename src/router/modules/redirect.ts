import { RouteRecordRaw } from 'vue-router'
// import { RouterTransition } from '@/components/transition'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect/:path*',
    name: 'Redirect',
    component: () => import('@/views/shared/redirect/index.vue'),
    meta: {
      title: '重定向',
      icon: 'SettingOutlined',
      hidden: true
    }
  }
]

export default routes
