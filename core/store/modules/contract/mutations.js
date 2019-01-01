import moment from 'moment'

export default {

  addOneContract (state, payload) {
    const rawData = payload.data
    rawData.date = moment(rawData.time).format('LLL')
    rawData.name = `${rawData.user.name} ${rawData.user.surname}`
    state.partialContracts.push(rawData)
  },

  updateOneContract (state, payload) {
    const rawData = payload.data
    rawData.date = moment(rawData.time).format('LLL')
    rawData.name = `${rawData.user.name} ${rawData.user.surname}`
    state.partialContracts.splice(payload.editedIndex, 1, rawData)
  },

  setPartialContract (state, payload) {
    const rawData = payload.data
    const processedData = rawData.map(data => {
      data.date = moment(data.time).format('LLL')
      data.name = `${data.user.name} ${data.user.surname}`
      return data
    })
    state.partialContracts = processedData
  },

  setTotalCount (state, payload) {
    state.totalCount = parseInt(payload.totalCount)
  },

  setPagination (state, payload) {
    state.pagination = payload
  }
}