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
              :placeholder="$t('model.name')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.key"
              :placeholder="$t('model.key')"
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
          <el-form-item>
            <el-button type="primary" :size="tableConfig.tableSearchSize" @click="createHandle()">{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item> -->
          <!-- 批量删除 -->
          <el-form-item>
            <el-button type="danger" :size="tableConfig.tableSearchSize" @click="deleteSectionHandle()">{{
              $t('deleteBatch')
            }}</el-button>
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
            <!-- 在线设计 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { modelId: scope.row.id },
                  request: designModelOnline
                })
              "
            >
              {{ $t('model.design') }}
            </el-button>
            <!-- 部署 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { id: scope.row.id },
                  i18nRequestMessage: 'model.deploy',
                  request: deployActivitiModel
                })
              "
            >
              {{ $t('model.deploy') }}
            </el-button>
            <!-- 修改 -->
            <!-- <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button> -->
            <!-- 导出 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: { id: scope.row.id },
                  request: exportActivitiModel
                })
              "
            >
              {{ $t('export') }}
            </el-button>
            <!-- 单个删除 -->
            <el-button type="text" :size="tableConfig.tableSearchSize" @click="deleteHandle([scope.row.id])">{{
              $t('delete')
            }}</el-button>
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
import {
  getActivitiModelPageList,
  deleteActivitiModel,
  designModelOnline,
  exportActivitiModel,
  deployActivitiModel
} from '@/api/activiti/model'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {}
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission', 'getDictByType'])
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
        // 名称
        { prop: 'name', label: 'model.name', width: '140', align: 'center' },
        // 标识 key
        { prop: 'key', label: 'model.key', align: 'center' },
        // 版本 version
        { prop: 'version', label: 'model.version', align: 'center' },
        // 创建时间 createTime
        { prop: 'createTime', label: 'model.createTime', width: '160', align: 'center' },
        // 更新时间 lastUpdateTime
        { prop: 'lastUpdateTime', label: 'model.lastUpdateTime', width: '160', align: 'center' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getActivitiModelPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteActivitiModel
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteActivitiModel
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
    designModelOnline() {
      return designModelOnline
    },
    exportActivitiModel() {
      return exportActivitiModel
    },
    deployActivitiModel() {
      return deployActivitiModel
    }
  }
}
</script>
