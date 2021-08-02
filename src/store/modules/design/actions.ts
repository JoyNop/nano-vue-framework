import { ActionContext, createLogger } from 'vuex'
import { IDesignState, TemplateData } from './state'
import { IStore } from '@/store/types'
import {
  getHoleTemplate,
  getHoleData,
  deleteOneHoleData,
  getCurrentTemplate,
  selectCurrentTemplate
} from '@/api/system/design/table'
import { createCavingHole, deleteOneCavingHole, getCavingHole } from '@/api/system/design/draw'

export const actions = {
  // 获取所有模板
  async getTemplateInfo({ commit }: ActionContext<IDesignState, IStore>) {
    try {
      const res = await getHoleTemplate()
      commit('setTemplates', res)
    } catch (error) {}
  },
  // 根据方案获取模板(获取当前方案的模板,没有是 null)
  async getCurrentTemplateInfo({ commit }: ActionContext<IDesignState, IStore>, planId) {
    try {
      const res = await getCurrentTemplate(planId)

      commit('setTemplate', res)
    } catch (error) {}
  },
  // 设置一个当前模板
  async setCurrentTemplate({ commit }: ActionContext<IDesignState, IStore>, ids) {
    try {
      await selectCurrentTemplate(ids.planId, ids.holeTemplateId)
    } catch (error) {}
  },
  // 获取除了崩落孔的其他孔
  async getHoleExceptCarvingTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    const res = await getHoleData(planId)

    const cutHoleTableData = res.filter((item) => item.blastholeType === '掏槽孔')

    const spreaderHoleTableData = res.filter((item) => item.blastholeType === '扩槽孔')

    const borderHoleTableData = res.filter((item) => item.blastholeType === '周边孔')

    const paddingHoleTableData = res.filter((item) => item.blastholeType === '内圈孔')

    const bottomHoleTableData = res.filter((item) => item.blastholeType === '底板孔')

    const holeData = {
      cutHoleTableData,
      spreaderHoleTableData,
      borderHoleTableData,
      paddingHoleTableData,
      bottomHoleTableData
    }

    commit('setHoleExceptCarvingTableData', holeData)
  },
  // 获取掏槽孔
  async getCutHoleTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    const res = await getHoleData(planId)

    const cutHoleTableData = res.filter((item) => item.blastholeType === '掏槽孔')

    commit('setCutHoleTableData', cutHoleTableData)
  },

  // 获取扩槽孔
  async getSpreaderHoleTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    const res = await getHoleData(planId)

    const spreaderHoleTableData = res.filter((item) => item.blastholeType === '扩槽孔')

    commit('setSpreaderHoleTableData', spreaderHoleTableData)
  },
  // 获取周边孔
  async getBorderHoleTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    const res = await getHoleData(planId)

    const borderHoleTableData = res.filter((item) => item.blastholeType === '周边孔')

    commit('setBorderHoleTableData', borderHoleTableData)
  },
  // 获取内圈孔
  async getPaddingHoleTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    const res = await getHoleData(planId)

    const paddingHoleTableData = res.filter((item) => item.blastholeType === '内圈孔')

    commit('setPaddingHoleTableData', paddingHoleTableData)
  },
  // 获取底板孔
  async getBottomHoleTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    const res = await getHoleData(planId)

    const bottomHoleTableData = res.filter((item) => item.blastholeType === '底板孔')

    commit('setBottomHoleTableData', bottomHoleTableData)
  },
  // 删除一个孔
  async deleteOneHoleTableData({ commit }: ActionContext<IDesignState, IStore>, paramId) {
    await deleteOneHoleData(paramId)
  },
  //添加一个崩落孔
  addOneCarvingHoleClientTableData({ commit }: ActionContext<IDesignState, IStore>, holeData) {
    commit('setCarvingHoleClientTableData', holeData)
  },
  //删除一个崩落孔
  async deleteOneCarvingHoleClientTableData(
    { commit, state }: ActionContext<IDesignState, IStore>,
    holeData
  ) {
    try {
      console.log('holeData', holeData, state)
      if (holeData.is === 'server') {
        await deleteOneCavingHole(holeData.planId, holeData.holePosition, holeData.name)
      }
      commit('deleteCarvingHoleClientTableData', holeData)
    } catch (error) {}
  },
  // 获取崩落孔
  async getCarvingHoleTableData({ commit }: ActionContext<IDesignState, IStore>, planId) {
    try {
      let res = await getCavingHole(planId)
      res = res.map((item) => ({
        ...item,
        key: item.x * item.y * Math.random(),
        is: 'server'
      }))
      commit('setCarvingHoleTableData', res)
    } catch (error) {}
  },
  // 合并崩落孔
  async combineCarvingHoleClientTableData(
    { commit, state }: ActionContext<IDesignState, IStore>,
    holeGroup
  ) {
    try {
      holeGroup.groupArray.forEach((item) => {
        item.holePosition = holeGroup.groupName
      })

      console.log('holeGroupholeGroup', holeGroup)
      await createCavingHole(holeGroup.planId, holeGroup.groupArray)
      commit('combineCarvingHoleClientTableData', holeGroup)
    } catch (error) {}
  }
}
