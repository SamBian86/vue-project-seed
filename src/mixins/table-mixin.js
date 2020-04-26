import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
export default {
  mixins: [commonMixin, pageMixin],
  data() {
    return {
      tableConfig: {
        tableName: 'yunlinTable', // 表格名称，请与父组件ref名称相同
        tableHead: [], // 表格表头
        tableType: '', // 表格类型
        rowKey: '', // 支持多层访问
        searchParams: {}, // 查询条件
        updateCheck: ['table'] // 用于检查pageMixin中pageUpdateList是否存在updateCheck中存在的项，如果存在需要重新获取数据
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
    // console.log('table mixin created')
  },
  activated() {
    const { updateCheck } = this.tableConfig
    const { pageupdate } = this.$attrs

    // 重新获取数据以后需要管理pagemixin中的pageUpdateList
    if (this.isInPageUpdateList(pageupdate, updateCheck)) {
      this.$emit('page-queue-delete', updateCheck)
    }
    // console.log('table mixin activated')
  },
  methods: {
    // 查询
    tableSearch() {
      const { tableName } = this.tableConfig
      this.$refs[tableName].getListHandler()
    },
    // 创建 如果提交成功 那么在返回pageUpdateNames对应的页面时，会重新获取数据
    handleCreate(options = { pageUpdateNames: ['table'] }) {
      this.handleAny('form', { pageType: 'create', ...options })
    },
    // 编辑
    handleEdit(item, options = { pageUpdateNames: ['table'] }) {
      this.handleAny('form', { ...item, pageType: 'edit', ...options })
    },
    // 详情
    handleDetail(item, options = {}) {
      this.handleAny('form', { ...item, pageType: 'detail', ...options })
    },
    // 删除
    handleDelete(item) {
      const { tableName } = this.tableConfig
      this.$refs[tableName].handleDelete(item)
    }
  }
}
