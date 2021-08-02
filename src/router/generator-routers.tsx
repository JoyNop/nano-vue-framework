import { adminMenus, planMenus } from '@/api/system/menu'
import router from '@/router/index'
import { routes } from '@/router/index'
import { notFound } from '@/router/modules/error'
import { Empty } from 'ant-design-vue'
import { RouteRecordRaw } from 'vue-router'
import SpecialDesign from '@/views/special/design/design.vue'

/**
 * 异步生成菜单树， 方案二
 * @param dataList
 */
const list2tree = (items, parentId = 0, arr = [], pathPrefix = '') => {
  return items
    .filter((item) => item.parentId == parentId)
    .map((item: any) => {
      const { icon, name, step, id, parentId, sort, keepAlive, meta, url } = item

      let path = ''
      if (/http(s)?:/.test(url)) {
        path = url
      } else {
        path = url.startsWith('/') ? url : '/' + url
        // path = url.startsWith(pathPrefix) ? path : pathPrefix + path
        path = [...new Set(path.split('/'))].join('/')
      }

      // 路由对应的组件
      const component = SpecialDesign
      return {
        path: path,
        // 路由名称，建议唯一
        name: path || '',
        id: id,
        pid: parentId,
        step: step,
        children: list2tree(items, item.id, [], path),
        // 该路由对应页面的 组件 (动态加载)
        component: component,
        props: true,
        // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
        meta: {
          title: meta?.title || name,
          icon: icon || 'icon-zhuomian',
          // hiddenHeaderContent: hiddenHeaderContent,
          // permission: item.actions || []
          keepAlive: true,
          reload: false,
          componentName: component.name
          // TODO 简单模拟CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作，可以自行修改查看页面效果
          // permission:
          //   parentId == -1
          //     ? []
          //     : ['create', 'update', 'retrieve', 'delete'].map(
          //         (n) =>
          //           `${path
          //             .split('/')
          //             .filter((m) => m.trim() != '')
          //             .join('.')}.${n}`
          //       )
        }
      }
    })
    .sort((a, b) => a.sort - b.sort)
}

export const planUrlMatch = (pid, planId, step) => {
  let url = ''
  switch (step) {
    case 1:
    case 2:
      url = `/dashboard/create/scheme/${step + 1}?pid=${pid}&planId=${planId}`
      break

    case 3:
      url = `/dashboard/design/pid/${pid}/plan/${planId}`
      break
  }

  return url
}

const planAndDir2Menu = (result: any, pid = 0) => {
  let menu: any[] = []

  const data = result.directorys.concat(result.plans)

  for (const item0 of data) {
    const isDir = Object.prototype.hasOwnProperty.call(item0, 'children')

    const menuItem = {
      id: item0.id,
      url: isDir ? `pid/${item0.id}` : planUrlMatch(pid, item0.id, item0.step),
      step: isDir ? -1 : item0.step,
      sort: 5,
      icon: isDir ? 'icon-wenjian' : 'icon-shuqian',
      keepAlive: 1,
      parentId: pid,
      name: item0.name
    }

    menu.push(menuItem)
    if (isDir) {
      const item1 = planAndDir2Menu(item0.children, item0.id)
      menu = menu.concat(item1)
    }
  }

  return menu
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    planMenus(0)
      .then((result) => {
        const menu = planAndDir2Menu(result)

        const menuNav: any = []
        const childrenNav = []
        //      后端数据, 根级树数组,  根级 PID
        // listToTree(data, childrenNav, 0)
        // rootRouter.children = childrenNav
        menuNav.push(childrenNav)
        const routeList = list2tree(menu)
        routeList.forEach((item) => {
          // 设置模块重定向到菜单
          if (item.children?.length > 0 && !item.redirect) {
            item.redirect = { name: item.children[0].name }
          }
        })
        const layout = routes.find((item) => item.name == 'Layout')!
        layout.children = [...routeList]
        // const routes = [...common,...routeList]
        // routes.forEach(item => router.addRoute('Layout', item))
        router.addRoute(layout)
        router.addRoute(notFound)
        resolve(layout.children)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter1 = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    const result = [
      {
        id: 3,
        url: 'system/role',
        sort: 4,
        icon: null,
        keepAlive: 1,
        parentId: 1,
        name: '角色管理'
      },
      {
        id: 2,
        url: 'system/account',
        sort: 5,
        icon: '',
        keepAlive: 1,
        parentId: 1,
        name: '账号管理'
      },
      {
        id: 4,
        url: 'system/access',
        sort: 5,
        icon: null,
        keepAlive: 1,
        parentId: 1,
        name: '资源管理'
      },
      {
        id: 1,
        url: 'system',
        sort: 6,
        icon: 'icon-leidatu',
        keepAlive: 1,
        parentId: -1,
        name: '系统管理'
      },
      {
        id: 5,
        url: 'system/dict',
        sort: 6,
        icon: null,
        keepAlive: 1,
        parentId: 1,
        name: '字典管理'
      }
    ]
    const menuNav: any = []
    const childrenNav = []
    //      后端数据, 根级树数组,  根级 PID
    // listToTree(data, childrenNav, 0)
    // rootRouter.children = childrenNav
    menuNav.push(childrenNav)
    const routeList = list2tree(result)
    routeList.forEach((item) => {
      // 设置模块重定向到菜单
      if (item.children?.length > 0 && !item.redirect) {
        item.redirect = { name: item.children[0].name }
      }
    })
    const layout = routes.find((item) => item.name == 'Layout')!
    layout.children = [...routeList]
    // const routes = [...common,...routeList]
    // routes.forEach(item => router.addRoute('Layout', item))
    router.addRoute(layout)
    router.addRoute(notFound)
    resolve(layout.children)
  })
}
