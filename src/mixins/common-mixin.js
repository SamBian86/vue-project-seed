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
      const pageInfoPageType = (this.$attrs.page_info && this.$attrs.page_info.data && this.$attrs.page_info.data.pageType) || ''
      const pageDrawerPageType =
        (this.$attrs.page_drawer_data && this.$attrs.page_drawer_data.data && this.$attrs.page_drawer_data.data.pageType) || ''
      const pageType = this.pageType || ''
      return types.includes(pageDrawerPageType || pageInfoPageType || pageType)
    },
    // 转换字典数据使其可以用于组件
    dictDataForComponent(type, format) {
      const dicts = this.getDictByType(type)
      const newDicts = []
      let obj = {}
      dicts.map(item => {
        obj = {}
        Object.keys(format).map(ite => {
          obj[format[ite]] = item[ite]
          obj.i18n = false
        })
        newDicts.push(obj)
      })
      // console.log(newDicts)
      return newDicts
    }
  }
}
