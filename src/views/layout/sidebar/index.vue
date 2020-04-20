<template>
  <aside :class="['aui-sidebar', `aui-sidebar--${layout_sidebar_layoutSkin}`]">
    <div class="aui-sidebar__inner">
      <el-menu
        :collapse="!!layout_sidebar_fold"
        :collapse-transition="false"
        :unique-opened="true"
        class="aui-sidebar__menu"
      >
        <sub-menu
          v-for="menu in layout_menuStore"
          :key="`${menu.id}`"
          :menu="menu"
        />
      </el-menu>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

import SubMenu from './sub-menu'
export default {
  components: {
    SubMenu
  },
  props: {},
  data() {
    return {
      menuActive: ''
    }
  },
  computed: {
    ...mapGetters([
      'layout_sidebar_layoutSkin',
      'layout_menuActive',
      'layout_menuStore',
      'layout_sidebar_fold'
    ])
  },
  watch: {
    layout_tabActive: 'storeUpdate'
  },
  created() {
    this.storeUpdate()
  },
  methods: {
    storeUpdate() {
      this.menuActive = this.layout_menuActive
    }
  }
}
</script>
