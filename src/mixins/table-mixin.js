// 这个mixin在table.vue的子组件中使用, 用于触发table-default-mixin中的方法
export default {
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log('table mixin created')
  },
  activated() {
    // console.log('table mixin activated')
  },
  methods: {
    $tableSelectionListener(values) {
      this.$emit('table-selection-listener', values)
    }
  }
}
