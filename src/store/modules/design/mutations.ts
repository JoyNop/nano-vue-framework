import { IDesignState, TemplateData } from './state'

export const mutations = {
  setTemplates: (state: IDesignState, templates: TemplateData[]) => {
    state.templates = templates
  },
  // 设置当前方案的模板
  setTemplate: (state: IDesignState, currentTemplate: any) => {
    state.currentTemplate = currentTemplate
  },
  // 获取好几个孔
  setHoleExceptCarvingTableData: (state: IDesignState, holeData: any) => {
    state.cutHoleTableData = holeData.cutHoleTableData
    state.spreaderHoleTableData = holeData.spreaderHoleTableData
    state.borderHoleTableData = holeData.borderHoleTableData
    state.paddingHoleTableData = holeData.paddingHoleTableData
    state.bottomHoleTableData = holeData.bottomHoleTableData
  },
  setCutHoleTableData: (state: IDesignState, cutHoleTableData: any[]) => {
    state.cutHoleTableData = cutHoleTableData
  },
  setSpreaderHoleTableData: (state: IDesignState, spreaderHoleTableData: any[]) => {
    state.spreaderHoleTableData = spreaderHoleTableData
  },
  setBorderHoleTableData: (state: IDesignState, borderHoleTableData: any[]) => {
    state.borderHoleTableData = borderHoleTableData
  },
  setPaddingHoleTableData: (state: IDesignState, paddingHoleTableData: any[]) => {
    state.paddingHoleTableData = paddingHoleTableData
  },
  setBottomHoleTableData: (state: IDesignState, bottomHoleTableData: any[]) => {
    state.bottomHoleTableData = bottomHoleTableData
  },
  setCarvingHoleClientTableData: (state: IDesignState, carvingHoleClientTableData: any) => {
    state.carvingHoleTableData = [...state.carvingHoleTableData, carvingHoleClientTableData]
  },
  deleteCarvingHoleClientTableData: (state: IDesignState, carvingHoleClientTableData: any) => {
    state.carvingHoleTableData = state.carvingHoleTableData.filter(
      (item) => item.name !== carvingHoleClientTableData.name
    )
  },
  setCarvingHoleTableData: (state: IDesignState, res: any) => {
    // console.log('res', res)
    state.carvingHoleTableData = res
  },
  combineCarvingHoleClientTableData: (state: IDesignState, holeGroup: any) => {
    console.log('holeGroup', holeGroup)
    for (const iterator of holeGroup.groupArray) {
      const itemIndex = state.carvingHoleTableData.findIndex((value) => value.name == iterator.name)
      if (itemIndex !== -1) {
        state.carvingHoleTableData[itemIndex].holePosition = holeGroup.groupName
      }
    }
    console.log('state.carvingHoleClientTableData', state.carvingHoleTableData)
  }
}
