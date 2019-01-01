import Vue from 'vue'
import Router from 'vue-router'
import ContractList from '@/components/ContractList'
import ExchangeRate from '@/components/ExchangeRate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/contract',
      name: 'contract',
      component: ContractList
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: ExchangeRate
    }
  ]
})
