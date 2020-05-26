<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      :config="tableConfig"
      :handle="tableHandle"
      :searchparams="tableSearchParams"
      v-bind="$attrs"
      @table-selection-listener="tableSelectionListener"
      @table-lazyload-listener="tableLazyloadListener"
      v-on="$listeners"
    >
      <!-- 查询区域 -->
      <template slot="search">
        <el-form
          class="table-search-form"
          :inline="true"
          :model="tableSearchParams"
          @keyup.enter.native="searchHandle"
        >
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:region:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>-->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:region:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:region:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:region:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
        </el-form>
      </template>
      <!-- 操作区域 -->
      <template slot="operate">
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              v-if="filterPermission('sys:region:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <el-button
              v-if="filterPermission('sys:region:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle(scope.row)"
            >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </template>
    </yunlin-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getRegionList, deleteRegionById } from '@/api/sys/region'

// 1.修改查询条件
// 2.修改授权标识
// 3.修改列表相关事件行为
// 4.配置接口
// 5.添加table项配置
// 6.放开pageSwitch的formDataUpdate配置用于检查详情接口
// 7.删除此处注释信息
export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {}
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission'])
  },
  activated() {
    // console.log('table activated')
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 配置查询区域i18n相关select数据
      // this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.hasPagination = false
      this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 区域名称
        { prop: 'name', label: 'region.name', width: '200' },
        // 区域标识
        { prop: 'id', label: 'region.id', width: '120', align: 'center' },
        // 区域类型
        {
          prop: 'treeLevel',
          label: 'region.type',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'treeLevel',
            type: 'text',
            tagConfig: [
              {
                value: 1,
                name: this.$t('region.province')
              },
              {
                value: 2,
                name: this.$t('region.city')
              },
              {
                value: 3,
                name: this.$t('region.county')
              }
            ]
          }
        },
        // 排序
        { prop: 'sort', label: 'region.sort', width: '120', align: 'center' },
        // 更新时间
        { prop: 'updateDate', label: 'region.updateDate', align: 'center' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        pid: 0
      }
      // 配置列表请求
      this.tableHandle.list.api = getRegionList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteRegionById
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      this.tableHandle.lazy.api = getRegionList
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteRegionById
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {},
    // 创建
    createHandle(options = { componentNames: ['yunlin-table', 'popover-tree'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table', 'popover-tree'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    }
  }
}
</script>
