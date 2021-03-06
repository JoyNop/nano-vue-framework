/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-05 11:00:27
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:18:28
 * @Description: file content
 * @FilePath: /blast-1/src/api/system/user.ts
 */
import http from '@/utils/http/axios'
import { BasicResponseModel } from '@/api/BasicResponseModel'
// import { LoginParams, LoginResultModel } from './model/userModel'

enum Api {
  login = '/token/login',
  logout = '/token/logout'
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request(
    {
      url: Api.login,
      method: 'POST'
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  const formData: any = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })
  return http.request<BasicResponseModel<any>>(
    {
      url: Api.login,
      method: 'POST',
      params: formData
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: Api.logout,
    method: 'POST',
    params
  })
}
