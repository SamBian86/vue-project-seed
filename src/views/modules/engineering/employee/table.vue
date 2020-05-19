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
              v-model="tableSearchParams.phoneNumberOrName"
              :placeholder="$t('search.phoneNumberOrName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <search-tree :config="searchTreeConfig" @table-params-merge="tableParamsMerge"></search-tree>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.positionId"
              :placeholder="$t('employee.positionName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option v-for="(item, index) in positionList" :key="index" :label="item.jobName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.sex"
              :placeholder="$t('user.gender')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in getDictByType('gender')"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.relationshipId"
              :placeholder="$t('employee.relationshipId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in relationshipItems"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:employee:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >
              {{ $t('query') }}
            </el-button>
          </el-form-item>
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:employee:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item>
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:employee:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
              >{{ $t('export') }}</el-button
            >
          </el-form-item> -->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:employee:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item> -->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:employee:xxx')"
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
              v-if="filterPermission('engineering:employee:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:employee:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >
              {{ $t('delete') }}
            </el-button>
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:employee:xxx')"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getEngineeringEmployeePageList, deleteEngineeringEmployee } from '@/api/engineering/employee'
import { getEngineeringJoblist } from '@/api/engineering/joblist'
import { getSysDeptListAll } from '@/api/sys/dept'
import searchTree from '@/components/yunlin-table/search/search-tree'

export default {
  name: 'Tabel',
  components: { searchTree },
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      positionList: []
    }
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
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.hasPagination = false
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 姓名
        { prop: 'name', label: 'employee.name', width: '120', align: 'center', sortable: true },
        // 手机号码
        { prop: 'phoneNumber', label: 'employee.phoneNumber', width: '140', align: 'center', sortable: true },
        // 性别
        {
          prop: 'sex',
          label: 'employee.sex',
          width: '80',
          align: 'center',
          sortable: true,
          component: 'toolTag',
          componentConfig: {
            prop: 'sex',
            type: 'text',
            tagConfig: this.dictDataForComponent('gender', { dictLabel: 'name', dictValue: 'value' })
          }
        },
        // 岗位
        { prop: 'positionName', label: 'employee.positionName', align: 'center', sortable: true },
        // 部门
        { prop: 'deptName', label: 'employee.deptName', align: 'center', sortable: true },
        // 状态
        {
          prop: 'status',
          label: 'employee.status',
          width: '140',
          align: 'center',
          sortable: true,
          component: 'toolTag',
          componentConfig: {
            prop: 'status',
            type: 'text',
            tagConfig: this.dictDataForComponent('employee_status', { dictLabel: 'name', dictValue: 'value' })
          }
        }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringEmployeePageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringEmployee
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringEmployee
      // console.log('table page created')
    },
    genrateI18nSearchItems() {
      this.searchTreeConfig = {
        request: getSysDeptListAll,
        requestParams: {},
        treeDataTranslate: null,
        treeDataFilter: true,
        treeDataFilterKey: 'name',
        i18nDefault: 'employee.deptName',
        treeProps: { label: 'name', children: 'children' },
        treeNodeKey: 'id',
        mergeData: [{ source: 'id', target: 'deptId', name: 'name' }]
      }
      getEngineeringJoblist().then(response => {
        this.positionList = response
      })

      this.relationshipItems = [
        { label: this.$t('employee.relationshipId0'), value: 0 },
        { label: this.$t('employee.relationshipId1'), value: 1 }
      ]
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    }
  }
}
</script>
