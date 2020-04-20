import { setMenuStore } from '@/utils/localStorage'

export function layoutPlugin(store) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // 请求成功以后保存用户数据到storage
    if (mutation.type === 'layout/setMenuStore') {
      const nextMenuStoreState = state.layout.menuStore

      // 根据菜单创建动态路由
      store.commit('page/setDynamicRoutes', nextMenuStoreState)
      setMenuStore(nextMenuStoreState)
    }

    // 清除用户storage数据
    if (mutation.type === 'layout/cleanMenuStore') {
      setMenuStore()
      store.commit('layout/setMenuTag', false)

      // 清空动态路由数据
      store.commit('page/cleanDynamicRoutes')
    }
  })
}
