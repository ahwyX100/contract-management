// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@nomisma/store'
import i18n from '@nomisma/i18n'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
// import './assets/scss/main.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@nomisma/theme/src/main.scss'
import coreComponents from '@nomisma/components'

// install core plugins
import * as corePlugins from '@nomisma/plugins'
Object.keys(corePlugins).forEach(key => {
  Vue.use(corePlugins[key])
})

Vue.use(Vuetify)
Vue.use(coreComponents)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
