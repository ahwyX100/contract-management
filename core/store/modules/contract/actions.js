import axios from 'axios'

export default {
  addContract ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/contract', payload.params)
        .then(resp => {
          if (state.partialContracts.length < state.pagination.rowsPerPage) {
            commit('addOneContract', {
              data: resp.data
            })
            commit('setTotalCount', {
              totalCount: state.totalCount + 1
            })
          }
          resolve(resp)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },

  editContract({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/contract/${payload.params.id}`, payload.params)
        .then(resp => {
          commit('updateOneContract', {
            data: resp.data,
            editedIndex: payload.editedIndex
          })
          resolve(resp)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },

  deleteContract({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/contract/${payload.id}`)
        .then(resp => {
          state.partialContracts.splice(payload.targetIndex, 1)
          commit('setTotalCount', {
            totalCount: state.totalCount - 1
          })
          resolve(resp)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },

  getContractList ({commit}, payload) {
    return new Promise((resolve, reject) => {
      const startPage = payload.startPage
      const pageSize = payload.pageSize
      const startIndex = (startPage - 1) * pageSize
      const endIndex = startPage * pageSize
      const url = `/api/contract?_start=${startIndex}&_end=${endIndex}`
      axios.get(url)
        .then(resp => {
          commit('setPartialContract', {
            data: resp.data,
          })
          commit('setTotalCount', {
            totalCount: resp.headers['x-total-count']
          })
          resolve(resp)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }
}