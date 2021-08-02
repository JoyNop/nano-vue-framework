/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:20:08
 * @Description: file content
 * @FilePath: /blast-1/src/store/modules/index.ts
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

export default {
  user,
  design
}
