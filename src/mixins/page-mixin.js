export default {
  data() {
    return {
      pageComponents: [
        // {
        //   name: 'table', // 组件标识
        //   component: table
        // }
      ], // 用于分割当前模块存在的页面
      pageInfo: {}, // 当前模块信息
      include: [] // 用于keep-alive缓存
    }
  },
  computed: {},
  created() {
    console.log('page mixin created')
  },
  activated() {
    console.log('page mixin activated')
  },
  methods: {
    // 用于子页面切换其他页面
    pageChange(name, data = {}) {
      const { pageComponents } = this
      const pageInfo = pageComponents.filter(item => {
        return item.name === name
      })

      if (pageInfo.length === 1) {
        this.pageInfo = pageInfo[0]
        this.pageInfo.data = data
      } else {
        Promise.reject(`请检查是否有${name}组件`)
      }
    },
    // 生成include
    generateInclude() {
      const { pageComponents } = this
      const include = pageComponents.map(item => {
        return item.name.toUpperCase()
      })
      this.include = include
    }
  }
}
