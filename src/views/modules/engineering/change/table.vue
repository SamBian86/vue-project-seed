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
            <el-select
              v-model="tableSearchParams.applyStatus"
              :placeholder="$t('contractChange.applyStatus')"
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
              :placeholder="$t('contractChange.projectId')"
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
            <el-select
              v-model="tableSearchParams.changeId"
              :placeholder="$t('contractChange.changeId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in changeList"
                :key="index"
                :label="item.changeTypeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.changeName"
              :placeholder="$t('contractChange.changeName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:change:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:change:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 下载模板 -->
          <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:change:save')"
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
              v-if="filterPermission('engineering:change:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:change:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:change:xxx')"
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
            <!-- 查看 -->
            <el-button
              v-if="filterPermission('engineering:change:view')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="detailHandle(scope.row)"
            >{{ $t('detail') }}</el-button>
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('engineering:change:update') && scope.row.applyStatus === 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 提交审核 -->
            <el-button
              v-if="filterPermission('engineering:change:submit') && (scope.row.applyStatus === 0 || scope.row.applyStatus === 3)"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { id : scope.row.id },
                  i18nRequestMessage: 'contractChange.submit',
                  request: submitEngineeringContractChange
                })
              "
            >{{ $t('contractChange.submit') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:change:delete') && scope.row.applyStatus === 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:change:xxx')"
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
import { getEngineeringContractChangeTypeList } from '@/api/engineering/contractChangeType'
import {
  getEngineeringContractChangePageList,
  deleteEngineeringContractChange,
  submitEngineeringContractChange,
  rejectEngineeringContractChange
} from '@/api/engineering/contractChange'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      projectList: [],
      changeList: []
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
        // 变更编号
        { prop: 'changeCode', label: 'contractChange.changeCode', width: '120' },
        // 专业
        { prop: 'changeSpecialityName', label: 'contractChange.changeSpecialityName', width: '140' },
        // 变更名称
        { prop: 'changeName', label: 'contractChange.changeName', width: '140' },
        // 变更类型
        { prop: 'changeTypeName', label: 'contractChange.changeTypeName', width: '140' },
        // 变更原因
        { prop: 'changeReason', label: 'contractChange.changeReason' },
        // 变更金额
        { prop: 'changeAmount', label: 'contractChange.changeAmount', width: '120' },
        // 经办人
        { prop: 'userName', label: 'contractChange.userName', width: '80' },
        // 签发日期
        { prop: 'applyDate', label: 'contractChange.applyDate', width: '160' },
        // 审批状态
        {
          prop: 'applyStatusName',
          label: 'contractChange.applyStatusName',
          width: '120',
          clickHandle: this.applyStatusClickHandle,
          preHandle: (value, row) => {
            if (row.applyStatus === 3) {
              return `<span class="applyStatusReject">${value}</span>`
            }
            return value
          }
        }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractChangePageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringContractChange
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringContractChange
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      getEngineeringProjectList().then(response => {
        this.projectList = response
      })
      getEngineeringContractChangeTypeList().then(response => {
        this.changeList = response
      })
      // XXX
      // this.smsStatus = [
      //   { label: this.$t('aaa'), value: 0 },
      //   { label: this.$t('aaa'), value: 1 }
      // ]
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table', 'select-dynamic', 'popover-tree'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table', 'select-dynamic', 'popover-tree'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    // 提交审核
    submitEngineeringContractChange() {
      return submitEngineeringContractChange
    },
    drawerClosed() {
      // drawer关闭以后父页面需要的操作
      this.searchHandle()
    },
    applyStatusClickHandle(row) {
      if (row.applyStatus !== 3) {
        return
      }
      rejectEngineeringContractChange({ id: row.id }).then(response => {
        const _html = `
        <div>${this.$t('contractChange.comment')}：${response.comment}</div>
        <div>${this.$t('contractChange.userName')}：${response.userName}</div>
        `
        this.$alert(_html, this.$t('info'), {
          confirmButtonText: this.$t('confirm'),
          dangerouslyUseHTMLString: true
        })
      })
    }
  }
}
</script>
<style lang="scss">
.applyStatusReject {
  color: #4381e6;
  cursor: pointer;
}
</style>
