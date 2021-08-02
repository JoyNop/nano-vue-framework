/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 11:15:52
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:18:10
 * @Description: file content
 * @FilePath: /blast-1/src/api/system/menu.ts
 */
import http from '@/utils/http/axios'

enum Api {
  adminMenus = '/admin/menus',
  GetBtnCodeListByUserId = '/getBtnCodeListByUserId'
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function planMenus(pid) {
  return http.request<any>({
    url: `/directory/${pid}/list/all`,
    method: 'GET'
  })
}

/**
 * 根据用户Id获取权限编码
 * @param params
 */
export function getBtnCodeListByUserId(params: any) {
  return http.request<any>({
    url: Api.GetBtnCodeListByUserId,
    method: 'GET',
    params
  })
}
/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return http.request<any>({
    url: Api.adminMenus,
    method: 'GET'
  })
}
