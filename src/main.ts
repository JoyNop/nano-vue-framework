/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:06:47
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 17:19:52
 * @Description: file content
 * @FilePath: /vue3-ts/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from '@/store'
import { setupAxios } from '@/plugins'

const app = createApp(App)
// setupAntd(app)
setupAxios(app)
// 挂载vuex状态管理
setupStore(app)
// 挂载路由

setupRouter(app)
// app.use(store).use(router).use(VueAxios, axios).mount('#app')
// app.use(store).use(router).mount('#app')
// 路由准备就绪后挂载APP实例

router.isReady().then(() => app.mount('#app'))
