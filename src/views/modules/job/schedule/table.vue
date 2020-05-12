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
              v-model="tableSearchParams.beanName"
              :placeholder="$t('schedule.beanName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>
          <!-- 批量暂停 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:pause')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="customSectionHandle({
                i18nMessage: 'prompt.customBatch',
                i18nRequestMessage: 'schedule.pauseBatch',
                request: pauseJobSchedule
              })"
            >{{ $t('schedule.pauseBatch') }}</el-button>
          </el-form-item>
          <!-- 批量恢复 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:resume')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="customSectionHandle({
                i18nMessage: 'prompt.customBatch',
                i18nRequestMessage: 'schedule.resumeBatch',
                request: resumeJobSchedule
              })"
            >{{ $t('schedule.resumeBatch') }}</el-button>
          </el-form-item>
          <!-- 批量执行 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:run')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="customSectionHandle({
                i18nMessage: 'prompt.customBatch',
                i18nRequestMessage: 'schedule.runBatch',
                request: runJobSchedule
              })"
            >{{ $t('schedule.runBatch') }}</el-button>
          </el-form-item>
          <!-- 日志列表 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:schedule:log')"
              type="success"
              :size="tableConfig.tableSearchSize"
              @click="jobScheduleLogHandle"
            >{{ $t('schedule.log') }}</el-button>
          </el-form-item>
        </el-form>
      </template>
      <!-- 操作区域 -->
      <template slot="operate">
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="240"
        >
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('sys:schedule:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个暂停 -->
            <el-button
              v-if="filterPermission('sys:schedule:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: 'schedule.pauseBatch',
                request: pauseJobSchedule
              })"
            >{{ $t('schedule.pause') }}</el-button>
            <!-- 单个恢复 -->
            <el-button
              v-if="filterPermission('sys:schedule:resume')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: 'schedule.resumeBatch',
                request: resumeJobSchedule
              })"
            >{{ $t('schedule.resumeBatch') }}</el-button>
            <!-- 单个执行操作 -->
            <el-button
              v-if="filterPermission('sys:schedule:run')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: 'schedule.runBatch',
                request: runJobSchedule
              })"
            >{{ $t('schedule.runBatch') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('sys:schedule:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
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
      <schedule-log :drawer-data="drawerData"></schedule-log>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import scheduleLog from './log'
import {
  getJobSchedulePageList,
  deleteJobSchedule,
  pauseJobSchedule,
  resumeJobSchedule,
  runJobSchedule
} from '@/api/job/schedule'

export default {
  name: 'Tabel',
  components: { scheduleLog },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {}
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission'])
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
      // this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.hasPagination = false
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // bean名称
        { prop: 'beanName', label: 'schedule.beanName', align: 'center' },
        // 参数
        { prop: 'params', label: 'schedule.params', align: 'center' },
        // corn表达式
        { prop: 'cronExpression', label: 'schedule.cronExpression', width: '200px', align: 'center' },
        // 备注
        { prop: 'remark', label: 'schedule.remark', align: 'center' },
        // 状态
        {
          prop: 'status',
          label: 'schedule.status',
          width: '80',
          align: 'center',
          sortable: true,
          component: 'toolTag',
          componentConfig: {
            prop: 'status',
            tagSize: 'small',
            tagConfig: [
              {
                value: 0,
                type: 'danger',
                name: this.$t('schedule.status0')
              },
              {
                value: 1,
                type: 'success',
                name: this.$t('schedule.status1')
              }
            ]
          }
        }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getJobSchedulePageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteJobSchedule
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteJobSchedule
      // console.log('table page created')
    },
    genrateI18nSearchItems() {},
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    },
    // 批量暂停
    pauseJobSchedule() {
      return pauseJobSchedule
    },
    // 批量恢复
    resumeJobSchedule() {
      return resumeJobSchedule
    },
    // 批量执行
    runJobSchedule() {
      return runJobSchedule
    },
    // 打开drawer组件方法
    jobScheduleLogHandle() {
      this.setDrawerData({})
      this.setDrawerTitle('日志列表')
      this.drawerVisibleHandle()
    }
  }
}
</script>
