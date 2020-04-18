import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import i18n from '@/i18n'
import store from '@/store'
import router from '@/router'
import '@/router/filter'

import '@/icons'
import '@/element-ui/theme/index.css'
import '@/assets/scss/aui.scss'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
