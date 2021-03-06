<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      class="table-no-padding"
      :config="tableConfig"
      :handle="tableHandle"
      :searchparams="tableSearchParams"
      v-bind="$attrs"
      @table-selection-listener="tableSelectionListener"
      @table-lazyload-listener="tableLazyloadListener"
      @table-current-change-listener="tableCurrentChangeListener"
      v-on="$listeners"
    >
      <!-- 查询区域 -->
      <template slot="search">
        <el-form class="table-search-form" :inline="true" :model="tableSearchParams" @keyup.enter.native="searchHandle">
          <!-- 查询 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:cost:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>-->
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:cost:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item>
          <!-- 下载模板 -->
          <el-form-item>
            <el-button
              type="success"
              :size="tableConfig.tableSearchSize"
              @click="
                downloadHandle({
                  i18nRequestMessage: 'downloadTemp',
                  request: downloadEngineeringCostType,
                  data: { excelType: 2 }
                })
              "
            >
              {{ $t('downloadTemp') }}
            </el-button>
          </el-form-item>
          <!-- 导入 -->
          <el-form-item>
            <button-import v-if="filterPermission('engineering:cost:import')" :config="importConfig"></button-import>
          </el-form-item>
          <!-- 清空选中 -->
          <el-form-item>
            <el-button v-if="tableCurrent !== null" :size="tableConfig.tableSearchSize" @click="clearCurrentChangeHandle()">
              {{ $t('clearCurrent') }}
            </el-button>
          </el-form-item>
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:cost:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:cost:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:cost:xxx')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="customSectionHandle({
                i18nMessage: 'prompt.customBatch',
                i18nRequestMessage: 'bbb.bbb',
                request: CCC
              })"
            >{{ $t('ddd.ddd') }}</el-button>
          </el-form-item>-->
        </el-form>
      </template>
      <!-- 操作区域 -->
      <template slot="operate">
        <el-table-column :label="$t('handle')" align="center" header-align="center" fixed="right" width="100">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('engineering:cost:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:cost:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >
              {{ $t('delete') }}
            </el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:cost:xxx')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: '国际化',
                request: null
              })"
            >{{ $t('ddd.ddd') }}</el-button>-->
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
import {
  getEngineeringCostTypeTree,
  deleteEngineeringCostType,
  downloadEngineeringCostType,
  importEngineeringCostType
} from '@/api/engineering/costType'
import buttonImport from '@/components/yunlin-table/button/import'

export default {
  name: 'Tabel',
  components: { buttonImport },
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {}
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
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
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.hasPagination = false
      this.tableConfig.highlightCurrentRow = true
      this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'index'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 科目编号
        { prop: 'costTypeCode', label: 'cost.costTypeCode', width: '160' },
        // 科目名称
        { prop: 'costTypeName', label: 'cost.costTypeName' },
        // 原始指标
        { prop: 'costPrimitiveTarget', label: 'cost.costPrimitiveTarget', width: '120' },
        // 强控比例
        { prop: 'costControlRate', label: 'cost.costControlRate', width: '100' }
        // 是否强控
        // {
        //   prop: 'isStrongControl',
        //   label: 'cost.isStrongControl',
        //   width: '120',
        //   align: 'center',
        //   component: 'toolTag',
        //   componentConfig: {
        //     prop: 'isStrongControl',
        //     type: 'text',
        //     tagConfig: this.dictDataForComponent('cost_is_strong_control', { dictLabel: 'name', dictValue: 'value' })
        //   }
        // }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringCostTypeTree
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringCostType
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteEngineeringCostType
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      this.importConfig = {
        format: 0,
        uploadRequest: importEngineeringCostType,
        uploadRequestCallBack: this.uploadRequestCallBack
      }
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table', 'popover-tree'] }) {
      const { tableCurrent } = this

      if (tableCurrent) {
        const data = {
          pid: tableCurrent.id,
          pcostTypeName: tableCurrent.costTypeName
        }
        this.$pageSwitch('form', { pageType: 'create', ...options, ...data })
      } else {
        this.$pageSwitch('form', { pageType: 'create', ...options })
      }
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table', 'popover-tree'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    // 下载模板
    downloadEngineeringCostType() {
      return downloadEngineeringCostType
    },
    // 上传成功以后的回调
    uploadRequestCallBack() {
      this.$pageUpdateListAdd(['popover-tree'])
      this.searchHandle()
    }
  }
}
</script>
