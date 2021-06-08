/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:51:37
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-07 16:21:01
 * @Description: file content
 * @FilePath: /vue3-ts/src/plugins/axios.ts
 */
'use strict'

import axios from 'axios'
import VueAxios from 'vue-axios'
import type { App } from 'vue'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error)
  }
)

export function setupAxios(app: App<Element>) {
  // app.component('AButton', AButton)
  app.use(VueAxios, _axios)
  // app.use(Form).use(Input).use(Modal).use(Table).use(Menu).use(Card).use(Checkbox).use(Radio)
}
