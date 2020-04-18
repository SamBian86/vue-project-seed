import Vue from 'vue'
import Router from 'vue-router'

export const Layout = () => import('@/views/layout')

Vue.use(Router)

export const staticRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'main',
    component: Layout,
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/modules/home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    name: '404',
    meta: { title: '404未找到' }
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

export const dynamicRouterMap = []

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRouterMap
})
