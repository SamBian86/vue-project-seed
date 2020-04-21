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
    console.log(this.$attrs.config.pagination)
    console.log('table component activated')
  },
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {}
}
</script>
