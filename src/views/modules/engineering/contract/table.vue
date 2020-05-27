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
            <el-select
              v-model="tableSearchParams.contractStatus"
              :placeholder="$t('contract.contractStatus')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in getDictByType('contract_status')"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.projectId"
              :placeholder="$t('contract.projectId')"
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
              @clear="clearHandle"
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
              @clear="clearHandle"
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
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
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
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:xxx')"
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
          width="200"
        >
          <template slot-scope="scope">
            <!-- 查看 -->
            <el-button
              v-if="filterPermission('engineering:contract:view')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="detailHandle(scope.row)"
            >{{ $t('detail') }}</el-button>
            <!-- 付款计划 -->
            <el-button
              v-if="filterPermission('engineering:contract:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="planHandle(scope.row)"
            >{{ $t('contract.plan') }}</el-button>
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('engineering:contract:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:contract:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:contract:xxx')"
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
            </el-button>-->
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
import { getEngineeringContractPageList, deleteEngineeringContract } from '@/api/engineering/contract'
import planComponent from './plan'

export default {
  name: 'Tabel',
  components: { planComponent },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      contractTimeToPickerOptions: {},
      projectList: [],
      drawerComponents: {
        plan: planComponent
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
      this.tableConfig.tableType = 'index'
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
        { prop: 'contractStatusName', label: 'contract.contractStatusName', width: '100' },
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
        contractStatus: 0
      }
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringContract
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
      this.drawerConfig.size = '90%'
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
      this.$pageSwitch('form', { pageType: 'create', ...options, projectId: '' })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    planHandle(row) {
      this.setDrawerComponent('plan')
      this.setDrawerData({ contractId: row.id })
      this.setDrawerTitle(this.$t('contract.plan'))
      this.drawerVisibleHandle()
    }
    // drawerClosed() {
    // drawer关闭以后父页面需要的操作
    // this.searchHandle()
    // }
  }
}
</script>
