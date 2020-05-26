<template>
  <div class="drawer-container">
    <yunlin-table
      ref="yunlinTable"
      class="table-no-padding"
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
          <!-- 查询 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>-->
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>-->
          <!-- 下载模板 -->
          <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:save')"
              type="success"
              :size="tableConfig.tableSearchSize"
              @click="downloadHandle({
                i18nRequestMessage: 'downloadTemp',
                request: null,
                data: {excelType: 2}
              })"
            >{{ $t('downloadTemp') }}</el-button>
          </el-form-item>-->
          <!-- 导入 -->
          <el-form-item>
            <button-import
              v-if="filterPermission('engineering:draw:detail:import')"
              :config="importConfig"
            ></button-import>
          </el-form-item>
          <!-- 清空选中 -->
          <!--<el-form-item>
            <el-button
              v-if="tableCurrent !== null"
              :size="tableConfig.tableSearchSize"
              @click="clearCurrentChange()"
            >{{ t('clearCurrent') }}</el-button>
          </el-form-item>-->
          <!-- 导出 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportDetailHandle()"
            >{{ $t('draw.exportDetail') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportDifferenceHandle()"
            >{{ $t('draw.exportDifference') }}</el-button>
          </el-form-item>
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:detail:xxx')"
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
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="100"
        >
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('engineering:draw:detail:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个删除 -->
            <!-- <el-button
              v-if="filterPermission('engineering:draw:detail:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>-->
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:draw:detail:xxx')"
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
  getEngineeringDrawSubjectDetailTree,
  importEngineeringDrawSubject,
  exportEngineeringDrawSubjectDetail,
  exportEngineeringDrawSubjectDifference
} from '@/api/engineering/drawSubject'
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
      const { id } = this.$attrs.page_drawer_data
      // 配置查询区域i18n相关select数据
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.hasPagination = false
      // this.tableConfig.highlightCurrentRow = true
      this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'index'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 科目编号
        { prop: 'costTypeCode', label: 'draw.costTypeCode', width: '160' },
        // 科目名称
        { prop: 'costTypeName', label: 'draw.costTypeName' },
        // 原始指标
        { prop: 'costPrimitiveTarget', label: 'draw.costPrimitiveTarget', width: '100' },
        // 建筑单价(元)
        { prop: 'drawingbudgetUnivalence', label: 'draw.drawingbudgetUnivalence', width: '120' },
        // 施工图工程量
        { prop: 'drawingbudgetQuantities', label: 'draw.drawingbudgetQuantities', width: '120' },
        // 建筑总价(元)
        { prop: 'drawingbudgetTotalCost', label: 'draw.drawingbudgetTotalCost', width: '120' },
        // 强控比例
        { prop: 'drawingbudgetControlRate', label: 'draw.drawingbudgetControlRate', width: '100' },
        // 单价说明
        { prop: 'drawingbudgetQuantitiesRemark', label: 'draw.drawingbudgetQuantitiesRemark' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      this.tableSearchParams.id = id
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringDrawSubjectDetailTree
      // 配置导出功能
      this.tableHandle.export.api = null
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      const { id } = this.$attrs.page_drawer_data
      this.importConfig = {
        format: 0,
        uploadRequest: importEngineeringDrawSubject,
        uploadParams: { id },
        uploadRequestCallBack: this.uploadRequestCallBack
      }
    },
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      console.log(item.id)
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    },
    exportDetailHandle() {
      this.tableHandle.export.api = exportEngineeringDrawSubjectDetail
      this.exportHandle()
    },
    exportDifferenceHandle() {
      this.tableHandle.export.api = exportEngineeringDrawSubjectDifference
      this.exportHandle()
    }
  }
}
</script>
