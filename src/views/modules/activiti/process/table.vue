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
              v-model="tableSearchParams.name"
              :placeholder="$t('process.name')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.key"
              :placeholder="$t('process.key')"
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
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item> -->
          <!-- 打开draw -->
          <el-form-item>
            <el-button type="primary" :size="tableConfig.tableSearchSize" @click="deployFileHandle()">{{
              $t('process.deployFile')
            }}</el-button>
          </el-form-item>
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
          <el-form-item>
            <el-button type="danger" :size="tableConfig.tableSearchSize" @click="deleteSectionHandle()">
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item>
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
        <el-table-column :label="$t('handle')" align="center" header-align="center" fixed="right" width="200">
          <template slot-scope="scope">
            <!-- 挂起 -->
            <el-button
              v-if="!scope.row.suspended"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { id: scope.row.id },
                  i18nRequestMessage: 'process.suspend',
                  request: suspendActivitiProcess
                })
              "
            >
              {{ $t('process.suspend') }}
            </el-button>
            <!-- 激活 -->
            <el-button
              v-if="scope.row.suspended"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { id: scope.row.id },
                  i18nRequestMessage: 'process.active',
                  request: activeActivitiProcess
                })
              "
            >
              {{ $t('process.active') }}
            </el-button>
            <!-- 修改 -->
            <!-- <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button> -->
            <!-- 单个删除 -->
            <el-button type="text" :size="tableConfig.tableSearchSize" @click="deleteHandle([scope.row.deploymentId])">
              {{ $t('delete') }}
            </el-button>
            <!-- 转换为模型 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { id: scope.row.id },
                  i18nRequestMessage: 'process.convertToModel',
                  request: makeActivitiProcessConvertToModelById
                })
              "
            >
              {{ $t('process.convertToModel') }}
            </el-button>
            <!-- 配置业务路由 -->
            <el-button type="text" :size="tableConfig.tableSearchSize" @click="routeConfigHandle(scope.row)">
              {{ $t('process.bizRouteSet') }}
            </el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('xxx:xxx:xxx')"
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
    <yunlin-drawer ref="yunlinDrawer" :config="drawerConfig" v-bind="$attrs" @drawer-closed="drawerClosed" v-on="$listeners">
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
import {
  getActivitiProcessPageList,
  deleteActivitiProcess,
  getActivitiProcessResource,
  suspendActivitiProcess,
  activeActivitiProcess,
  makeActivitiProcessConvertToModelById,
  getProcDefBizRouteById
} from '@/api/activiti/process'
import deployProcess from './deploy'
import routeConfig from './config'

// 1.修改查询条件
// 2.修改授权标识
// 3.修改列表相关事件行为
// 4.配置接口
// 5.添加table项配置
// 6.放开pageSwitch的formDataUpdate配置用于检查详情接口
// 7.删除此处注释信息
export default {
  name: 'Tabel',
  components: { deployProcess },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        deploy: deployProcess,
        config: routeConfig
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
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 流程id
        { prop: 'id', label: 'process.id', width: '160', align: 'center' },
        // 部署id
        { prop: 'deploymentId', label: 'process.deploymentId', width: '80', align: 'center' },
        // 名称
        { prop: 'name', label: 'process.name', align: 'center' },
        // 标识
        { prop: 'key', label: 'process.key', align: 'center' },
        // 版本
        { prop: 'version', label: 'process.version', align: 'center' },
        // XML
        // { prop: 'resourceName', label: 'process.resourceName', align: 'center' },
        {
          prop: 'resourceName',
          label: 'process.resourceName',
          minWidth: '120',
          align: 'center',
          component: 'toolButton',
          componentConfig: { prop: 'resourceName', buttonType: 'text', clickHandle: this.resourceNameClickHandle }
        },
        // 图片
        // { prop: 'diagramResourceName', label: 'process.diagramResourceName', align: 'center' },
        {
          prop: 'diagramResourceName',
          label: 'process.diagramResourceName',
          minWidth: '120',
          align: 'center',
          component: 'toolButton',
          componentConfig: { prop: 'diagramResourceName', buttonType: 'text', clickHandle: this.diagramResourceNameClickHandle }
        },
        // 部署时间
        { prop: 'deploymentTime', label: 'process.deploymentTime', width: '160', align: 'center', sortable: true }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getActivitiProcessPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteActivitiProcess
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteActivitiProcess
      // console.log('table page created')
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
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    },
    // 点击xml
    resourceNameClickHandle(row) {
      getActivitiProcessResource({
        deploymentId: row.deploymentId,
        resourceName: row.resourceName
      })
    },
    // 点击图片
    diagramResourceNameClickHandle(row) {
      getActivitiProcessResource({
        deploymentId: row.deploymentId,
        resourceName: row.diagramResourceName
      })
    },
    // 部署流程文件
    deployFileHandle(row) {
      this.setDrawerComponent('deploy')
      this.setDrawerData({ data: { pageType: 'create', formDataUpdate: false, t: new Date() } })
      this.setDrawerTitle(this.$t('process.deployFile'))
      this.drawerVisibleHandle()
    },
    // 配置业务路由
    routeConfigHandle(row) {
      this.setDrawerComponent('config')
      getProcDefBizRouteById({ id: row.id }).then(response => {
        if (response) {
          this.setDrawerData({ data: { pageType: 'edit', formDataUpdate: true, id: row.id } })
        } else {
          this.setDrawerData({ data: { pageType: 'create', procDefId: row.id, procDefKey: row.key, version: row.version } })
        }
        this.setDrawerTitle(this.$t('process.bizRouteSet'))
        this.drawerVisibleHandle()
      })
    },
    // 批量删除
    filterSectionData() {
      const { tableSections } = this
      return tableSections.map(item => {
        return item.deploymentId
      })
    },
    // 挂起
    suspendActivitiProcess() {
      return suspendActivitiProcess
    },
    // 激活
    activeActivitiProcess() {
      return activeActivitiProcess
    },
    // 转换为模型
    makeActivitiProcessConvertToModelById() {
      return makeActivitiProcessConvertToModelById
    }
    // drawerClosed() {
    // drawer关闭以后父页面需要的操作
    // this.searchHandle()
    // }
  }
}
</script>
