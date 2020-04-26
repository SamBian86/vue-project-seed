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
    >
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
          item.component 是否使用table专用组件 /components/yunlin-table/tool 中
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
  </div>
</template>

<script>
import pageMixin from '@/mixins/page-mixin'
import ToolComponents from '@/components/yunlin-table/tool'
export default {
  name: 'YunlinTable',
  components: {},
  mixins: [pageMixin],
  props: {},
  data() {
    return {
      ToolComponents, // 工具组件
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
    // 从父组件的table-mixin的tableHandle中获取方法
    getListBridge() {
      return (
        this.$attrs.handle.getList ||
        (() => {
          return Promise.reject('请覆盖获取列表方法')
        })
      )
    },
    deleteBridge() {
      return (
        this.$attrs.handle.delete ||
        (() => {
          return Promise.reject('请覆盖删除方法')
        })
      )
    }
  },
  watch: {},
  breforeCreate() {},
  created() {
    // console.log('table component created')
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {
    const { reload } = this
    const { updateCheck } = this.$attrs.config
    const { pageupdate } = this.$attrs
    if (reload) {
      this.getListHandler()
    }

    // 检查是否需要重新获取数据
    if (this.isInPageUpdateList(pageupdate, updateCheck)) {
      this.getListHandler()
      console.log('重新获取列表数据')
    }
    // console.log('table component activated')
  },
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {
    getListHandler() {
      // 获取列表数据
      const { pagination } = this.config
      const { searchParams } = this.$attrs.config
      const _pagination = {}
      const _searchParams = {}

      // 组装查询条件
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

      // 检查是否覆盖获取列表方法
      this.getListBridge({ ..._pagination, ..._searchParams })
        .then(response => {
          this.$set(this, 'tableData', response)
          this.$set(this, 'loading', false)
          this.$set(this, 'reload', false) // 用于控制在activated钩子上是否获取数据
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
    },
    // 触发删除
    handleDelete(item) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteBridge(item).then(response => {
            this.handleSearch()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
