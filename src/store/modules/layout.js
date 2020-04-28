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
      state.menuStore = Array.from(state.emptyList)
      state.menuTag = false
    },
    setSidebarFold(state, boolean) {
      state.sidebar.fold = boolean
    },
    setLayoutType(state, layoutType) {
      state.navbar.layoutType = layoutType
    },
    setLayoutSkin(state, layoutSkin) {
      state.sidebar.layoutSkin = layoutSkin
    },
    setTabActive(state, tabActive) {
      state.tabActive = tabActive
    },
    setMenuActive(state, menuActive) {
      state.menuActive = menuActive
    },
    setTabs(state, tabs) {
      state.tabs = tabs
    }
  },
  actions: {
    getMenuNav({ commit, state }) {
      if (!state.menuTag) {
        // 如果menuTag为false需要获取一次数据
        const menuStore = getMenuStore()
        if (menuStore) {
          console.log('从storage获取菜单数据')
          // 保存菜单数据到vuex
          commit('setMenuStore', menuStore)
          commit('setMenuTag', true)
          return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
          getMenuNavList()
            .then(response => {
              const menuStore = response
              console.log('获取远程菜单数据')
              // 保存菜单数据到vuex
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
  },
  getters: {
    // 返回指定名称的标签页(单个)
    filterTabByName: state => name => {
      return state.tabs.filter(item => item.name === name)
    },
    // 返回除name以外的其他标签页
    filterTabExceptName: state => name => {
      return state.tabs.filter(item => item.name !== name)
    },
    // 返回指定名称标签页的indexindex
    filterTabIndexByName: state => name => {
      return state.tabs.findIndex(item => item.name === name)
    },
    // 返回指定名称的标签页(多个)
    filterTabIncludeByNames: state => names => {
      return state.tabs.filter(item => names.includes(item.name))
    }
  }
}
