<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" :lg="6" :md="6" :sm="24" :xs="24">
        <component-tree
          ref="componentTree"
          :config="componentTreeConfig"
          v-bind="$attrs"
          @table-params-merge="tableParamsMerge"
          v-on="$listeners"
        ></component-tree>
      </el-col>
      <el-col :span="18" :lg="18" :md="18" :sm="24" :xs="24">
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
                  :placeholder="$t('contractType.name')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                ></el-input>
              </el-form-item>
              <!-- 查询 -->
              <el-form-item>
                <el-button
                  v-if="filterPermission('engineering:contract:type:view')"
                  :size="tableConfig.tableSearchSize"
                  @click="searchHandle()"
                >
                  {{ $t('query') }}
                </el-button>
              </el-form-item>
              <!-- 重置 -->
              <el-form-item>
                <el-button
                  v-if="filterPermission('engineering:contract:type:view')"
                  :size="tableConfig.tableSearchSize"
                  @click="searchResetHandle()"
                >
                  {{ $t('reset') }}
                </el-button>
              </el-form-item>
              <!-- 创建 -->
              <el-form-item>
                <el-button
                  v-if="filterPermission('engineering:contract:type:save')"
                  type="primary"
                  :size="tableConfig.tableSearchSize"
                  @click="createHandle()"
                >
                  {{ $t('add') }}
                </el-button>
              </el-form-item>
              <!-- 下载模板 -->
              <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:type:save')"
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
                  v-if="filterPermission('engineering:contract:type:export')"
                  type="primary"
                  :size="tableConfig.tableSearchSize"
                  @click="exportHandle()"
                >{{ $t('export') }}</el-button>
              </el-form-item>-->
              <!-- 批量删除 -->
              <!-- <el-form-item>
                <el-button
                  v-if="filterPermission('engineering:contract:type:delete')"
                  type="danger"
                  :size="tableConfig.tableSearchSize"
                  @click="deleteSectionHandle()"
                >{{ $t('deleteBatch') }}</el-button>
              </el-form-item>-->
              <!-- 批量操作 -->
              <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:contract:type:xxx')"
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
            <el-table-column :label="$t('handle')" align="center" header-align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <!-- 修改 -->
                <el-button
                  v-if="filterPermission('engineering:contract:type:update')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="editHandle(scope.row)"
                >
                  {{ $t('update') }}
                </el-button>
                <!-- 单个删除 -->
                <el-button
                  v-if="filterPermission('engineering:contract:type:delete')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="deleteHandle([scope.row.id])"
                >
                  {{ $t('delete') }}
                </el-button>
                <!-- 单个操作 -->
                <!-- <el-button
                  v-if="filterPermission('engineering:contract:type:xxx')"
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
import componentTree from '@/components/yunlin-table/search/component-tree'
import {
  getEngineeringContractTypeTree,
  getEngineeringContractTypePageList,
  deleteEngineeringContractType
} from '@/api/engineering/contractType'

export default {
  name: 'Tabel',
  components: { componentTree },
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {}
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
        // 类型名称
        { prop: 'typeName', label: 'contractType.typeName' },
        // 上级类别
        { prop: 'ptypeName', label: 'contractType.ptypeName', width: '160' }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        name: ''
      }
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringContractTypePageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringContractType
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringContractType
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      this.componentTreeConfig = {
        request: getEngineeringContractTypeTree,
        requestParams: {},
        treeDataTranslate: null,
        treeProps: { label: 'label', children: 'children' },
        treeNodeKey: 'id',
        mergeData: [
          { source: 'id', target: 'pid' },
          { source: 'label', target: 'ptypeName' }
        ]
      }
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table', 'component-tree'] }) {
      const { pid, ptypeName } = this.tableSearchParams
      this.$pageSwitch('form', { pageType: 'create', ...options, pid, ptypeName })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table', 'component-tree'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    deleteCallback() {
      this.$refs['componentTree'].init()
    },
    // 清除
    clearHandle() {
      const { tableName } = this.tableConfig
      this.tableSearchParams = {
        name: ''
      }
      this.$nextTick(() => {
        this.$refs['componentTree'].init()
        this.$refs[tableName].clearHandle()
      })
    },
    // 重置
    searchResetHandle() {
      const { tableName } = this.tableConfig
      this.tableSearchParams = {
        name: ''
      }
      this.$nextTick(() => {
        this.$refs['componentTree'].init()
        this.$refs[tableName].searchResetHandle()
      })
    }
  }
}
</script>
