import { setUserInfoStore } from '@/utils/localStorage'

export function userPlugin(store) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // 请求成功以后保存用户数据到storage
    if (mutation.type === 'user/setUserInfoStore') {
      const nextUserInfoStoreState = Object.assign({}, state.user.userInfoStore)
      setUserInfoStore(nextUserInfoStoreState)
    }

    // 清除用户storage数据
    if (mutation.type === 'user/cleanUserInfoStore') {
      setUserInfoStore()
      store.commit('user/setUserInfoTag', false)
    }
  })
}
