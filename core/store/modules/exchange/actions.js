import axios from 'axios'

export default {
  getExchangeRates ({ commit }, payload) {
    let baseURL = '/ETH?apikey=BC15501A-171A-4E95-B3B3-9F9F8BAE507D'
    if (payload && payload.time) {
      baseURL += `&time=${payload.time}`
    }
    axios.get(baseURL)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.error(err)
      })
  },

  getPartialExchangeRate ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const _historyExchangeRates = state.historyExchangeRates
      if (payload.requiredDateCount < _historyExchangeRates.length) {
        commit('setPartialExchangeRates', payload)
        resolve()
      } else {
        const startIndex = state.historyExchangeRates.length
        const endIndex = payload.requiredDateCount
        const url = `/api/exchange?_start=${startIndex}&_end=${endIndex}`
        axios.get(url)
          .then(resp => {
            commit('setHistoryExchangeRates', {
              newHistoryRates: resp.data
            })
            commit('setPartialExchangeRates', payload)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }
}