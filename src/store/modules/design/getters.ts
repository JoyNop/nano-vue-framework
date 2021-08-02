import { IDesignState } from './state'

export const getters = {
  getTemplates: (state: IDesignState) => state.templates,
  getCurrentTemplate: (state: IDesignState) => state.currentTemplate,
  getCutHoleTableData: (state: IDesignState) => state.cutHoleTableData,
  getSpreaderHoleTableData: (state: IDesignState) => state.spreaderHoleTableData,
  getBorderHoleTableData: (state: IDesignState) => state.borderHoleTableData,
  getPaddingHoleTableData: (state: IDesignState) => state.paddingHoleTableData,
  getBottomHoleTableData: (state: IDesignState) => state.bottomHoleTableData,
  getCarvingHoleTableData: (state: IDesignState) => state.carvingHoleTableData
}
