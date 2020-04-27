export default {
  mixins: [],
  data() {
    return {
      componentNames: ['table'], // 用于检查pageMixin中pageUpdateList是否存在componentNames中存在的项，如果存在需要重新获取数据
      tableConfig: {
        tableName: 'yunlinTable', // 表格名称，请与父组件ref名称相同
        tableHead: [], // 表格表头
        tableType: '', // 表格类型
        rowKey: '', // 支持多层显示
        searchParams: {} // 查询条件
      },
      tableHandle: {
        // 列表抽象方法，用获取列表接口方法覆盖
        getList: null,
        // 删除抽象方法，如果有删除功能，使用删除接口方法覆盖
        delete: null
      }
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
    // 创建 提交成功后,那么下次componentNames对应的组件activated事件触发时会重新发请求获取数据
    handleCreate(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    handleEdit(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    // 详情
    handleDetail(item, options = {}) {
      this.$pageSwitch('form', { ...item, pageType: 'detail', formDataUpdate: true, ...options })
    },
    // 删除
    handleDelete(item) {
      const { tableName } = this.tableConfig
      this.$refs[tableName].handleDelete(item)
    }
  }
}
