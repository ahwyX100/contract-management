import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    totalCount: 0,
    partialContracts: [],
    pagination: {}
  },
  actions,
  mutations
}