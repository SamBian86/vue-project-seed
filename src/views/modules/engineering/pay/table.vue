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
              :placeholder="$t('applypaymentPay.keyWord')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.payStatus"
              :placeholder="$t('applypaymentPay.payStatus')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in getDictByType('pay_status')"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.projectId"
              :placeholder="$t('applypaymentPay.projectId')"
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
              v-if="filterPermission('engineering:pay:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:pay:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>-->
          <!-- 打开draw -->
          <!-- <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="XXXXXXHandle()"
            >{{ $t('xxx') }}</el-button>
          </el-form-item>-->
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
      <template slot="operate">
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="160"
        >
          <template slot-scope="scope">
            <!-- 活动流程图 -->
            <el-popover
              v-if="scope.row.instanceId"
              placement="left-start"
              :title="$t('instanceId')"
              width="800"
              trigger="hover"
            >
              <div>
                <a :href="instanceHandle(scope.row)" target="_blank">
                  <img
                    style="width: 100%;"
                    :src="instanceHandle(scope.row)"
                    :alt="$t('instanceId')"
                  />
                </a>
              </div>
              <el-button
                slot="reference"
                type="text"
                :size="tableConfig.tableSearchSize"
              >{{ $t('instanceId') }}</el-button>
            </el-popover>
            <!-- 详情 -->
            <el-button
              v-if="filterPermission('engineering:pay:view') && scope.row.payStatus === 2"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="detailHandle(scope.row)"
            >{{ $t('detail') }}</el-button>
            <el-button
              v-if="filterPermission('engineering:pay:pay') && scope.row.payStatus !== 2"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="payHandle(scope.row)"
            >
              {{ scope.row.payStatus === 0 ? $t('applypaymentPay.pay') : '' }}
              {{ scope.row.payStatus === 1 ? $t('applypaymentPay.payAll') : '' }}
            </el-button>
            <!-- 修改 -->
            <!-- <el-button
              v-if="filterPermission('engineering:pay:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>-->
            <!-- 单个删除 -->
            <!-- <el-button
              v-if="filterPermission('engineering:pay:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>-->
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
    <yunlin-drawer
      ref="yunlinDrawer"
      :config="drawerConfig"
      v-bind="$attrs"
      @drawer-closed="drawerClosed"
      v-on="$listeners"
    >
      <component
        :is="drawerComponent"
        :drawer-data="drawerData"
        @drawer-close-by-child="drawerCloseByChild"
        v-on="$listeners"
      ></component>
      <!-- <xxx :drawer-data="drawerData" @drawer-close-by-child="drawerCloseByChild" v-on="$listeners"></xxx> -->
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getEngineeringProjectList } from '@/api/engineering/project'
import { getEngineeringContractApplypaymentPayPageList } from '@/api/engineering/contractApplypayment'
import detailComponent from './detail'

export default {
  name: 'Tabel',
  // components: { xxxComponent },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      projectList: [],
      drawerComponents: {
        detail: detailComponent
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
        { prop: 'contractCode', label: 'applypaymentPay.contractCode', width: '160' },
        // 合同名称
        { prop: 'contractName', label: 'applypaymentPay.contractName', width: '200' },
        // 合同分类
        { prop: 'contractTypeName', label: 'applypaymentPay.contractTypeName' },
        // 供应商
        { prop: 'supplierName', label: 'applypaymentPay.supplierName', width: '200' },
        // 款项名称
        { prop: 'costPayName', label: 'applypaymentPay.costPayName', width: '140' },
        // 款项金额
        { prop: 'needPayAmount', label: 'applypaymentPay.needPayAmount', width: '100' },
        // 申请金额
        { prop: 'thisAmount', label: 'applypaymentPay.thisAmount', width: '100' },
        // 支付状态
        { prop: 'payStatusName', label: 'applypaymentPay.payStatusName', width: '100' },
        // 申请人
        { prop: 'applier', label: 'applypaymentPay.applier', width: '100' },
        // 申请日期
        { prop: 'applyDate', label: 'applypaymentPay.applyDate', width: '160' }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        payStatus: ''
      }
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractApplypaymentPayPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
      this.generateTable()

      this.drawerConfig.size = '95%'
    },
    genrateI18nSearchItems() {
      getEngineeringProjectList().then(response => {
        this.projectList = response
      })
    },
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // },
    payHandle(row) {
      this.setDrawerComponent('detail')
      this.setDrawerData({ id: row.id, pageType: 'table' })
      this.setDrawerTitle(this.$t('applypaymentPay.payDetail'))
      this.drawerVisibleHandle()
    },
    detailHandle(row) {
      this.setDrawerComponent('detail')
      this.setDrawerData({ id: row.id, pageType: 'detail' })
      this.setDrawerTitle(this.$t('applypaymentPay.payDetail'))
      this.drawerVisibleHandle()
    },
    drawerClosed() {
      // drawer关闭以后父页面需要的操作
      this.searchHandle()
    }
  }
}
</script>
