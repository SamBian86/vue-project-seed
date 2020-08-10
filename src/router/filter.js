import router from '@/router'
import { getToken } from '@/utils/cookie'
import { goToLogin } from '@/router/utils'
import store from '@/store'

const whiteList = ['/login', '/platform'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (whiteList.includes(to.path)) {
      next({ path: '/' })
    } else if (to.path === '/404') {
      next()
    } else if (from.path === '/') {
      // 在当前页面强制刷新
      // console.log(
      //   `store.getters.layout_menuStore.length: ${store.getters.layout_menuStore.length}`
      // )
      if (store.getters.layout_menuStore.length === 0) {
        store.dispatch('layout/getMenuNav').then(() => {
          next({ ...to, replace: true })
        })
      } else {
        // console.log(store.getters.hasDynamicRoutes(to.path))
        // 动态路由生成工程以后就放行, 没有该动态路由时进入404页面
        next()
        // store.commit('app/logout') // 用于处理不存在的页面
        // next({ path: '/login' })
      }
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(goToLogin(to.path)) // 否则全部重定向到登录页
    }
  }
})
