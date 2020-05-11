export default {
  mixins: [],
  data() {
    return {
      componentNames: ['table'], // 用于检查pageMixin中pageUpdateList是否存在componentNames中存在的项，如果存在需要重新获取数据
      tableConfig: {
        tableName: 'yunlinTable', // 表格名称，请与父组件ref名称相同
        tableSearchSize: 'small',
        tableHead: [], // 表格表头
        tableType: '', // 表格类型
        rowKey: '', // 支持多层显示
        searchFillEmpty: false, // 是否填充查询条件为空
        hasPagination: true, // 是否分页组件
        lazy: false, // 是否懒加载子节点
        paginationConfig: {
          query: {
            page: 1, // 第几页
            limit: 10, // 每页几条
            order: '', // 排序方式 asc、desc
            orderField: '' // 排序字段
          },
          pageSizes: [10, 20, 50, 100],
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      },
      tableSearchParams: {}, // 查询条件
      tableHandle: {
        // 列表抽象方法，用获取列表接口方法覆盖
        list: { api: null, callback: null },
        // 删除抽象方法，如果有删除功能，使用删除接口方法覆盖
        delete: { api: null, callback: null },
        // 导出抽象方法，如果有导出功能，使用导出接口方法覆盖
        export: { api: null, callback: null },
        // 删除section选中项目
        deleteSection: { api: null, callback: null },
        // 懒加载列表数据
        lazy: { api: null, callback: null }
      },
      tableSections: [] // 如果tableType是section类型勾选的值将会保存在这
    }
  },
  computed: {},
  created() {
    // console.log('table default mixin created')
  },
  activated() {
    // 重新获取数据以后需要管理pagemixin中的pageUpdateList
    this.$pageCheckUpdateWhenActivated(() => {
      // console.log('重新获取table组件数据')
    })
    // console.log('table default mixin activated')
  },
  methods: {
    // 查询
    searchHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].searchHandle()
    },
    // 清除
    clearHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].clearHandle()
    },
    // 删除
    deleteHandle(item) {
      const { tableName } = this.tableConfig
      this.$refs[tableName].deleteHandle(item)
    },
    // 批量删除
    filterSectionData() {
      const { tableSections } = this
      return tableSections.map(item => {
        return item.id
      })
    },
    deleteSectionHandle() {
      const { tableName } = this.tableConfig
      const items = this.filterSectionData()
      this.$refs[tableName].deleteSectionHandle(items)
    },
    // 导出操作
    exportHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].exportHandle()
    },
    // 批量删除获取数据
    // 创建 提交成功后,那么下次componentNames对应的组件activated事件触发时会重新发请求获取数据
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    // 详情
    detailHandle(item, options = {}) {
      this.$pageSwitch('form', { ...item, pageType: 'detail', formDataUpdate: true, ...options })
    },

    // yunlin-table组件 事件监听器 --------------------------------------------------------
    // 接收section的值
    tableSelectionListener(values) {
      this.tableSections = values
    },
    // 接收节点异步加载处理
    tableLazyloadListener(fn, tree, treeNode, resolve) {
      // 此方法在需要时可以在业务页面重写
      fn({ pid: tree.id })
        .then(response => {
          resolve(response)
        })
        .catch(() => {
          Promise.reject('请配置列表懒加载方法')
        })
    }
  }
}
