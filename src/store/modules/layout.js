import { getMenuNavList } from '@/api/sys/menu'

import { getMenuStore } from '@/utils/localStorage'
export default {
  namespaced: true,
  state: {
    emptyObj: {},
    emptyList: [],
    navbar: {
      // 导航条
      layoutType: 'colorful'
    },
    sidebar: {
      // 侧边栏
      layoutSkin: 'dark', // 侧边栏布局皮肤
      fold: false // 侧边栏折叠状态
    },
    menuStore: [], // 菜单
    menuTag: false, // false代表需要获取数据
    menuActive: '', // 当前选中的菜单
    tabActive: 'home', // 当前选中的标签页
    tabs: [
      {
        name: 'home',
        params: {},
        query: {},
        menuId: '',
        title: 'home',
        isTab: true,
        iframeURL: ''
      }
    ] // tab数据保存
  },
  mutations: {
    setMenuStore: (state, menuStore) => {
      state.menuStore = menuStore
    },
    setMenuTag(state, menuTag) {
      state.menuTag = menuTag
    },
    cleanMenuStore(state) {
      state.menuStore = Array.from(state.emptyList).concat()
      state.menuTag = false
    },
    setSidebarFold(state, boolean) {
      state.sidebar.fold = boolean
      console.log('设置成功')
    }
  },
  actions: {
    getMenuNav({ commit, state }) {
      if (!state.menuTag) {
        // 如果menuTag为false需要获取一次数据
        const menuStore = getMenuStore()
        if (menuStore) {
          console.log('从storage获取菜单数据')
          commit('setMenuStore', menuStore)
          commit('setMenuTag', true)
          return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
          getMenuNavList()
            .then(response => {
              const menuStore = response
              console.log('获取远程菜单数据')
              commit('setMenuStore', menuStore)
              commit('setMenuTag', true)
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
