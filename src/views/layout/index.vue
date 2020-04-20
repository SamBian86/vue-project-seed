<template>
  <div
    v-loading.fullscreen.lock="loading"
    :element-loading-text="$t('loading')"
    :class="['aui-wrapper', { 'aui-sidebar--fold': layout_sidebar_fold }]"
  >
    <template v-if="!loading">
      <layout-navbar />
      <layout-sidebar />
      <div class="aui-content__wrapper">
        <!-- <router-view /> -->
        <layout-content v-if="!page_refresh" />
      </div>
      <layout-theme-tools />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { windowResizeListen, debounce } from '@/utils'
import LayoutNavbar from './navbar'
import LayoutSidebar from './sidebar'
import LayoutContent from './content'
import LayoutThemeTools from './themeTools'
export default {
  name: 'Layout',
  provide() {
    return {
      // 刷新
      refresh() {
        console.log('刷新功能暂时没用，预留')
      }
    }
  },
  components: {
    LayoutNavbar,
    LayoutSidebar,
    LayoutContent,
    LayoutThemeTools
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['layout_sidebar_fold', 'page_refresh', 'layout_tabs'])
  },
  watch: {
    $route: 'applicationCheck'
  },
  created() {
    // console.log(this.$router)
    // 窗口resize监听
    this.windowResizeHandle()
    // 路由切换的时候会自动检查初始化数据是否需要重新获取
    this.applicationCheck(this.$route)
    // setTimeout(() => {
    //   // 清除字典方法
    //   this.cleanDictStore()
    // }, 5000)
  },
  methods: {
    ...mapMutations('app', ['cleanDictStore']),
    ...mapMutations('layout', [
      'setSidebarFold',
      'setTabActive',
      'setTabActive',
      'setMenuActive',
      'setTabs'
    ]),
    ...mapActions('app', ['getDict', 'getPermissions']),
    ...mapActions('user', ['getUserInfo']),
    ...mapActions('layout', ['getMenuNav']),
    // 初始化数据方法
    applicationCheck() {
      // 在非home页面强刷页面修复tabs显示
      if (this.layout_tabs.length === 1 && this.$route.name !== 'home') {
        const route = this.$route
        const tab = [
          {
            name: route.name,
            params: {},
            query: {},
            menuId: route.meta.menuIndex,
            title: route.meta.title,
            isTab: route.meta.isTab,
            iframeURL: route.meta.iframeURL
          }
        ]
        this.setMenuActive(route.meta.menuIndex)
        this.setTabActive(route.name)
        this.setTabs([...this.layout_tabs, ...tab])
      }

      if (this.layout_tabs.length === 1 && this.$route.name === 'home') {
        this.setMenuActive('')
        this.setTabActive('home')
      }

      Promise.all([
        // 获取菜单
        this.getMenuNav(),
        // 获取字典
        this.getDict(),
        // 获取权限列表
        this.getPermissions(),
        // 获取用户信息
        this.getUserInfo()
      ]).then(() => {
        this.loading = false
      })
    },
    // 窗口resize
    windowResizeHandle() {
      const status = windowResizeListen()
      // 提供一个防抖方法
      const debounceSetSidebarFold = debounce(this.setSidebarFold, 200)

      window.addEventListener('resize', () => {
        debounceSetSidebarFold(status)
      })
    }
  }
}
</script>
