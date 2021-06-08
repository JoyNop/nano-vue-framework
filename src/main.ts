/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:06:47
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 15:27:50
 * @Description: file content
 * @FilePath: /vue3-ts/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import { setupAxios } from '@/plugins/axios'
import router, { setupRouter } from './router'

const app = createApp(App)

setupAxios(app)
setupRouter(app)
// app.use(store).use(router).use(VueAxios, axios).mount('#app')
// app.use(store).use(router).mount('#app')

router.isReady().then(() => app.mount('#app'))
