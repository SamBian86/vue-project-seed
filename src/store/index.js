import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import layout from './modules/layout'
import user from './modules/user'
import page from './modules/page'

import getters from './getters'
import { appPlugin } from '@/store/plugins/app'
import { userPlugin } from '@/store/plugins/user'
import { layoutPlugin } from '@/store/plugins/layout'
import { pagePlugin } from '@/store/plugins/page'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    layout,
    user,
    page
  },
  plugins: [appPlugin, userPlugin, layoutPlugin, pagePlugin],
  getters
})
