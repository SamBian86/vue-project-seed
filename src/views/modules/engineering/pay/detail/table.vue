<template>
  <div class="drawer-container">
    <el-form :model="detail" label-position="right" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.contractName')">
            <el-input :value="detail.contractName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.contractCode')">
            <el-input :value="detail.contractCode" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.costPayName')">
            <el-input :value="detail.costPayName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.haveApplyAmount')">
            <el-input :value="detail.haveApplyAmount" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.havePayAmount')">
            <el-input :value="detail.havePayAmount" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.needPayAmount')">
            <el-input :value="detail.needPayAmount" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.supplierName')">
            <el-input :value="detail.supplierName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item :label="$t('applypaymentPay.thisAmount')">
            <el-input :value="detail.thisAmount" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
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
              <!-- 查询 -->
              <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:pay:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
              </el-form-item>-->
              <!-- 创建 -->
              <el-form-item>
                <el-button
                  v-if="containsPageType(['table']) && filterPermission('engineering:pay:save')"
                  type="primary"
                  :size="tableConfig.tableSearchSize"
                  @click="createHandle()"
                >{{ $t('add') }}</el-button>
              </el-form-item>
              <!-- 下载模板 -->
              <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:pay:save')"
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
              v-if="filterPermission('engineering:pay:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
              </el-form-item>-->
              <!-- 批量删除 -->
              <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:pay:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
              </el-form-item>-->
              <!-- 批量操作 -->
              <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:pay:xxx')"
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
          <template v-if="containsPageType(['table'])" slot="operate">
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
                  v-if="filterPermission('engineering:pay:update')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="editHandle(scope.row)"
                >{{ $t('update') }}</el-button>
                <!-- 单个删除 -->
                <el-button
                  v-if="filterPermission('engineering:pay:delete')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="deleteHandle([scope.row.id])"
                >{{ $t('delete') }}</el-button>
                <!-- 单个操作 -->
                <!-- <el-button
              v-if="filterPermission('engineering:pay:xxx')"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import {
  getEngineeringContractApplypaymentDetailsPageList,
  deleteEngineeringContractApplypaymentDetails
} from '@/api/engineering/contractApplypaymentDetails'
import { getEngineeringContractApplypaymentForPayById } from '@/api/engineering/contractApplypayment'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      pageType: '',
      id: '',
      detail: {
        contractName: '',
        contractCode: '',
        costPayName: '',
        haveApplyAmount: '',
        havePayAmount: '',
        needPayAmount: '',
        supplierName: '',
        thisAmount: ''
      }
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
      const { id, pageType } = this.$attrs.page_drawer_data
      this.id = id
      this.pageType = pageType
      // 配置查询区域i18n相关select数据
      // this.genrateI18nSearchItems()
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
        // 供应商名称
        { prop: 'supplierName', label: 'applypaymentPay.supplierName' },
        // 实付金额
        { prop: 'payAmount', label: 'applypaymentPay.payAmount', width: '120' },
        // 支付方式
        { prop: 'payType', label: 'applypaymentPay.payType', width: '120' },
        // 经办人
        { prop: 'handleman', label: 'applypaymentPay.handleman', width: '120' },
        // 经办日期
        { prop: 'handleDate', label: 'applypaymentPay.handleDate', width: '160' }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        applyPaymentId: id
      }
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractApplypaymentDetailsPageList
      this.tableHandle.list.callback = this.afterGetList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringContractApplypaymentDetails
      this.tableHandle.delete.callback = this.afterGetList
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringContractApplypaymentDetails
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      // this.smsStatus = [
      //   { label: this.$t('aaa'), value: 0 },
      //   { label: this.$t('aaa'), value: 1 }
      // ]
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      const { id } = this
      this.$pageSwitch('form', { pageType: 'create', ...options, applyPaymentId: id })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    },
    getEngineeringContractApplypaymentForPayById(params) {
      getEngineeringContractApplypaymentForPayById(params).then(response => {
        this.detail = response
      })
    },
    afterGetList() {
      const { id } = this
      this.getEngineeringContractApplypaymentForPayById({
        id
      })
    }
  }
}
</script>
