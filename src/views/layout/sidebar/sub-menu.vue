<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.id" :popper-append-to-body="false">
    <template slot="title">
      <svg class="icon-svg aui-sidebar__menu-icon" aria-hidden="true">
        <use :xlink:href="`#${menu.icon}`" />
      </svg>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item"></sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.id" @click="gotoRouteHandle(menu.id)">
    <svg class="icon-svg aui-sidebar__menu-icon" aria-hidden="true">
      <use :xlink:href="`#${menu.icon}`" />
    </svg>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SubMenu from './sub-menu'
export default {
  name: 'SubMenu',
  components: {
    SubMenu
  },
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['page_dynamicRoutes', 'layout_tabs', 'layout_menuActive', 'layout_tabActive']),
    ...mapGetters('page', ['filterMenuByMenuId']),
    ...mapGetters('layout', ['filterTabByName'])
  },
  created() {},
  methods: {
    ...mapMutations('layout', ['setTabActive', 'setMenuActive', 'setTabs']),
    // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
    gotoRouteHandle(menuId) {
      const routes = this.filterMenuByMenuId(menuId)
      if (routes.length === 1) {
        // 如果有该动态路由
        const route = routes[0]
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

        const hasTab = this.filterTabByName(route.name).length === 1 || false

        this.setMenuActive(route.meta.menuIndex)
        this.setTabActive(route.name)
        if (!hasTab) {
          // 如果还没有这个tab选项，需要新增tabs
          this.setTabs([...this.layout_tabs, ...tab])
        }
        this.$router.push({ path: route.path })
      } else {
        console.log('没有此动态路由')
      }
    }
  }
}
</script>
