<template>
  <el-drawer
    append-to-body
    :title="$attrs.config.title"
    :visible.sync="show"
    :modal-append-to-body="$attrs.config.modalAppendToBody"
    :custom-class="$attrs.config.customClass"
    :direction="$attrs.config.direction"
    :with-header="$attrs.config.withHeader"
    :wrapper-closable="$attrs.config.wrapperClosable"
    :destroy-on-close="$attrs.config.destroyOnClose"
    :size="$attrs.config.size"
    @closed="drawerClosed"
  >
    <slot></slot>
  </el-drawer>
</template>

<script>
import drawerMixin from '@/mixins/drawer-mixin'
export default {
  name: 'YunlinDrawer',
  components: {},
  mixins: [drawerMixin],
  props: {},
  data() {
    return { show: false }
  },
  computed: {},
  watch: {},
  breforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {
    drawerVisibleHandle(visible = true) {
      this.show = visible
    },
    drawerClosed() {
      this.$drawerClosed()
    }
  }
}
</script>

<style lang="scss">
.el-drawer__header {
  margin-bottom: 12px;
  padding: 10px 20px 0 10px;
  font-size: 16px;
  color: #333;
}
</style>
