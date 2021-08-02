/**
 * 设计模块
 */
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export default {
  namespaced: true,
  name: 'design',
  state,
  mutations,
  actions,
  getters
}
