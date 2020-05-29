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
          <el-form-item>
            <el-input
              v-model="tableSearchParams.keyWord"
              :placeholder="$t('applypayment.keyWord')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.contractHandleman"
              :placeholder="$t('applypayment.contractHandleman')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.applyStatus"
              :placeholder="$t('applypayment.applyStatus')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in getDictByType('examine_status')"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.projectId"
              :placeholder="$t('applypayment.projectId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in projectList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:applypayment:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:applypayment:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 下载模板 -->
          <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:applypayment:save')"
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
          <!--<el-form-item>
            <button-import :config="importConfig"></button-import>
          </el-form-item>-->
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
              v-if="filterPermission('engineering:contract:applypayment:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:applypayment:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:applypayment:xxx')"
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
              v-if="filterPermission('engineering:contract:applypayment:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:contract:applypayment:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:contract:applypayment:xxx')"
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
import { getEngineeringProjectList } from '@/api/engineering/project'
import {
  getEngineeringContractApplypaymentPageList,
  deleteEngineeringContractApplypayment
} from '@/api/engineering/contractApplypayment'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      projectList: []
    }
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
      // this.tableConfig.hasPagination = false
      // this.tableConfig.highlightCurrentRow = true
      // this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 合同编号
        { prop: 'contractCode', label: 'applypayment.contractCode', width: '160' },
        // 合同名称
        { prop: 'contractName', label: 'applypayment.contractName', width: '200' },
        // 合同类别
        { prop: 'contractTypeName', label: 'applypayment.contractTypeName' },
        // 合同金额
        { prop: 'contractTotalPrice', label: 'applypayment.contractTotalPrice', width: '160' },
        // 终审额
        { prop: 'contractFinalPrice', label: 'applypayment.contractFinalPrice', width: '160' },
        // 供应商
        { prop: 'supplierName', label: 'applypayment.supplierName', width: '200' },
        // 经办人
        { prop: 'contractHandleman', label: 'applypayment.contractHandleman', width: '160' },
        // 款项名称
        { prop: 'costPayName', label: 'applypayment.costPayName', width: '160' },
        // 应付金额
        { prop: 'needPayAmount', label: 'applypayment.needPayAmount', width: '160' },
        // 已付金额
        { prop: 'havePayAmount', label: 'applypayment.havePayAmount', width: '160' },
        // 应付申请
        { prop: 'thisAmount', label: 'applypayment.thisAmount', width: '100' },
        // 请付状态
        { prop: 'payStatusName', label: 'applypayment.payStatusName', width: '160' },
        // 申请日期
        { prop: 'applyDate', label: 'applypayment.applyDate', width: '160' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractApplypaymentPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringContractApplypayment
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringContractApplypayment
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      getEngineeringProjectList().then(response => {
        this.projectList = response
      })
      // XXX
      // this.smsStatus = [
      //   { label: this.$t('aaa'), value: 0 },
      //   { label: this.$t('aaa'), value: 1 }
      // ]
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    }
  }
}
</script>
