import { login, logout } from '@/api/auth'
import { getDictTypeListAll } from '@/api/sys/dictType'
import { getMenuPermissionsList } from '@/api/sys/menu'

import { setToken, getToken } from '@/utils/cookie'
import { getDictStore, getPermissionStore } from '@/utils/localStorage'

export default {
  namespaced: true,
  state: {
    emptyObj: {},
    emptyList: [],
    token: getToken(),
    version: process.env.VUE_APP_VERSION,
    env: process.env.VUE_APP_NODE_ENV,
    dictTag: false, // false代表需要获取数据
    dictStore: {},
    permissionTag: false, // false代码需要获取授权列表
    permissionStore: []
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    setDictStore(state, dictStore) {
      state.dictStore = dictStore
    },
    setDictTag(state, dictTag) {
      state.dictTag = dictTag
    },
    cleanDictStore(state) {
      state.dictStore = Object.assign({}, state.emptyObj)
      state.dictTag = false
    },
    setPermissionStore(state, permissionStore) {
      state.permissionStore = permissionStore
    },
    setPermissionTag(state, permissionTag) {
      state.permissionTag = permissionTag
    },
    cleantPermissionStore(state) {
      state.permissionStore = Array.from(state.emptyList)
      state.permissionTag = false
    },
    logout(state) {
      state.token = ''
      setToken() // 清除cookie的token
    }
  },
  actions: {
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params)
          .then(response => {
            const token = response.token
            commit('setToken', token)
            setToken(token) // 设置cookie
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getDict({ commit, state }) {
      if (!state.dictTag) {
        // 如果dictTag为false需要获取一次数据
        const dictStore = getDictStore()
        if (dictStore) {
          console.log('从storage获取字典数据')
          commit('setDictStore', dictStore)
          commit('setDictTag', true)
          return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
          getDictTypeListAll()
            .then(response => {
              const dictStore = {}
              response.map(item => {
                dictStore[item.dictType] = item.dataList
              })
              console.log('获取远程字典数据')
              commit('setDictStore', dictStore)
              commit('setDictTag', true)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    getPermissions({ commit, state }) {
      if (!state.permissionTag) {
        // 如果permissionTag为false需要获取一次数据
        const permissionStore = getPermissionStore()
        if (permissionStore) {
          console.log('从storage获取授权数据')
          commit('setPermissionStore', permissionStore)
          commit('setPermissionTag', true)
          return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
          getMenuPermissionsList()
            .then(response => {
              const permissionStore = response
              console.log('获取远程授权数据')
              commit('setPermissionStore', permissionStore)
              commit('setPermissionTag', true)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(response => {
            // 清除vuex的token
            commit('logout')
            // 清除用户
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    filterPermission: state => value => {
      return state.permissionStore.findIndex(item => item === value) !== -1 || false
    },
    getDictByType: state => type => {
      const items = state.dictStore[type]
      items.forEach(item => {
        item.dictValue = parseInt(item.dictValue)
      })
      return items || []
    },
    getDictNameByValue: state => (type, value) => {
      const dicts = state.dictStore[type] || []
      const items = dicts.filter(item => item.dictValue === value)
      return items.length === 1 ? items[0]['dictLabel'] : ''
    }
  }
}
