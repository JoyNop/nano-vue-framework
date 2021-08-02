/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 16:57:22
 * @Description: file content
 * @FilePath: /blast-web/src/store/modules/index.ts
 */
//
// /********************************自动导包 start********************************/
// const file = require.context('./', true, /index.ts$/);
// const modules = {};
// file.keys().forEach((key) => {
//     const name = key.replace(/(.\/)*([^/]+).*/ig,"$2")
//     modules[name] = file(key).default
// });
// /********************************自动导包 end********************************/
//
// export default modules
import user from './user'
import design from './design'
import asyncRoute from './async-route'

export default {
  user,
  design,
  asyncRoute
}
