import { addRoutes, generateDynamicRoutes } from '@/router/utils'
import { getMenuStore } from '@/utils/localStorage'
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
      const dynamicRoutes = getMenuStore()
        ? generateDynamicRoutes(getMenuStore())
        : generateDynamicRoutes(menus)
      // 如果localStorage中有菜单数据说明触发了刷新功能，需要动态添加路由
      // 如果localStorage中没有菜单数据说明是登录成功以后第一次初始化动态路由
      addRoutes(dynamicRoutes)
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
  actions: {},
  getters: {
    filterMenuByMenuId: state => menuId => {
      return state.dynamicRoutes.filter(item => item.meta.menuId === menuId)
    }
  }
}
