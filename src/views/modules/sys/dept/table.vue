<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" :lg="6" :md="6" :sm="24" :xs="24">
        <component-tree
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
            <el-form
              class="table-search-form"
              :inline="true"
              :model="tableSearchParams"
              @keyup.enter.native="searchHandle"
            >
              <el-form-item>
                <el-input
                  v-model="tableSearchParams.name"
                  :placeholder="$t('dept.name')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="tableSearchParams.type"
                  :placeholder="$t('dept.type')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                >
                  <el-option
                    v-for="(item, index) in getDictByType('deptType')"
                    :key="index"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="tableSearchParams.parentName"
                  :placeholder="$t('dept.parentName')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="tableSearchParams.contactNameOrPhone"
                  :placeholder="$t('dept.contactNameOrPhone')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                ></el-input>
              </el-form-item>
              <!-- 查询 -->
              <el-form-item>
                <el-button
                  v-if="filterPermission('sys:dept:view')"
                  :size="tableConfig.tableSearchSize"
                  @click="searchHandle()"
                >{{ $t('query') }}</el-button>
              </el-form-item>
              <!-- 创建 -->
              <el-form-item>
                <el-button
                  v-if="filterPermission('sys:dept:save')"
                  type="primary"
                  :size="tableConfig.tableSearchSize"
                  @click="createHandle()"
                >{{ $t('add') }}</el-button>
              </el-form-item>
              <!-- 下载模板 -->
              <!--<el-form-item>
            <el-button
              v-if="filterPermission('sys:dept:save')"
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
              <!--<el-form-item>
            <el-button
              v-if="filterPermission('sys:dept:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
              </el-form-item>-->
              <!-- 批量删除 -->
              <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:dept:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
              </el-form-item>-->
              <!-- 批量操作 -->
              <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:dept:xxx')"
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
                <!-- 上下架 -->
                <!--<el-button
              v-if="filterPermission('sys:dept:display')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: {
                  id: scope.row.id,
                  display: scope.row.XXX === 0 ? 1 : 0
                },
                i18nRequestMessage: scope.row.XXX === 0 ? 'on' : 'off',
                request: displayHandle
              })"
                >{{ scope.row.XXX === 0 ? $t('on') : $t('off') }}</el-button>-->
                <!-- 详情 -->
                <el-button
                  v-if="filterPermission('sys:dept:view')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="detailHandle(scope.row)"
                >{{ $t('detail') }}</el-button>
                <!-- 修改 -->
                <el-button
                  v-if="filterPermission('sys:dept:update')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="editHandle(scope.row)"
                >{{ $t('update') }}</el-button>
                <!-- 单个删除 -->
                <el-button
                  v-if="filterPermission('sys:dept:delete')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="deleteHandle({ id: scope.row.id })"
                >{{ $t('delete') }}</el-button>
                <!-- 上移 -->
                <!--<el-button
              v-if="filterPermission('sys:dept:exchange') && scope.$index !== 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="upHandle(scope.row, scope.$index)"
                >{{ $t('up') }}</el-button>-->
                <!-- 下移 -->
                <!--<el-button
              v-if="filterPermission('sys:dept:exchange') && scope.$index !== limit - 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="downHandle(scope.row, scope.$index)"
                >{{ $t('down') }}</el-button>-->
                <!-- 单个操作 -->
                <!--<el-button
              v-if="filterPermission('sys:dept:xxx')"
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
import { getSysDeptPageList, deleteSysDept, getSysDeptListAll } from '@/api/sys/dept'
import componentTree from '@/components/yunlin-table/search/component-tree'

export default {
  name: 'Tabel',
  components: { componentTree },
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      // limit: 0
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
    // listCallback() {
    //   const list = this.getTableData()
    //   this.limit = list.length
    // },
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
        // 组织名称
        { prop: 'name', label: 'dept.name', width: '200' },
        // 组织类型
        {
          prop: 'type',
          label: 'dept.type',
          width: '140',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'type',
            type: 'text',
            tagConfig: this.dictDataForComponent('deptType', { dictLabel: 'name', dictValue: 'value' })
          }
        },
        // 上级组织
        { prop: 'parentName', label: 'dept.parentName', width: '200' },
        // 联系人
        { prop: 'contactName', label: 'dept.contactName', width: '120' },
        // 联系电话
        { prop: 'contactPhone', label: 'dept.contactPhone' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getSysDeptPageList
      // this.tableHandle.list.callback = this.listCallback
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteSysDept
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteSysDept
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      this.componentTreeConfig = {
        request: getSysDeptListAll,
        requestParams: {},
        treeDataTranslate: null,
        treeProps: { label: 'name', children: 'children' },
        treeNodeKey: 'id',
        mergeData: [
          { source: 'id', target: 'deptId' }
          // { source: 'name', target: 'name' },
          // { source: 'parentName', target: 'parentName' }
        ]
      }
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table', 'popover-tree', 'component-tree'] }) {
      this.show = false
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table', 'popover-tree', 'component-tree'] }) {
      this.show = false
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    }
    // 显示次序更替
    // exchangeHandle() {
    // return XXX
    // }
    // 上下架
    // displayHandle() {
    // return XXX
    // }
  }
}
</script>
