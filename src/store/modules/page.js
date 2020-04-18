import { generateDynamicRoutes } from '@/router/utils'
// addRoutes,
export default {
  namespaced: true,
  state: {
    emptyObj: {},
    emptyList: [],
    refresh: false, // 是否需要重新获取数据刷新页面
    dynamicRoutes: [],
    dynamicRoutesFinish: false // 是否已经初始化动态路由
  },
  mutations: {
    setDynamicRoutes: (state, menus) => {
      const dynamicRoutes = generateDynamicRoutes(menus)
      // addRoutes(dynamicRoutes)
      state.dynamicRoutes = dynamicRoutes
    },
    setDynamicRoutesFinish: (state, dynamicRoutesFinish) => {
      state.dynamicRoutesFinish = dynamicRoutesFinish
      console.log('修改路由初始化状态成功')
    },
    cleanDynamicRoutes(state) {
      state.dynamicRoutes = Array.from(state.emptyList).concat()
      state.dynamicRoutesFinish = false
    }
  },
  actions: {}
}
