export default {
  data() {
    return {
      tableConfig: {
        tableName: 'yunlinTable', // 表格名称，请与父组件ref名称相同
        tableHead: [], // 表格表头
        tableType: '', // 表格类型
        searchParams: {} // 查询条件
      },
      tableHandle: {
        getList: () => {
          console.log('请覆盖获取列表方法')
        },
        deleteItem: () => {
          console.log('请覆盖删除方法')
        }
      }
    }
  },
  computed: {},
  created() {
    console.log('table mixin created')
  },
  activated() {
    console.log('table mixin activated')
    const { _reload } = this
    if (_reload) {
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
