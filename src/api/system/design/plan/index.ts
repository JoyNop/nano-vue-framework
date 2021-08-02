/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-28 16:21:56
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 10:28:12
 * @Description: file content
 * @FilePath: /blast-browser/src/api/system/design/plan/index.ts
 */
import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * 根据方案1信息
 * @param planId
 */
export function getStep1Detail(planId) {
  return http.request(
    {
      url: `/plan/${planId}`,
      method: RequestEnum.GET
    },
    {
      isTransformRequestResult: true
    }
  )
}

/**
 * 根据方案1信息
 * @param planId
 */
export function getStep2Detail(planId) {
  return http.request(
    {
      url: `/plan/extend/${planId}`,
      method: RequestEnum.GET
    },
    {
      isTransformRequestResult: true
    }
  )
}
