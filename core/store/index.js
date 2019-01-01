import Vue from 'vue'
import Vuex from 'vuex'

import contract from './modules/contract'
import exchange from './modules/exchange'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    contract,
    exchange
  }
})
  
export default store