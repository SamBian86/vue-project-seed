<template>
  <aside :class="['aui-sidebar', `aui-sidebar--${layout_sidebar_layoutSkin}`]">
    <div class="aui-sidebar__inner">
      <el-menu
        :collapse="!!layout_sidebar_fold"
        :collapse-transition="false"
        :unique-opened="true"
        class="aui-sidebar__menu"
        :default-openeds="defaultOpeneds"
      >
        <sub-menu
          v-for="menu in layout_menuStore"
          :key="`${menu.id}`"
          :menu="menu"
          :data-id="menu.id"
          :class="defaultOpeneds.includes(menu.id) ? 'is-active' : ''"
        />
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
      defaultOpeneds: []
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
      const { layout_menuStore, layout_menuActive } = this
      this.defaultOpeneds = [layout_menuStore[layout_menuActive]['id']]
    }
  }
}
</script>
