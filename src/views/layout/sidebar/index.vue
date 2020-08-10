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
      // console.log(layout_menuActive)
      if (layout_tabActive !== 'home') {
        const defaultOpeneds = []
        layout_menuStore.map((item, index) => {
          if (item.children.length !== 0) {
            item.children.map((ite) => {
              const _url = (ite.url || '').replace('/', '_')
              if (_url === layout_tabActive && _url !== '') {
                defaultOpeneds.push(item.id)
                this.defaultActive = ite.id
              } else if (ite.url === '' && ite.children.length !== 0) {
                ite.children.map((i) => {
                  const _url = (i.url || '').replace('/', '_')
                  if (_url === layout_tabActive && _url !== '') {
                    defaultOpeneds.push(item.id)
                    defaultOpeneds.push(ite.id)
                    this.defaultActive = i.id
                  }
                })
              } else {
                // console.log('完成') 1290114382608900097 "1290116159274131458" 1290117086865432577
              }
            })
          }
        })
        this.defaultOpeneds = defaultOpeneds
      }
    }
  }
}
</script>
