import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * 根据方案获取模板
 * @param params
 */
export function getOutline(planId) {
  return http.request(
    {
      url: `/outline-param/${planId}/param`,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 创建崩落孔
 * @param params
 */
export function createCavingHole(planId, params) {
  return http.request(
    {
      url: `/blasthole-param/plan/${planId}/caving`,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 创建崩落孔
 * @param params
 */
export function getCavingHole(planId) {
  return http.request(
    {
      url: `/blasthole-param/plan/${planId}/caving`,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 创建崩落孔
 * @param params
 */
export function deleteOneCavingHole(planId, holePosition, name) {
  return http.request(
    {
      url: `/blasthole-param/plan/${planId}/hole_position/${holePosition}/name/${name}/caving`,
      method: RequestEnum.DELETE
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}
