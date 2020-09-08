<template>
  <div>
    <!-- 查询区域插槽 -->
    <slot name="search" />
    <slot name="content" />
    <el-table
      :ref="$attrs.config.tableName"
      v-loading="loading"
      :data="tableData"
      :row-key="$attrs.config.rowKey"
      :lazy="$attrs.config.lazy"
      :load="lazyLoadHandle"
      :highlight-current-row="$attrs.config.highlightCurrentRow"
      :default-expand-all="$attrs.config.defaultExpandAll"
      border
      style="width: 100%;"
      @selection-change="tableSelectionChangeHandle"
      @sort-change="tableSortChangeHandle"
      @current-change="tableCurrentChangeHandle"
    >
      <el-table-column
        v-if="$attrs.config.tableType === 'index'"
        type="index"
        header-align="center"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        v-if="$attrs.config.tableType === 'selection'"
        type="selection"
        header-align="center"
        align="center"
        width="50"
      ></el-table-column>
      <template v-for="(item, index) in $attrs.config.tableHead">
        <el-table-column
          v-if="item.show !== false"
          :key="index"
          :prop="item.prop"
          :label="$t(item.label)"
          :align="item.align"
          :header-align="item.headerAlign"
          :fixed="item.fixed"
          :width="item.width"
          :min-width="item.minWidth"
          :sortable="item.sortable === null || item.sortable === false ? false : item.sortable"
          :show-overflow-tooltip="item.showOverFlowTooltip === undefined ? true : item.showOverFlowTooltip"
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
              @click="item.clickHandle ? item.clickHandle(scope.row) : () => {}"
              v-html="item.preHandle ? item.preHandle(scope.row[item.prop], scope.row) : scope.row[item.prop]"
            ></span>
          </template>
        </el-table-column>
      </template>

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
      @size-change="paginationSizeChangeHandle"
      @current-change="paginationCurrentChangeHandle"
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
      responseData: null,
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
    exportBridge() {
      const { api } = this.$attrs.handle.export
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖导出方法')
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
    },
    lazyloadBridge() {
      const { api } = this.$attrs.handle.lazy
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖列表懒加载方法')
        })
      )
    }
  },
  watch: {},
  breforeCreate() {},
  created() {
    this.generatePaginationConfig()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.searchHandle()
    })
  },
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
    getTableData() {
      return this.tableData
    },
    getResponseData() {
      return this.responseData
    },
    searchHandle() {
      // 获取列表数据
      const { query } = this
      const { callback } = this.$attrs.handle.list
      const { hasPagination, searchFillEmpty, tableDataFrom } = this.$attrs.config
      const searchParams = this.$attrs.searchparams

      const _query = {}
      const _searchParams = {}
      let params = {}

      // 组装查询条件
      Object.keys(query).map((item) => {
        if (searchFillEmpty) {
          _query[item] = query[item] !== '' ? query[item] : ''
        } else {
          if (query[item] !== '') {
            _query[item] = query[item]
          }
        }
      })
      Object.keys(searchParams).map((item) => {
        if (searchFillEmpty) {
          _searchParams[item] = searchParams[item] !== '' ? searchParams[item] : ''
        } else {
          if (searchParams[item] !== '') {
            _searchParams[item] = searchParams[item]
          }
        }
      })

      if (hasPagination) {
        params = { ..._query, ..._searchParams }
      } else {
        params = { ..._searchParams }
      }

      // 检查是否覆盖获取列表方法
      this.getListBridge({ ...params })
        .then((response) => {
          if (hasPagination) {
            if (tableDataFrom) {
              this.tableData = tableDataFrom(response)
            } else {
              this.tableData = response.list
            }
            this.pagination.total = response.total
          } else {
            if (tableDataFrom) {
              this.tableData = tableDataFrom(response)
            } else {
              this.tableData = response
            }
          }

          this.responseData = response
          this.loading = false
          this.reload = false // 用于控制在activated钩子上是否获取数据
          if (callback) {
            callback()
          }
        })
        .catch((message) => {
          // console.log(message)
        })
    },
    // 清除查询条件
    clearHandle() {
      this.query.page = 1
      this.pagination.currentPage = 1
      this.searchHandle()
    },
    // 重置查询条件
    searchResetHandle() {
      this.query.page = 1
      this.searchHandle()
    },
    // 触发删除
    deleteHandle(item) {
      const { callback } = this.$attrs.handle.delete
      this.$confirm(
        item.i18nMessage ? `${this.$t(item.i18nMessage)}` : `${this.$t('confirm')}${this.$t('delete')}!`,
        this.$t('prompt.title'),
        {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteBridge(item)
            .then((response) => {
              if (callback) {
                callback()
              }
              this.$message({
                message: this.$t('prompt.success'),
                type: 'success',
                duration: 2000
              })
              this.searchHandle()
            })
            .catch((message) => {
              this.$message({
                message,
                type: 'error',
                duration: 2000
              })
            })
        })
        .catch(() => {})
    },
    // 自定义单个操作
    customHandle(opts) {
      // opts
      // {
      //    data: data, // 需要提交的数据
      //    i18nRequestMessage: 'schedule.pauseBatch', // 提交前提示信息
      //    i18nRequestCustomMessage: 'schedule.pauseBatch', // 提交前提示信息
      //    request: pauseJobSchedule // 处理接口方法
      // }
      const { request } = opts
      if (!opts.i18nRequestMessage && !opts.i18nRequestCustomMessage) {
        request()(opts.data)
        return
      }

      this.$confirm(
        opts.i18nRequestCustomMessage
          ? `${this.$t(opts.i18nRequestCustomMessage)}`
          : `${this.$t('confirm')}${this.$t(opts.i18nRequestMessage)}？`,
        this.$t('prompt.title'),
        {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          request()(opts.data)
            .then((response) => {
              this.$message({
                message: this.$t('prompt.success'),
                type: 'success',
                duration: 2000
              })
              this.searchHandle()
              if (opts.successCallBack) {
                opts.successCallBack()
              }
            })
            .catch((message) => {
              this.$message({
                message,
                type: 'error',
                duration: 2000
              })
            })
        })
        .catch(() => {})
    },
    // 触发导出
    exportHandle() {
      const searchParams = this.$attrs.searchparams
      this.exportBridge(searchParams)
    },
    // 批量删除操作
    deleteSectionHandle(items) {
      const { callback } = this.$attrs.handle.delete
      this.$confirm(`${this.$t('confirm')}${this.$t('delete')}`, this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          this.deleteSectionBridge(items)
            .then((response) => {
              if (callback) {
                callback()
              }
              this.$message({
                message: this.$t('prompt.success'),
                type: 'success',
                duration: 2000
              })
              this.searchHandle()
            })
            .catch((message) => {
              this.$message({
                message,
                type: 'error',
                duration: 2000
              })
            })
        })
        .catch(() => {})
    },
    // 批量执行
    customSectionHandle(opts) {
      // opts
      // {
      //    i18nMessage: 'prompt.customBatch', // 是否选中处理项提示信息
      //    i18nRequestMessage: 'schedule.pauseBatch', // 提交前提示信息
      //    request: pauseJobSchedule // 处理接口方法
      // }
      const { request } = opts
      this.$confirm(`${this.$t('confirm')}${this.$t(opts.i18nRequestMessage)}?`, this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          request()(opts.data)
            .then((response) => {
              this.$message({
                message: this.$t('prompt.success'),
                type: 'success',
                duration: 2000
              })
              this.searchHandle()
            })
            .catch((message) => {
              this.$message({
                message,
                type: 'error',
                duration: 2000
              })
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
    paginationSizeChangeHandle(value) {
      this.query.limit = value
      this.pagination.pageSize = value
      this.searchHandle()
    },
    // Pagination currentPage 改变监听
    paginationCurrentChangeHandle(value) {
      this.query.page = value
      this.pagination.currentPage = value
      this.searchHandle()
    },
    // section-change处理
    tableSelectionChangeHandle(values) {
      this.$tableSelectionListener(values)
    },
    // sort-change处理
    tableSortChangeHandle({ column, prop, order }) {
      const { sortable } = column
      let orderField = sortable

      if (sortable === true) {
        orderField = prop
          .split(/([A-Z])/g)
          .map((item) => (item !== item.toLowerCase() ? '_' + item.toLowerCase() : item))
          .join('')
      }
      // console.log(column, prop, order)
      if (order === 'descending') {
        this.query.order = 'desc'
        this.query.orderField = orderField
      } else if (order === 'ascending') {
        this.query.order = 'asc'
        this.query.orderField = orderField
      } else {
        this.query.order = ''
        this.query.orderField = ''
      }
      this.searchHandle()
    },
    // 单选选中处理
    tableCurrentChangeHandle(val) {
      this.$tableCurrentChangeListener(val)
    },
    // 取消选中处理 单选
    tableCleanCurrentChangeHandle() {
      const { tableName } = this.$attrs.config
      this.$refs[tableName].setCurrentRow()
      this.$tableCurrentChangeListener(null)
    },
    // 取消选中处理 多选
    tableCleanSelectionChangeHandle() {
      const { tableName } = this.$attrs.config
      this.$refs[tableName].clearSelection()
    },
    // 懒加载方法
    lazyLoadHandle(tree, treeNode, resolve) {
      const { lazy } = this.$attrs.config
      if (!lazy) {
        Promise.reject('请先配置列表懒加载')
      } else {
        this.$tableLazyloadListener(this.lazyloadBridge, tree, treeNode, resolve)
      }
    }
  }
}
</script>
