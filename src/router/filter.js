import router from '@/router'
import { getToken } from '@/utils/cookie'

import store from '@/store'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  // debugger
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else if (to.path === '/404') {
      next()
    } else {
      if (store.getters.layout_menuStore.length === 0) {
        store.dispatch('layout/getMenuNav').then(() => {
          console.log('刷新页面重新生成路由数据')
          next()
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})
