import commonMixin from '@/mixins/common-mixin'
export default {
  mixins: [commonMixin],
  data() {
    return {
      tableConfig: {
        tableName: 'yunlinTable', // 表格名称，请与父组件ref名称相同
        tableHead: [], // 表格表头
        tableType: '', // 表格类型
        rowKey: '', // 支持多层访问
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
    console.log('table mixin created')
  },
  activated() {
    console.log('table mixin activated')
  },
  methods: {
    // 查询
    tableSearch() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].getListHandler()
    },
    // 创建
    handleCreate() {
      this.handleAny('form', { pageType: 'create' })
    },
    // 编辑
    handleEdit(item) {
      this.handleAny('form', { ...item, pageType: 'edit' })
    },
    // 详情
    handleDetail(item) {
      this.handleAny('form', { ...item, pageType: 'detail' })
    },
    // 打开任何组件 name 组件名称
    handleAny(name, data = {}) {
      this.$emit('page-change', name, data)
    },
    // 删除
    handleDelete(item) {
      const { tableName } = this.tableConfig
      this.$refs[tableName].handleDelete(item)
    }
  }
}
