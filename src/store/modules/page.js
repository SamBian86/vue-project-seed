import { addRoutes, addAllRoutes, generateDynamicRoutes } from '@/router/utils'
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
      const dynamicRoutes = generateDynamicRoutes(menus)
      // 如果localStorage中有菜单数据直接用于添加路由
      if (getMenuStore()) {
        addAllRoutes()
      } else {
        addRoutes(dynamicRoutes)
      }
      state.dynamicRoutes = getMenuStore()
        ? generateDynamicRoutes(getMenuStore())
        : dynamicRoutes
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
