// import { setDictStore, setPermissionStore } from '@/utils/localStorage'

export function pagePlugin(store) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // 保存动态路由成功以后，修改路由更新状态
    if (mutation.type === 'page/setDynamicRoutes') {
      store.commit('page/setDynamicRoutesFinish', true)
    }
  })
}
