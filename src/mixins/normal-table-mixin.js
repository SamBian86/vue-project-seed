export default {
  data() {
    return {
      tableConfig: {
        reload: true, // 重新获取数据
        loading: false,
        searchParams: {}, // 查询条件
        pagination: {
          page: 1, // 第几页
          limit: 10, // 每页几条
          order: '', // 排序方式 asc、desc
          orderField: '' // 排序字段
        } // 分页查询条件
      },
      tableData: [],
      tableAction: {
        getList: () => {
          console.log('请覆盖获取列表方法')
        },
        deleteItem: () => {
          console.log('请覆盖删除方法')
        }
      }
    }
  },
  computed: {
    getListBridge() {
      return this.tableAction.getList
    },
    deleteItemBridge() {
      return this.tableAction.deleteItem
    }
  },
  created() {
    console.log('table mixin created')
  },
  activated() {
    console.log('table mixin activated')
    const { reload } = this.tableConfig
    if (reload) {
      this.init()
    }
  },
  methods: {
    init() {
      this.getListHandler()
    },
    getListHandler() {
      // 获取列表数据
      const { pagination, searchParams } = this.tableConfig
      const _pagination = {}
      const _searchParams = {}
      Object.keys(pagination).map(item => {
        if (pagination[item] !== '') {
          _pagination[item] = pagination[item]
        }
      })
      Object.keys(searchParams).map(item => {
        if (searchParams[item] !== '') {
          _searchParams[item] = searchParams[item]
        }
      })
      this.getListBridge({ ..._pagination, ..._searchParams }).then(response => {
        this.$set(this, 'tableData', response)
      })
    },
    // 触发查询
    handleSearch() {
      this.getListHandler()
    },
    // 重置查询条件
    handleSearchReset() {
      this.getListHandler()
    }
  }
}
