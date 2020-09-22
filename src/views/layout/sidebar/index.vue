<template>
  <aside :class="['aui-sidebar', `aui-sidebar--${layout_sidebar_layoutSkin}`]">
    <div class="aui-sidebar__inner">
      <el-menu
        :collapse="!!layout_sidebar_fold"
        :collapse-transition="false"
        :unique-opened="true"
        class="aui-sidebar__menu"
        background-color="#0d1b33"
        text-color="#8a979e"
        active-text-color="#fff"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
      >
        <sub-menu v-for="menu in layout_menuStore" :key="`${menu.id}`" :menu="menu" />
      </el-menu>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import SubMenu from './sub-menu'
export default {
  components: {
    SubMenu
  },
  props: {},
  data() {
    return {
      defaultOpeneds: [],
      defaultActive: ''
    }
  },
  computed: {
    ...mapGetters([
      'layout_sidebar_layoutSkin',
      'layout_menuActive',
      'layout_tabActive',
      'layout_menuStore',
      'layout_sidebar_fold',
      'layout_tabs'
    ])
  },
  watch: {
    layout_tabActive: 'storeUpdate'
  },
  mounted() {
    this.storeUpdate()
  },
  methods: {
    ...mapMutations('layout', ['setTabActive', 'setMenuActive']),
    storeUpdate() {
      const { layout_menuStore, layout_tabActive } = this

      let defaultOpeneds = [] // 保存菜单路径 包含父子节点
      let defaultActive = ''
      const getRoad = (his, tree, tabName) => {
        tree.some((item) => {
          const _url = (item.url || '').replace(/\//g, '_')
          if (_url === tabName) {
            defaultActive = item.id
            defaultOpeneds = his.map((item) => item.id)
          } else if (item.children.length > 0) {
            const history = [...his]
            history.push(item)
            return getRoad(history, item.children, tabName)
          }
        })
      }

      if (layout_tabActive !== 'home') {
        getRoad([], layout_menuStore, layout_tabActive)
        this.defaultActive = defaultActive
        this.defaultOpeneds = defaultOpeneds
      }
    }
  }
}
</script>
