/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-20 17:19:26
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-20 17:21:04
 * @Description: file content
 * @FilePath: /blast-browser/src/views/shared/dashboard/create/interface.ts
 */

export interface Template {
  createDate: string
  description: string
  headers: TemplateHeader[]
  id: string
  image: string
  name: string
  templateFile: string
  type: string
}

export interface TemplateHeader {
  data_type: string
  degree: string
  hour: string
  name: string
  radian: string
  second: string
  sign: string
  value: string
}
