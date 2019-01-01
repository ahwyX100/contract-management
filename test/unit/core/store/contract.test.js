import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { assign, cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

import axios from 'axios'
import storeConfig from '@nomisma/store/modules/contract'

describe('vuex store contract module', () => {

  test('should have correct initial state', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    const state = store.state
    expect(state.totalCount).toBe(0)
    expect(state.partialContracts.length).toBe(0)
    expect(Object.keys(state.pagination).length).toBe(0)
  })

  test('should dispatch "getContractList" action successfully', async () => {
    const _store = {
      mutations: {
        setPartialContract: jest.fn(),
        setTotalCount: jest.fn()
      }
    }
    const store = new Vuex.Store(assign(cloneDeep(storeConfig), _store))
    const resp = await store.dispatch('getContractList', {
      startPage: 1,
      pageSize: 10
    })
    expect(axios.get).toBeCalledWith('/api/contract?_start=0&_end=10')
    expect(_store.mutations.setPartialContract).toBeCalledWith(store.state, {
      data: resp.data
    })
    expect(_store.mutations.setTotalCount).toBeCalledWith(store.state, {
      totalCount: resp.headers['x-total-count']
    })
  })

  test('should dispatch "addContract" action successfully', async () => {
    const _store = {
      mutations: {
        addOneContract: jest.fn(),
        setTotalCount: jest.fn()
      }
    }
    const store = new Vuex.Store(assign(cloneDeep(storeConfig), _store))
    const payload = {
      params: {
        id: 'mockId'
      }
    }
    // only used for test, otherwise should use 'commit' method
    store.state.pagination.rowsPerPage = 10
    const resp = await store.dispatch('addContract', payload)
    expect(axios.post).toBeCalledWith('/api/contract', payload.params)
    expect(_store.mutations.addOneContract).toBeCalledWith(store.state, {
      data: resp.data
    })
    expect(_store.mutations.setTotalCount).toBeCalledWith(store.state, {
      totalCount: store.state.totalCount + 1
    })
  })

  test('should dispatch "editContract" action successfully', async () => {
    const _store = {
      mutations: {
        updateOneContract: jest.fn()
      }
    }
    const store = new Vuex.Store(assign(cloneDeep(storeConfig), _store))
    const payload = {
      params: {
        id: 'mockId'
      },
      editedIndex: 1
    }
    const resp = await store.dispatch('editContract', payload)
    expect(axios.put).toBeCalledWith('/api/contract/mockId', payload.params)
    expect(_store.mutations.updateOneContract).toBeCalledWith(store.state, {
      data: resp.data,
      editedIndex: payload.editedIndex
    })
  })

  test('should dispatch "deleteContract" action successfully', async () => {
    const _store = {
      mutations: {
        setTotalCount: jest.fn()
      }
    }
    const store = new Vuex.Store(assign(cloneDeep(storeConfig), _store))
    const payload = {
      id: 'mockId'
    }
    await store.dispatch('deleteContract', payload)
    expect(axios.delete).toBeCalledWith('/api/contract/mockId')
    expect(_store.mutations.setTotalCount).toBeCalledWith(store.state, {
      totalCount: store.state.totalCount - 1  
    })
  })
})