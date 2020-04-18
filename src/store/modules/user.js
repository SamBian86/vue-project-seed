import { getUserInfo } from '@/api/sys/user'

import { getUserInfoStore } from '@/utils/localStorage'

export default {
  namespaced: true,
  state: {
    emptyObj: {},
    emptyList: [],
    userInfoStore: {},
    userInfoTag: false // false代表需要获取数据
  },
  mutations: {
    setUserInfoStore: (state, userInfoStore) => {
      state.userInfoStore = userInfoStore
    },
    setUserInfoTag(state, userInfoTag) {
      state.userInfoTag = userInfoTag
    },
    cleanUserInfoStore(state) {
      state.userInfoStore = Object.assign({}, state.emptyObj)
      state.userInfoTag = false
    }
  },
  actions: {
    getUserInfo({ commit, state }) {
      if (!state.userInfoTag) {
        // 如果dictTag为false需要获取一次数据
        const userInfoStore = getUserInfoStore()
        if (userInfoStore) {
          console.log('从storage获取用户数据')
          commit('setUserInfoStore', userInfoStore)
          commit('setUserInfoTag', true)
          return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
          getUserInfo()
            .then(response => {
              const userInfoStore = response
              console.log('获取远程用户数据')
              commit('setUserInfoStore', userInfoStore)
              commit('setUserInfoTag', true)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    }
  }
}
