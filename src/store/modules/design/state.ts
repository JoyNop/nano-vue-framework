export interface TemplateData {
  blastHoleTypes: string
  createDate: string
  cutPattern: string
  description: string
  excavationPattern: string
  id: number
  image: string
  shape: string
  templateFile: string
}

export type IDesignState = {
  templates: TemplateData[]
  currentTemplate: TemplateData | null
  cutHoleTableData: any[]
  spreaderHoleTableData: any[]
  borderHoleTableData: any[]
  paddingHoleTableData: any[]
  bottomHoleTableData: any[]
  carvingHoleTableData: any[]
}

export const state: IDesignState = {
  templates: [],
  currentTemplate: null,
  cutHoleTableData: [],
  spreaderHoleTableData: [],
  borderHoleTableData: [],
  paddingHoleTableData: [],
  bottomHoleTableData: [],
  carvingHoleTableData: []
}
