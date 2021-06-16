/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-09 10:35:03
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 11:03:53
 * @Description: file content
 * @FilePath: /vue3-ts/src/router/common.ts
 */
import dashboard from '@/router/modules/dashboard'
// import demos from '@/router/modules/demos'
// import externaLink from '@/router/modules/externa-link'
import redirect from '@/router/modules/redirect'

// export default [...dashboard, ...demos, ...externaLink, ...redirect]
export default [...dashboard, ...redirect]
