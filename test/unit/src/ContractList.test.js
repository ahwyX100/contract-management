/*
 * import test utils and dependency packages
 */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import i18n from '@nomisma/i18n'

/*
 * import test target component
 */
import ContractList from '@/components/ContractList.vue'

/*
 * mock sub component stub if child component exists
 * add plugins, directives and other dependencies locally
 */
const localVue = createLocalVue()
localVue.use(Vuex)

/*
 * main test case
 */
describe('my contract list view', () => {
  let wrapper = null

  const actions = {
    getContractList: jest.fn(),
    deleteContract: jest.fn()
  }
  const store = new Vuex.Store({
    modules: {
      contract: {
        namespaced: true,
        state: {
          contracts: [],
          partialContracts: [],
        },
        actions
      }	
    }
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })

  function createWrapper(props, mounted) {
    return wrapper = shallowMount(ContractList, {
      propsData: props,
      localVue,
      store,
      i18n,
      sync: false,
      attachToDocument: mounted
    })
  }

  test('it renders successfully', () => {
    wrapper = createWrapper({}, true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should fetch first data after component created', () => {
    const spy = jest.spyOn(ContractList.methods, 'fetchData')
    wrapper = createWrapper({}, true)
    expect(spy).toHaveBeenCalled()
    expect(actions.getContractList).toHaveBeenCalled()
    spy.mockRestore()
  })
})