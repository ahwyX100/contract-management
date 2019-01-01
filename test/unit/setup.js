import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

import coreComponents from '@nomisma/components'
import * as corePlugins from '@nomisma/plugins'

Object.keys(corePlugins).forEach(key => {
  Vue.use(corePlugins[key])
})

Vue.use(coreComponents)
Vue.use(Vuetify)