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

Vue.use(Element, {
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

// 添加全局插件
import common from '@/components/yunlin-common'
import YunlinTable from '@/components/yunlin-table'
import YunlinForm from '@/components/yunlin-form'
import YunlinMaskView from '@/components/yunlin-mash-view'
Vue.use(common)
Vue.use(YunlinTable)
Vue.use(YunlinForm)
Vue.use(YunlinMaskView)

// 全局directive
// import permission from './directive/permission'
// Vue.use(permission)

Vue.config.productionTip = false
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
