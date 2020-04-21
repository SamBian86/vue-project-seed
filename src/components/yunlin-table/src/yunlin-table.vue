<template>
  <div>
    <!-- 查询区域 -->
    <slot name="search" />
    <el-table v-loading="loading" :data="tableData" row-key="id" border style="width: 100%;"> </el-table>
  </div>
</template>

<script>
export default {
  name: 'YunlinTable',
  props: {},
  data() {
    return {
      loading: true,
      reload: true, // 重新获取数据
      config: {
        pagination: {
          page: 1, // 第几页
          limit: 10, // 每页几条
          order: '', // 排序方式 asc、desc
          orderField: '' // 排序字段
        } // 分页查询条件
      },
      tableData: [] // 列表数据
    }
  },
  computed: {
    getListBridge() {
      return this.$attrs.handle.getList
    },
    deleteItemBridge() {
      return this.$attrs.handle.deleteItem
    }
  },
  watch: {},
  breforeCreate() {},
  created() {
    console.log('table component created')
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {
    console.log(this.$attrs.config.tableName)
    const { reload } = this
    if (reload) {
      this.init()
    }
    console.log('table component activated')
  },
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {
    init() {
      this.getListHandler()
    },
    getListHandler() {
      // 获取列表数据
      const { pagination } = this.config
      const { searchParams } = this.$attrs.config
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
      this.getListBridge({ ..._pagination, ..._searchParams })
        .then(response => {
          this.$set(this, 'tableData', response)
        })
        .catch(message => {
          console.log(message)
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
</script>
