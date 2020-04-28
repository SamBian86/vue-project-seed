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
    // 判断是不是一个promise方法
    isPromise(obj) {
      return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
    },
    // 判断是不是某种页面
    containsPageType(types) {
      const { pageType } = this.$attrs.page_info.data
      return types.includes(pageType)
    }
  }
}
