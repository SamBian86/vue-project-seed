import commonMixin from '@/mixins/common-mixin'
export default {
  mixins: [commonMixin],
  data() {
    return {
      componentNames: ['table'], // 用于检查pageMixin中pageUpdateList是否存在componentNames中存在的项，如果存在需要重新获取数据
      tableConfig: {
        tableName: 'yunlinTable', // 表格名称，请与父组件ref名称相同
        tableSearchSize: 'small',
        tableHead: [], // 表格表头
        tableHeadReadOnly: [], // 初始表单项
        tableType: '', // 表格类型
        tableDataFrom: null,
        rowKey: '', // 支持多层显示
        searchFillEmpty: false, // 是否填充查询条件为空
        hasPagination: true, // 是否分页组件
        lazy: false, // 是否懒加载子节点
        highlightCurrentRow: false, // 是否开启单选
        defaultExpandAll: false, // 默认是否展开所有项
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
      tableColumnAction: [
        // {
        //   searchParam: 'contractStatus', // 被检查的查询字段
        //   exclude: [
        //     { value: 0, props: ['currentExaminer'] }, // 当前查询字段
        //     { value: 1, props: [] },
        //     { value: 2, props: ['currentExaminer'] },
        //     { value: 3, props: ['currentExaminer'] }
        //   ]
        // }
      ], // 不同查询条件列显示控制
      tableSections: [], // 如果tableType是section类型勾选的值将会保存在这
      tableCurrent: null // 如果highlightCurrentRow是true，开启单选，选中会将值保存在此处
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
    // 渲染完列表执行的方法
    afterGenerateTable() {},
    generateTable() {
      const { tableSearchParams, tableColumnAction } = this
      const { tableHeadReadOnly } = this.tableConfig
      const generateProps = [] // 存放需要生成的props
      let excludeProps = []

      tableColumnAction.map(ite => {
        const value = tableSearchParams[ite.searchParam]
        const exclude = ite.exclude.find(e => e.value === value)
        excludeProps = excludeProps.concat(exclude.props)
      })
      excludeProps = Array.from(new Set([...excludeProps]))
      tableHeadReadOnly.forEach(item => {
        if (excludeProps.includes(item.prop)) {
          item.show = false
        } else {
          item.show = true
        }
        generateProps.push(item)
      })
      // console.log(generateProps)
      // 开始渲染页面
      this.tableConfig.tableHead = generateProps
      this.afterGenerateTable()
    },
    // 时间控件联动处理
    dateHandle(param, value) {
      this.$set(this.tableSearchParams, param, '')
      if (!value) {
        this[`${param}PickerOptions`] = {}
      } else {
        let _value = value.replace('-', '/')
        if (!/:/.test(_value)) {
          _value += ' 00:00:00'
        }
        this[`${param}PickerOptions`] = {
          disabledDate(time) {
            return time.getTime() < new Date(_value)
          }
        }
      }
      this.searchHandle()
      // console.log(param, value)
    },
    generateColumn() {
      const { tableColumnAction } = this
      if (tableColumnAction.length !== 0) {
        this.generateTable()
      }
    },
    getTableData() {
      const { tableName } = this.tableConfig
      return this.$refs[tableName].getTableData()
    },
    getResponseData() {
      const { tableName } = this.tableConfig
      return this.$refs[tableName].getResponseData()
    },
    // 查询
    searchHandle() {
      this.generateColumn()
      const { tableName } = this.tableConfig
      this.$refs[tableName].searchHandle()
    },
    // 清除
    clearHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].clearHandle()
    },
    // 清除单选
    clearCurrentChangeHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].tableCleanCurrentChangeHandle()
    },
    // 清除多选
    clearSelectionChangeHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].tableCleanSelectionChangeHandle()
    },
    // 下载功能
    downloadHandle(opts) {
      const { request } = opts
      this.$confirm(`${this.$t('confirm')}${this.$t(opts.i18nRequestMessage)}？`, this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          if (request) {
            request()(opts.data)
          }
        })
        .catch(() => {})
    },
    // 重置
    searchResetHandle() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].searchResetHandle()
    },
    // 删除
    deleteHandle(item) {
      const { tableName } = this.tableConfig
      this.$refs[tableName].deleteHandle(item)
    },
    // 自定义单个操作
    customHandle(opts) {
      const { tableName } = this.tableConfig
      this.$refs[tableName].customHandle(opts)
    },
    // 批量删除
    filterSectionData() {
      const { tableSections } = this
      return tableSections.map(item => {
        return item.id
      })
    },
    // 批量删除操作
    deleteSectionHandle() {
      const { tableName, tableType } = this.tableConfig
      const items = this.filterSectionData()
      if (tableType === 'selection' && items.length === 0) {
        this.$message({
          message: this.$t('prompt.deleteBatch'),
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.$refs[tableName].deleteSectionHandle(items)
    },
    // 批量执行操作
    customSectionHandle(opts) {
      const { tableName, tableType } = this.tableConfig
      const items = this.filterSectionData()
      if (tableType === 'selection' && items.length === 0) {
        this.$message({
          message: this.$t(opts.i18nMessage),
          type: 'warning',
          duration: 2000
        })
        return false
      }
      opts.data = items
      this.$refs[tableName].customSectionHandle(opts)
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
    },
    // 合并选择组件传递过来的查询数据
    tableParamsMerge(params) {
      Object.keys(params).map(item => {
        this.$set(this.tableSearchParams, item, params[item])
      })
      console.log(this.tableSearchParams)
      this.searchHandle()
    },
    // 单选选中数据处理
    tableCurrentChangeListener(value) {
      this.tableCurrent = value
    }
  }
}
