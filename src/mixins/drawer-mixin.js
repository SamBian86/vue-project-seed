// 这个mixin在yunlin-drawer的子组件中使用, 用于触发drawer-default-mixin中的方法
export default {
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log('drawer mixin created')
  },
  activated() {
    // console.log('drawer mixin activated')
  },
  methods: {
    // 用于子组件修改数据以后的数据合并
    $drawerClosed() {
      this.$emit('drawer-closed')
    }
  }
}
