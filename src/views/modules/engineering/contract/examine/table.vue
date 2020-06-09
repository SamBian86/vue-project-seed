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
              :placeholder="$t('contractExamine.keyWord')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.examineStatus"
              :placeholder="$t('contractExamine.examineStatus')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in examineStatusItems"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.contractHandleman"
              :placeholder="$t('contractExamine.contractHandleman')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.projectId"
              :placeholder="$t('contractExamine.projectId')"
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
              :placeholder="$t('contractExamine.contractTimeFrom')"
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
              :placeholder="$t('contractExamine.contractTimeTo')"
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
              v-if="filterPermission('engineering:contract:examine:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:examine:save')"
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
              v-if="filterPermission('engineering:contract:examine:save')"
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
              v-if="filterPermission('engineering:contract:examine:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:examine:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:examine:xxx')"
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
            <!-- 查看 -->
            <el-button
              v-if="filterPermission('engineering:contract:examine:view')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="detailHandle(scope.row)"
            >{{ $t('detail') }}</el-button>
            <!-- 修改 -->
            <!-- <el-button
              v-if="filterPermission('engineering:contract:examine:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>-->
            <!-- 单个删除 -->
            <!-- <el-button
              v-if="filterPermission('engineering:contract:examine:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>-->
            <!-- 通过 -->
            <el-button
              v-if="filterPermission('engineering:contract:examine:pass') && scope.row.examineStatus === 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: { taskId: scope.row.taskId , comment: ''},
                i18nRequestMessage: 'contractExamine.pass',
                request: completeActivitiTask
              })"
            >{{ $t('contractExamine.pass') }}</el-button>
            <!-- 退回操作 -->
            <el-button
              v-if="filterPermission('engineering:contract:examine:reject') && scope.row.examineStatus === 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="rejectHandle(scope.row)"
            >{{ $t('contractExamine.reject') }}</el-button>
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
import { getEngineeringContractExaminePageList } from '@/api/engineering/contract'
import { completeActivitiTask } from '@/api/activiti/task'
import rejectComponent from '@/views/modules/activiti/components/reject'

export default {
  name: 'Tabel',
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      contractTimeToPickerOptions: {},
      projectList: [],
      drawerComponents: {
        reject: rejectComponent
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
        { prop: 'contractCode', label: 'contractExamine.contractCode', width: '160' },
        // 合同名称
        { prop: 'contractName', label: 'contractExamine.contractName', width: '200' },
        // 合同分类
        { prop: 'contractTypeName', label: 'contractExamine.contractTypeName' },
        // 合同金额(元)
        { prop: 'contractTotalPrice', label: 'contractExamine.contractTotalPrice', width: '160' },
        // 供应商
        { prop: 'supplierName', label: 'contractExamine.supplierName', width: '200' },
        // 签约时间
        { prop: 'contractTime', label: 'contractExamine.contractTime', width: '160' },
        // 付款方式
        { prop: 'contractPayTypeName', label: 'contractExamine.contractPayTypeName', width: '100' },
        // 审核时间
        { prop: 'handleTime', label: 'contractExamine.handleTime', width: '160' },
        // 经办人
        { prop: 'contractHandleman', label: 'contractExamine.contractHandleman', width: '100' }
      ]
      this.tableConfig.rowKey = 'taskId'
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        examineStatus: 0
      }
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractExaminePageList
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
      this.tableColumnAction = [
        {
          searchParam: 'examineStatus',
          exclude: [
            { value: 0, props: ['handleTime'] },
            { value: 1, props: [] },
            { value: 2, props: ['handleTime'] }
          ]
        }
      ]
      this.generateTable()
    },
    genrateI18nSearchItems() {
      getEngineeringProjectList().then(response => {
        this.projectList = response
      })
      // XXX
      this.examineStatusItems = [
        { label: this.$t('contractExamine.examineStatus0'), value: 0 },
        { label: this.$t('contractExamine.examineStatus1'), value: 1 },
        { label: this.$t('contractExamine.examineStatus2'), value: 2 }
      ]
    },
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // },
    // XXXXXXHandle(row) {
    //   this.setDrawerComponent('xxx')
    //   this.setDrawerData({ data: { pageType: 'create', formDataUpdate: false, t: new Date() } })
    //   this.setDrawerTitle(this.$t('xxxx'))
    //   this.drawerVisibleHandle()
    // }
    // drawerClosed() {
    // drawer关闭以后父页面需要的操作
    // this.searchHandle()
    // }
    // 通过
    completeActivitiTask() {
      return completeActivitiTask
    },
    // 退回页面
    rejectHandle(row) {
      this.setDrawerComponent('reject')
      this.setDrawerData({ data: { pageType: 'create', taskId: row.taskId } })
      this.setDrawerTitle(this.$t('contractExamine.reject'))
      this.drawerVisibleHandle()
    },
    drawerClosed() {
      // drawer关闭以后父页面需要的操作
      this.searchHandle()
    }
  }
}
</script>
