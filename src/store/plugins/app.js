import { setDictStore, setPermissionStore } from '@/utils/localStorage'
import { setToken, setSystemType, setTenantCode } from '@/utils/cookie'

export function appPlugin(store) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // 请求成功以后保存字典数据到storage
    if (mutation.type === 'app/setDictStore') {
      const nextDictStoreState = Object.assign({}, state.app.dictStore)
      setDictStore(nextDictStoreState)
    }

    // 清除字典storage数据
    if (mutation.type === 'app/cleanDictStore') {
      setDictStore()
      store.commit('app/setDictTag', false)
    }

    // 请求成功以后保存授权数据到storage
    if (mutation.type === 'app/setPermissionStore') {
      const nextPermissionStoreState = state.app.permissionStore
      setPermissionStore(nextPermissionStoreState)
    }

    // 清除授权storage数据
    if (mutation.type === 'app/cleanPermissionStore') {
      setPermissionStore()
      store.commit('app/setPermissionTag', false)
    }

    // 设置token数据
    if (mutation.type === 'app/setToken') {
      setToken(state.app.token)
    }

    // 设置systemType数据
    if (mutation.type === 'app/setSystemType') {
      setSystemType(state.app.systemType)
    }

    // 设置tenantCode数据
    if (mutation.type === 'app/setTenantCode') {
      setTenantCode(state.app.tenantCode)
    }

    // 登出
    if (mutation.type === 'app/logout') {
      // 清除字典数据
      store.commit('app/cleanDictStore')
      // 清除授权数据
      store.commit('app/cleanPermissionStore')
      // 清除用户数据
      store.commit('user/cleanUserInfoStore')
      // 清除菜单数据
      store.commit('layout/cleanMenuStore')
    }
  })
}
