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
        <el-form class="table-search-form" :inline="true" :model="tableSearchParams" @keyup.enter.native="searchHandle">
          <el-form-item>
            <el-input
              v-model="tableSearchParams.id"
              :placeholder="$t('running.id')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.definitionKey"
              :placeholder="$t('running.definitionKey')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button :size="tableConfig.tableSearchSize" @click="searchHandle()">{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>-->
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:xxx')"
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
        <el-table-column :label="$t('handle')" align="center" header-align="center" fixed="right" width="160">
          <template slot-scope="scope">
            <!-- 修改 -->
            <!-- <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>-->
            <!-- 单个删除 -->
            <el-button type="text" :size="tableConfig.tableSearchSize" @click="deleteHandle({ id: scope.row.id })">
              {{ $t('delete') }}
            </el-button>
            <!-- 查看流程图 -->
            <el-button type="text" :size="tableConfig.tableSearchSize" @click="viewFlowImageHandle(scope.row)">{{
              $t('process.viewFlowImage')
            }}</el-button>
          </template>
        </el-table-column>
      </template>
    </yunlin-table>
    <yunlin-drawer ref="yunlinDrawer" :config="drawerConfig" v-bind="$attrs" @drawer-closed="drawerClosed" v-on="$listeners">
      <component
        :is="drawerComponent"
        :drawer-data="drawerData"
        @drawer-close-by-child="drawerCloseByChild"
        v-on="$listeners"
      ></component>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getActivitiRunningPageList, deleteActivitiRunning } from '@/api/activiti/running'
import detailProcess from './detail'

export default {
  name: 'Tabel',
  components: { detailProcess },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        detail: detailProcess
      }
    }
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
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 实例ID
        { prop: 'processInstanceId', label: 'running.id', width: '160', align: 'center' },
        // 定义KEY
        { prop: 'processDefinitionKey', label: 'running.definitionKey', width: '160', align: 'center' },
        // 定义ID
        { prop: 'processDefinitionId', label: 'running.processDefinitionId', align: 'center' },
        // 定义名称
        { prop: 'processDefinitionName', label: 'running.processDefinitionName', width: '160', align: 'center' },
        // 当前环节
        { prop: 'activityName', label: 'running.activityId', width: '160', align: 'center' },
        // 是否挂起
        {
          prop: 'suspended',
          label: 'running.suspended',
          width: '80',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'suspended',
            tagSize: 'small',
            tagConfig: [
              {
                value: true,
                name: this.$t('running.suspended1')
              },
              {
                value: false,
                type: 'danger',
                name: this.$t('running.suspended0')
              }
            ]
          }
        }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}

      // 配置列表请求
      this.tableHandle.list.api = getActivitiRunningPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteActivitiRunning
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteActivitiRunning
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
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // },
    // 查看流程图
    viewFlowImageHandle(row) {
      const { title } = this.$route.meta
      this.setDrawerComponent('detail')
      this.setDrawerData({ data: { pageType: 'detail', ...row } })
      this.setDrawerTitle(`${title} - ${row.processDefinitionName}`)
      this.drawerVisibleHandle()
    }
  }
}
</script>
