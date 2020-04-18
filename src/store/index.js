import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import layout from './modules/layout'
import user from './modules/user'
import page from './modules/page'

import getters from './getters'
import { appPlugin } from '@/store/plugin/app'
import { userPlugin } from '@/store/plugin/user'
import { layoutPlugin } from '@/store/plugin/layout'
import { pagePlugin } from '@/store/plugin/page'

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
