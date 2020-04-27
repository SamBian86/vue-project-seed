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
      /*
        由于目前实现的原则是尽可能少的发请求，所以拿列表页面举例，只有创建编辑成功的时候返回列表需要刷新列表数据，所以在跳转到table页面前，
        需要把table放入pageUpdateList中，在进入table页面的时候，会进行pageUpdateList检查，如果存在table，代表需要重新获取一次数据，
        获取成功以后需要将pageUpdateList中的table移除
      */
      pageUpdateList: [],
      include: [] // 用于keep-alive缓存
    }
  },
  computed: {},
  created() {
    // console.log('page default mixin created')
  },
  activated() {
    // console.log('page default mixin activated')
  },
  methods: {
    // 用于子页面切换其他页面
    pageSwitch(name, data = {}) {
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
    pageUpdateListAdd(componentNames) {
      const { pageUpdateList } = this
      const pages = Array.from(new Set([...pageUpdateList, ...componentNames]))
      this.pageUpdateList = pages
    },
    // 重新获取数据以后，删除pageUpdateList中componentNames的值
    pageUpdateListDelete(componentNames) {
      const { pageUpdateList } = this
      if (pageUpdateList.length !== 0) {
        componentNames.map(item => {
          const idx = pageUpdateList.findIndex(ite => item === ite)
          if (idx !== -1) {
            pageUpdateList.splice(idx, 1)
          }
        })
        console.log('剩余组件更新列表:' + pageUpdateList)
        this.pageUpdateList = pageUpdateList
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
