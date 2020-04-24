export default {
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log('common mixin created')
  },
  activated() {
    // console.log('common mixin activated')
  },
  methods: {
    // 打开任何组件 name 组件名称
    handleAny(name, data = {}) {
      this.$emit('page-change', name, data)
    },
    // 判断是不是一个promise方法
    isPromise(obj) {
      return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
    }
  }
}
