/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 17:43:14
 * @Description: file content
 * @FilePath: /blast-web/src/router/common.ts
 */
import dashboard from '@/router/modules/dashboard'
import redirect from '@/router/modules/redirect'
// import demos from '@/router/modules/demos'
// import externaLink from '@/router/modules/externa-link'
// import system from '@/router/modules/biz/system'

export default [...dashboard, ...redirect]
