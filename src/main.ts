/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 10:58:51
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:11:42
 * @Description: file content
 * @FilePath: /blast-1/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupAntd } from './plugins/ant-design-vue'
const app = createApp(App)

setupAntd(app)

app.use(store).use(router).mount('#app')
