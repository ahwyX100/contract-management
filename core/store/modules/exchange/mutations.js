import moment from 'moment'

export default {

  setHistoryExchangeRates (state, payload) {
    const reversedHistoryRates = payload.newHistoryRates.reverse()
    const processedHistoryRates = reversedHistoryRates.map(rate => {
      rate.standardTime = moment(rate.time).format('ll')
      return rate
    })
    state.historyExchangeRates = [...processedHistoryRates, ...state.historyExchangeRates]
  },

  setPartialExchangeRates (state, payload) {
    const _historyExchangeRates = state.historyExchangeRates
    const startIndex = _historyExchangeRates.length - payload.requiredDateCount
    const endIndex = _historyExchangeRates.length
    state.partialExchangeRates = state.historyExchangeRates.slice(startIndex, endIndex)
  }
}