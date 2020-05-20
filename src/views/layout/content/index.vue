<template>
  <main :class="['aui-content', { 'aui-content--tabs': $route.meta.isTab }]">
    <!-- tab展示内容 -->
    <template v-if="$route.meta.isTab">
      <el-dropdown class="aui-content--tabs-tools">
        <i class="el-icon-arrow-down"></i>
        <el-dropdown-menu slot="dropdown" :show-timeout="0">
          <el-dropdown-item
            @click.native="tabRemoveHandle(tabActive)"
          >{{ $t('contentTabs.closeCurrent') }}</el-dropdown-item>
          <el-dropdown-item
            @click.native="tabsCloseOtherHandle()"
          >{{ $t('contentTabs.closeOther') }}</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle()">{{ $t('contentTabs.closeAll') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tabs v-model="tabActive" @tab-click="tabSelectedHandle" @tab-remove="tabRemoveHandle">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.name"
          :name="item.name"
          :label="item.title"
          :closable="item.name !== 'home'"
          :class="{ 'is-iframe': tabIsIframe(item.iframeURL) }"
        >
          <template v-if="item.name === 'home'">
            <svg slot="label" class="icon-svg aui-content--tabs-icon-nav" aria-hidden="true">
              <use xlink:href="#icon-home" />
            </svg>
          </template>
          <iframe
            v-if="tabIsIframe(item.iframeURL)"
            :src="item.iframeURL"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="yes"
          ></iframe>
          <keep-alive v-else>
            <router-view v-if="item.name === tabActive" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </template>
    <!-- 其他方式, 展示内容 -->
    <template v-else>
      <keep-alive>
        <router-view />
      </keep-alive>
    </template>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isURL } from '@/utils/validate'
export default {
  data() {
    return {
      tabActive: '',
      tabs: []
    }
  },
  computed: {
    ...mapGetters(['layout_tabActive', 'layout_tabs', 'layout_menuActive']),
    ...mapGetters('layout', ['filterTabByName', 'filterTabExceptName', 'filterTabIndexByName', 'filterTabIncludeByNames'])
  },
  watch: {
    layout_tabActive: 'storeUpdate',
    tabs: 'storeUpdate'
  },
  created() {
    this.storeUpdate()
    // console.log(`$route.meta.isTab: ${this.$route.meta.isTab}`)
  },
  methods: {
    ...mapMutations('layout', ['setTabActive', 'setTabs', 'setMenuActive']),
    storeUpdate() {
      this.tabActive = this.layout_tabActive
      this.tabs = this.layout_tabs
    },
    // tabs, 是否通过iframe展示
    tabIsIframe(url) {
      return isURL(url)
    },
    // tabs, 选中tab
    tabSelectedHandle(tab) {
      const selectedTab = this.filterTabByName(tab.name)
      if (selectedTab.length !== 0) {
        const item = selectedTab[0]
        if (item.name === this.layout_tabActive) {
          return false
        }
        this.$router.push({
          name: item.name,
          params: { ...item.params },
          query: { ...item.query }
        })
        this.setTabActive(item.name)
      }
    },
    // tabs, 删除tab
    tabRemoveHandle(tabName) {
      // 无法删除home标签页
      if (tabName === 'home') {
        return false
      }

      // 当前选中tab被删除
      if (tabName === this.layout_tabActive) {
        const index = this.filterTabIndexByName(tabName)
        const tab = this.layout_tabs[index - 1]
        this.$router.push({
          name: tab.name,
          params: { ...tab.params },
          query: { ...tab.query }
        })
        this.setTabActive(tab.name)
        this.setMenuActive(tab.name)
      }

      const tabs = this.filterTabExceptName(tabName)
      this.tabs = tabs
      this.setTabs(tabs)
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle() {
      const tabs = this.filterTabIncludeByNames(['home', this.layout_tabActive])
      this.setTabs(tabs)
    },
    // tabs, 关闭全部
    tabsCloseAllHandle() {
      const tabs = this.filterTabIncludeByNames(['home'])
      const tab = tabs[0]
      this.setTabs(tabs)
      this.setTabActive(tab.name)
      this.setMenuActive(tab.name)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
