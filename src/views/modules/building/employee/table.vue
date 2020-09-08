<template>
  <div class="drawer-container">
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
              @keyup.enter.native="clearHandle"
            >
              <el-form-item>
                <el-input
                  v-model="tableSearchParams.nameOrPhone"
                  :placeholder="$t('buildingWorker.nameOrPhone')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="tableSearchParams.roleId"
                  :placeholder="$t('buildingWorker.roleId')"
                  :size="tableConfig.tableSearchSize"
                  clearable
                  @clear="clearHandle"
                >
                  <el-option
                    v-for="(item, index) in roleList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 查询 -->
              <el-form-item>
                <el-button
                  v-if="filterPermission('building:worker:view')"
                  :size="tableConfig.tableSearchSize"
                  @click="clearHandle"
                >{{ $t('query') }}</el-button>
              </el-form-item>
              <!-- 创建 -->
              <!-- <el-form-item>
                <el-button
                  v-if="filterPermission('building:worker:save')"
                  type="primary"
                  :size="tableConfig.tableSearchSize"
                  @click="createHandle()"
                >
                  {{ $t('add') }}
                </el-button>
              </el-form-item>-->
              <!-- 下载模板 -->
              <!--<el-form-item>
            <el-button
              v-if="filterPermission('building:worker:downloadExcel')"
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
            <button-import v-if="filterPermission('building:worker:importExcel')" :config="importConfig"></button-import>
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
              v-if="filterPermission('building:worker:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
              </el-form-item>-->
              <!-- 批量删除 -->
              <!-- <el-form-item>
                <el-button
                  v-if="filterPermission('building:worker:delete')"
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
              v-if="filterPermission('building:worker:xxx')"
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
                <!-- 上下架 -->
                <!--<el-button
              v-if="filterPermission('building:worker:display')"
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
                <!-- 修改 -->
                <el-button
                  v-if="filterPermission('building:worker:set') && scope.row.buildingWorkerSign === 0"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="setHandle(scope.row)"
                >{{ $t('buildingWorker.set') }}</el-button>
                <el-button
                  v-if="filterPermission('building:worker:set') && scope.row.buildingWorkerSign === 1"
                  type="text"
                  disabled
                  :size="tableConfig.tableSearchSize"
                >{{ $t('buildingWorker.already') }}</el-button>
                <!-- 单个删除 -->
                <!-- <el-button
                  v-if="filterPermission('building:worker:delete')"
                  type="text"
                  :size="tableConfig.tableSearchSize"
                  @click="deleteHandle([scope.row.id])"
                >
                  {{ $t('delete') }}
                </el-button>-->
                <!-- 上移 -->
                <!--<el-button
              v-if="filterPermission('building:worker:exchange') && scope.$index !== 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="upHandle(scope.row, scope.$index)"
                >{{ $t('up') }}</el-button>-->
                <!-- 下移 -->
                <!--<el-button
              v-if="filterPermission('building:worker:exchange') && scope.$index !== limit - 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="downHandle(scope.row, scope.$index)"
                >{{ $t('down') }}</el-button>-->
                <!-- 单个操作 -->
                <!-- <el-button
                  v-if="filterPermission('building:worker:xxx')"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import { getSysDeptListAll } from '@/api/sys/dept'
import { getSysRoleList } from '@/api/sys/role'
import { getPropertyEmployeeSelectPageList } from '@/api/property/employee'
import componentTree from '@/components/yunlin-table/search/component-tree'

export default {
  name: 'Tabel',
  components: { componentTree },
  mixins: [pageMixin, tableDefaultMixin, drawerMixin],
  data() {
    return {
      userId: '',
      roleList: []
      // limit: 0
    }
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
  },
  activated() {
    // console.log('table activated')
    this.init()
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
      const { userId } = this.$attrs.page_drawer_data
      this.userId = userId
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
        // 员工姓名
        { prop: 'name', label: 'buildingWorker.name', width: '140' },
        // 手机号
        { prop: 'phoneNumber', label: 'buildingWorker.phoneNumber', width: '140' },
        // 岗位
        { prop: 'roleName', label: 'buildingWorker.roleName', width: '140' },
        // 所属组织
        { prop: 'deptName', label: 'buildingWorker.deptName' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getPropertyEmployeeSelectPageList
      // this.tableHandle.list.callback = this.listCallback
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
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      this.getSysRoleList()
      this.componentTreeConfig = {
        request: getSysDeptListAll,
        requestParams: {},
        treeDataTranslate: null,
        treeProps: { label: 'name', children: 'children' },
        treeNodeKey: 'id',
        mergeData: [
          { source: 'id', target: 'deptId' },
          { source: 'name', target: 'name' },
          { source: 'parentName', target: 'parentName' }
        ]
      }
    },
    getSysRoleList() {
      getSysRoleList().then((response) => {
        this.roleList = response
      })
    },
    setHandle(row) {
      this.userId = row.id
      this.$drawerCloseByChild({
        userName: row.name,
        userId: row.id
      })
    }
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // }
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
