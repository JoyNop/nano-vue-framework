/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 10:58:51
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 17:46:18
 * @Description: file content
 * @FilePath: /blast-web/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from '@/store'
import { setupAntd } from './plugins/ant-design-vue'
const app = createApp(App)

setupAntd(app)
// 挂载vuex状态管理
setupStore(app)
// 挂载路由
setupRouter(app)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
