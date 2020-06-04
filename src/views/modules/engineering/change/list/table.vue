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
              :placeholder="$t('contract.keyWord')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="tableSearchParams.contractTimeFrom"
              :placeholder="$t('contract.contractTimeFrom')"
              :size="tableConfig.tableSearchSize"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
              @change="dateHandle('contractTimeTo', $event)"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="tableSearchParams.contractTimeTo"
              :placeholder="$t('contract.contractTimeTo')"
              :size="tableConfig.tableSearchSize"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="contractTimeToPickerOptions"
              clearable
              @change="clearHandle"
            ></el-date-picker>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>-->
          <!-- 打开draw -->
          <!-- <el-form-item>
            <el-button type="primary" :size="tableConfig.tableSearchSize" @click="XXXXXXHandle()">{{ $t('xxx') }}</el-button>
          </el-form-item>-->
          <!-- 下载模板 -->
          <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:save')"
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
              v-if="filterPermission('engineering:contract:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="batchSaveHandle"
            >{{ $t('contractChange.batchSave') }}</el-button>
          </el-form-item>
        </el-form>
      </template>
    </yunlin-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import { getEngineeringContractPageList } from '@/api/engineering/contract'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin, drawerMixin],
  data() {
    return {
      contractTimeToPickerOptions: {}
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
      const { projectId, contractStatus } = this.$attrs.page_drawer_data

      // 配置查询区域i18n相关select数据
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.hasPagination = false
      // this.tableConfig.highlightCurrentRow = true
      // this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 合同编号
        { prop: 'contractCode', label: 'contract.contractCode', width: '160' },
        // 合同名称
        { prop: 'contractName', label: 'contract.contractName', width: '200' },
        // 合同分类
        { prop: 'contractTypeName', label: 'contract.contractTypeName' },
        // 合同金额(元)
        { prop: 'contractTotalPrice', label: 'contract.contractTotalPrice', width: '160' },
        // 供应商
        { prop: 'supplierName', label: 'contract.supplierName', width: '200' },
        // 合同状态
        {
          prop: 'contractStatusName',
          label: 'contract.contractStatusName',
          width: '100'
        },
        // 当前审核人
        { prop: 'currentExaminer', label: 'contract.currentExaminer', width: '100' },
        // 签约时间
        { prop: 'contractTime', label: 'contract.contractTime', width: '160' },
        // 经办人
        { prop: 'contractHandleman', label: 'contract.contractHandleman', width: '100' }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        contractStatus,
        projectId
      }
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      // this.tableHandle.delete.api = deleteEngineeringContract
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringContract
      // console.log('table page created')
      this.tableColumnAction = [
        {
          searchParam: 'contractStatus',
          exclude: [
            { value: 0, props: ['currentExaminer'] },
            { value: 1, props: [] },
            { value: 2, props: ['currentExaminer'] },
            { value: 3, props: ['currentExaminer'] }
          ]
        }
      ]

      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      // this.smsStatus = [
      //   { label: this.$t('aaa'), value: 0 },
      //   { label: this.$t('aaa'), value: 1 }
      // ]
    },
    // 保存
    batchSaveHandle() {
      const ids = this.filterSectionData()
      const tableData = this.getTableData()
      const items = {}
      tableData.map(item => {
        if (ids.includes(item.id)) {
          items['contract_' + item.id] = {}
          items['contract_' + item.id]['changeAmount'] = 0
          items['contract_' + item.id]['changeCostInfos'] = []
          items['contract_' + item.id]['changeId'] = ''
          items['contract_' + item.id]['contractCode'] = item.contractCode
          items['contract_' + item.id]['contractHandleman'] = item.contractHandleman
          items['contract_' + item.id]['contractId'] = item.id
          items['contract_' + item.id]['contractName'] = item.contractName
          items['contract_' + item.id]['contractTotalPrice'] = item.contractTotalPrice
          items['contract_' + item.id]['id'] = ''
        }
      })
      // console.log(ids)
      // console.log(items)
      this.$emit('set-form-data', ids, items)
      this.clearSelectionChangeHandle()
      this.$drawerCloseByChild()
    }
  }
}
</script>
