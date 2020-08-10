import Vue from 'vue'
import Router from 'vue-router'

export const Layout = () => import('@/views/layout')

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export const staticRouterMap = [
  {
    // 运营登录
    path: '/platform',
    name: 'platform',
    component: () => import('@/views/platform'),
    meta: { title: '登录' }
  },
  {
    // 企业登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout'),
    redirect: { name: 'home' },
    meta: { title: '项目入口' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/modules/home'),
        meta: { title: '首页', isTab: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    name: '404',
    meta: { title: '404未找到' }
  }
]

export const dynamicRouterMap = [
  {
    path: '*',
    redirect: { name: '404' }
  }
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRouterMap
})
