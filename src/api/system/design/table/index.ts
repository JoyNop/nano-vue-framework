import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

enum Api {
  createHoleTable = '/blasthole-param/param',
  getHoleTemplate = '/blasthole-template/list'
}

/**
 * 提交创建炮孔表格
 * @param params
 */
export function postHoleTable(params) {
  return http.request(
    {
      url: Api.createHoleTable,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '创建成功'
    }
  )
}

/**
 * 提交创建炮孔表格
 * @param params
 */
export function editHoleTable(params) {
  return http.request(
    {
      url: Api.createHoleTable,
      method: RequestEnum.PUT,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '修改成功'
    }
  )
}

/**
 * 获取炮孔模板
 * @param params
 */
export function getHoleTemplate() {
  return http.request(
    {
      url: Api.getHoleTemplate,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 根据方案获取模板
 * @param params
 */
export function getCurrentTemplate(planId) {
  return http.request(
    {
      url: `/blasthole-template/plan/${planId}/template`,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 根据方案获取模板
 * @param params
 */
export function selectCurrentTemplate(planId, holeTemplateId) {
  return http.request(
    {
      url: `/blasthole-template/plan/${planId}/template/${holeTemplateId}`,
      method: RequestEnum.PUT
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 上传炮孔模板
 * @param params
 */
export function uploadHoleTemplate(planId, holeTemplateId, params) {
  return http.request(
    {
      url: `/blasthole-param/plan/${planId}/template/${holeTemplateId}/upload`,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '上传成功'
    }
  )
}

/**
 * 获取所有孔
 * @param params
 */
export function getHoleData(planId) {
  return http.request(
    {
      url: `/blasthole-param/plan/${planId}/list`,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 删除一个孔
 * @param params
 */
export function deleteOneHoleData(paramId) {
  return http.request(
    {
      url: `/blasthole-param/param/${paramId}`,
      method: RequestEnum.DELETE
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 更新 爆破延期间隔时间, 创建或者修改都通过此api提交
 * @param params
 */
export function getInterval(planId) {
  return http.request(
    {
      url: `/explosiv-eonsumption/plan/${planId}/interval`,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false
    }
  )
}

/**
 * 更新 爆破延期间隔时间, 创建或者修改都通过此api提交
 * @param params
 */
export function updateInterval(planId, interval) {
  return http.request(
    {
      url: `/explosiv-eonsumption/plan/${planId}/interval/${interval}`,
      method: RequestEnum.POST
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 设置起爆网络参数
 * @param params
 */
export function setBlastNetwork(planId, params) {
  return http.request(
    {
      url: `/blasthole-param/plan/${planId}/net`,
      method: RequestEnum.PUT,
      params
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 设置起爆网络参数
 * @param params
 */
export function setEonsumption(params) {
  return http.request(
    {
      url: `/explosiv-eonsumption`,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}

/**
 * 获取起爆网络参数
 * @param params
 */
export function getEonsumption(planId) {
  return http.request(
    {
      url: `/explosiv-eonsumption/plan/${planId}/`,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: false // 是否显示错误提示信息
    }
  )
}
