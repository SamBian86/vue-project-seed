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
      v-on="$listeners"
    >
      <!-- 查询区域 -->
      <template slot="search">
        <el-form class="table-search-form" :inline="true" :model="tableSearchParams" @keyup.enter.native="searchHandle">
          <!-- 查询 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:land:detail:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >
              {{ $t('query') }}
            </el-button>
          </el-form-item> -->
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:land:detail:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item> -->
          <!-- 下载模板 -->
          <el-form-item>
            <el-button
              type="success"
              :size="tableConfig.tableSearchSize"
              @click="
                downloadHandle({
                  i18nRequestMessage: 'downloadTemp',
                  request: downloadEngineeringLandSubject,
                  data: { excelType: 2 }
                })
              "
            >
              {{ $t('downloadTemp') }}
            </el-button>
          </el-form-item>
          <!-- 导入 -->
          <el-form-item>
            <button-import v-if="filterPermission('engineering:land:detail:import')" :config="importConfig"></button-import>
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
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:land:detail:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >
              {{ $t('export') }}
            </el-button>
          </el-form-item> -->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:land:detail:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item> -->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:land:detail:xxx')"
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
              v-if="filterPermission('engineering:land:detail:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:land:detail:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                deleteHandle({
                  id: scope.row.costSubjectId,
                  detailsId: scope.row.id
                })
              "
            >
              {{ $t('delete') }}
            </el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:land:detail:xxx')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: [scope.row.id],
                  i18nRequestMessage: '国际化',
                  request: null
                })
              "
            >
              {{ $t('ddd.ddd') }}
            </el-button> -->
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
  getEngineeringLandSubjectDetailTree,
  downloadEngineeringLandSubject,
  importEngineeringLandSubject,
  deleteEngineeringLandSubjectDetail
} from '@/api/engineering/landSubject'
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
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 科目编号
        { prop: 'costTypeCode', label: 'land.costTypeCode', width: '160' },
        // 科目名称
        { prop: 'costTypeName', label: 'land.costTypeName' },
        // 原始指标
        { prop: 'costPrimitiveTarget', label: 'land.costPrimitiveTarget', width: '100' },
        // 建筑单价(元)
        { prop: 'landbudgetUnivalence', label: 'land.landbudgetUnivalence', width: '120' },
        // 拿地工程量
        { prop: 'landbudgetQuantities', label: 'land.landbudgetQuantities', width: '120' },
        // 建筑总价(元)
        { prop: 'landbudgetTotalCost', label: 'land.landbudgetTotalCost', width: '120' },
        // 强控比例
        { prop: 'landbudgetControlRate', label: 'land.landbudgetControlRate', width: '100' },
        // 单价说明
        { prop: 'landbudgettQuantitiesRemark', label: 'land.landbudgettQuantitiesRemark' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      this.tableSearchParams.id = id
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringLandSubjectDetailTree
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringLandSubjectDetail
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
    },
    genrateI18nSearchItems() {
      const { id } = this.$attrs.page_drawer_data
      // XXX
      this.importConfig = {
        format: 0,
        uploadRequest: importEngineeringLandSubject,
        uploadParams: { id },
        uploadRequestCallBack: this.uploadRequestCallBack
      }
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      const { id } = this.tableSearchParams
      this.$pageSwitch('form', { pageType: 'create', ...options, costSubjectId: id })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      const { id } = this.tableSearchParams
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options, costSubjectId: id })
    },
    // 下载模板
    downloadEngineeringLandSubject() {
      return downloadEngineeringLandSubject
    },
    // 上传成功以后的回调
    uploadRequestCallBack() {
      this.searchHandle()
    }
  }
}
</script>
