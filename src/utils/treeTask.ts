/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-19 17:45:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-19 17:51:36
 * @Description: file content
 * @FilePath: /blast-browser/src/utils/treeTask.ts
 */

//创建下拉选择框 tree处理
export const selectBoxTask = (data: any[]) => {
  const list: any[] = []
  if (data) {
    for (const item of data) {
      const newItem: any = {
        value: item.name,
        label: item.name
      }

      if (item.children) {
        const childrenArr: any[] = []
        for (const childItem of item.children.split(',')) {
          const newChildItem = {
            value: childItem,
            label: childItem
          }
          childrenArr.push(newChildItem)
        }
        newItem.children = childrenArr
      }

      list.push(newItem)
    }
  }
  return list
}
