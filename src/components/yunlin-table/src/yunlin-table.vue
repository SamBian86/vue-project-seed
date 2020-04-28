<template>
  <div>
    <!-- 查询区域插槽 -->
    <slot name="search" />

    <el-table
      v-loading="loading"
      :data="tableData"
      :row-key="$attrs.config.rowKey"
      border
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        v-if="$attrs.config.tableType === 'selection'"
        type="selection"
        header-align="center"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        v-for="item in $attrs.config.tableHead"
        :key="item.id"
        :prop="item.prop"
        :label="$t(item.label)"
        :align="item.align"
        :header-align="item.headerAlign"
        :fixed="item.fixed"
        :width="item.width"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.showOverFlowTooltip === null ? true : item.showOverFlowTooltip"
      >
        <!--
          item.component 是否使用table专用组件 /components/yunlin-table/tool
        -->
        <template slot-scope="scope">
          <component
            :is="ToolComponents[item.component]"
            v-if="item.component"
            :config="item.componentConfig"
            :column-data="{ ...scope.row }"
          ></component>
          <span
            v-else
            v-html="item.preHandle ? item.preHandle(scope.row[item.prop], scope.row) : scope.row[item.prop]"
          ></span>
        </template>
      </el-table-column>

      <!-- 操作区域插槽 -->
      <slot name="operate" />
    </el-table>
    <el-pagination
      v-if="$attrs.config.hasPagination"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :layout="pagination.layout"
      :total="pagination.total"
      @size-change="PaginationSizeChangeHandle"
      @current-change="PaginationCurrentChangeHandle"
    ></el-pagination>
  </div>
</template>

<script>
import pageMixin from '@/mixins/page-mixin'
import tableMixin from '@/mixins/table-mixin'
import ToolComponents from '@/components/yunlin-table/tool'
export default {
  name: 'YunlinTable',
  components: {},
  mixins: [pageMixin, tableMixin],
  props: {},
  data() {
    return {
      componentNames: ['yunlin-table'],
      ToolComponents, // 工具组件
      loading: true,
      reload: true, // 重新获取数据
      query: {
        // 分页查询条件
        page: 1, // 第几页
        limit: 10, // 每页几条
        order: '', // 排序方式 asc、desc
        orderField: '' // 排序字段
      },
      pagination: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [],
        layout: ''
      },
      tableData: [] // 列表数据
    }
  },
  computed: {
    // 从父组件的table-mixin的tableHandle中获取方法
    getListBridge() {
      const { api } = this.$attrs.handle.list
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖获取列表方法')
        })
      )
    },
    deleteBridge() {
      const { api } = this.$attrs.handle.delete
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖删除方法')
        })
      )
    },
    deleteSectionBridge() {
      const { api } = this.$attrs.handle.deleteSection
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖批量删除方法')
        })
      )
    }
  },
  watch: {},
  breforeCreate() {},
  created() {
    // console.log('table component created')
    this.generatePaginationConfig()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {
    const { reload } = this
    if (reload) {
      this.searchHandle()
    }

    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.searchHandle()
    })
    // console.log('table component activated')
  },
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {
    searchHandle() {
      // 获取列表数据
      const { query } = this
      const { searchParams, hasPagination } = this.$attrs.config
      const _query = {}
      const _searchParams = {}
      let params = {}

      // 组装查询条件
      Object.keys(query).map(item => {
        if (query[item] !== '') {
          _query[item] = query[item]
        }
      })
      Object.keys(searchParams).map(item => {
        if (searchParams[item] !== '') {
          _searchParams[item] = searchParams[item]
        }
      })

      if (hasPagination) {
        params = { ..._query, ..._searchParams }
      }

      // 检查是否覆盖获取列表方法
      this.getListBridge({ ...params })
        .then(response => {
          if (hasPagination) {
            this.tableData = response.list
            this.pagination.total = response.total
          } else {
            this.tableData = response
          }

          this.loading = false
          this.reload = false // 用于控制在activated钩子上是否获取数据
        })
        .catch(message => {
          console.log(message)
        })
    },
    // 重置查询条件
    searchResetHandle() {
      this.searchHandle()
    },
    // 触发删除
    deleteHandle(item) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteBridge(item).then(response => {
            this.searchHandle()
          })
        })
        .catch(() => {})
    },
    // 批量操作
    deleteSectionHandle(items) {
      this.$confirm(`确认删除这${items.length}项目？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteSectionBridge(items).then(response => {
            this.searchHandle()
          })
        })
        .catch(() => {})
    },
    // 初始化Pagination配置
    generatePaginationConfig() {
      const { paginationConfig } = this.$attrs.config
      const { query } = this
      const _query = { ...query, ...paginationConfig.query }
      let pageSizes = [...paginationConfig.pageSizes]

      // 如果传入一个每页个数不再pageSizes中，则动态加入
      if (!pageSizes.includes(_query.limit)) {
        pageSizes.push(_query.limit)
        pageSizes = pageSizes.sort((a, b) => a - b)
        paginationConfig.pageSizes = pageSizes
      }

      this.pagination.currentPage = _query.page
      this.pagination.layout = paginationConfig.layout
      this.pagination.pageSizes = pageSizes
      this.pagination.pageSize = _query.limit
      this.query = _query
    },
    // Pagination pageSize改变监听
    PaginationSizeChangeHandle(value) {
      console.log(value)
    },
    // Pagination currentPage 改变监听
    PaginationCurrentChangeHandle(value) {
      this.query.page = value
      this.pagination.currentPage = value
      this.searchHandle()
    },
    // section-change处理
    selectionChangeHandle(values) {
      this.$tableSelectionListener(values)
    }
  }
}
</script>
