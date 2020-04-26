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
      pageUpdateList: [], // 用于给各个组件检查是否需要重新获取数据
      include: [] // 用于keep-alive缓存
    }
  },
  computed: {},
  created() {
    // console.log('page mixin created')
  },
  activated() {
    // console.log('page mixin activated')
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
    // 用于当前页面数据变更后，进入下一个目标页面告知页面或组件是否需要在activated中重新获取数据
    pageUpdateQueue(pageUpdateNames) {
      const { pageUpdateList } = this
      const pages = Array.from(new Set([...pageUpdateList, ...pageUpdateNames]))
      this.pageUpdateList = pages
    },
    // 判断updateCheck标识是否在pageupdate中,用于form-mixin与table-mixin
    isInPageUpdateList(pageUpdateList, updateCheck) {
      let hasTarget = false

      // 如果pageUpdateList中存在updateCheck里面的值，代表当前组件中需要重新获取数据
      if (pageUpdateList.length !== 0) {
        pageUpdateList.map(item => {
          updateCheck.map(ite => {
            if (item === ite) {
              hasTarget = true
            }
          })
        })
      }
      // console.log('接下来以下列表会更新' + pageUpdateList)
      return hasTarget
    },
    // 重新获取数据以后，删除pageUpdateList中updateCheck的值
    pageDeleteQueue(updateCheck) {
      const { pageUpdateList } = this
      updateCheck.map(item => {
        const idx = pageUpdateList.findIndex(ite => item === ite)
        if (idx !== -1) {
          pageUpdateList.splice(idx, 1)
        }
      })
      // console.log('更新以后的更新列表' + pageUpdateList)
      this.pageUpdateList = pageUpdateList
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
