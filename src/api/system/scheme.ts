/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-05 11:00:27
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-28 17:41:36
 * @Description: file content
 * @FilePath: /blast-browser/src/api/system/scheme.ts
 */
import http from '@/utils/http/axios'
import { BasicResponseModel } from '@/api/BasicResponseModel'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取用户信息
 */
export function getSechemeBaseData() {
  return http.request(
    {
      url: `/sys-dict/plan/group`,
      method: RequestEnum.GET
    },
    {
      isTransformRequestResult: true
    }
  )
}

//检查名称重复
export function checkPlanName(name: string) {
  return http.request(
    {
      url: `/plan/${name}/check`,
      method: RequestEnum.POST
    },
    {
      isTransformRequestResult: false
    }
  )
}

//提交第一页数据

export function createPage1(params) {
  return http.request(
    {
      url: `/plan`,
      method: RequestEnum.POST,
      params
    },
    {
      isTransformRequestResult: true
    }
  )
}

export function createPage3(params) {
  return http.request(
    {
      url: `/plan/extend/`,
      method: RequestEnum.POST,
      params
    },
    {
      isTransformRequestResult: true
    }
  )
}

export function getOutlineTemplateList() {
  return http.request(
    {
      url: `/outline-template/list`,
      method: RequestEnum.GET
    },
    {
      isTransformRequestResult: true
    }
  )
}
export function getOutlineTemplateByShapeType(type: string) {
  return http.request(
    {
      url: `/outline-template/type/${type}/list`,
      method: RequestEnum.GET
    },
    {
      isTransformRequestResult: true
    }
  )
}
export function getCreateStep1Info(planId) {
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

export function createOutlineParams(planId, outlineTemplateId, params) {
  return http.request(
    {
      url: `/outline-param/plan/${planId}/template/${outlineTemplateId}/param`,
      method: RequestEnum.POST,
      params
    },
    {
      isTransformRequestResult: true
    }
  )
}

//根据planID 获取看哇轮廓线参数
export function getOutlineParamsByPlanId(planId) {
  return http.request(
    {
      url: `/outline-param/${planId}/param`,
      method: RequestEnum.GET
    },
    {
      isTransformRequestResult: true
    }
  )
}

//创建文件夹

export function createDirectory(params) {
  return http.request(
    {
      url: `/directory`,
      method: RequestEnum.POST,
      params
    },
    {
      isTransformRequestResult: true
    }
  )
}
//复制项目

export function copyPlan(params) {
  return http.request(
    {
      url: `/plan/copy`,
      method: RequestEnum.POST,
      params
    },
    {
      isTransformRequestResult: true
    }
  )
}
