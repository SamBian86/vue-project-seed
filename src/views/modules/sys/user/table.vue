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
              v-model="tableSearchParams.username"
              :placeholder="$t('user.username')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.gender"
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
            <search-tree :config="searchTreeConfig" @table-params-merge="tableParamsMerge"></search-tree>
          </el-form-item>

          <!-- 查询 -->
          <el-form-item>
            <el-button v-if="filterPermission('sys:user:view')" :size="tableConfig.tableSearchSize" @click="searchHandle()">
              {{ $t('query') }}
            </el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:user:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item>-->
          <!-- 导出 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:user:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >
              {{ $t('export') }}
            </el-button>
          </el-form-item>
          <!-- 批量删除 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:user:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item>
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('sys:user:xxx')"
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
              v-if="filterPermission('sys:user:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('sys:user:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >
              {{ $t('delete') }}
            </el-button>
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
import { getUserAll, deleteUser, exportUser } from '@/api/sys/user'
import { getSysDeptListAll } from '@/api/sys/dept'
import searchTree from '@/components/yunlin-table/search/search-tree'

export default {
  name: 'Tabel',
  components: { searchTree },
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
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 用户名
        { prop: 'username', label: 'user.username', width: '150', align: 'center', sortable: true },
        // 所属部门
        { prop: 'deptName', label: 'user.deptName', align: 'center' },
        // 邮箱
        { prop: 'email', label: 'user.email', align: 'center' },
        // 手机号
        { prop: 'mobile', label: 'user.mobile', width: '150', align: 'center', sortable: true },
        // 性别
        {
          prop: 'gender',
          label: 'user.gender',
          width: '80',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'gender',
            type: 'text',
            tagConfig: this.dictDataForComponent('gender', { dictLabel: 'name', dictValue: 'value' })
          }
        },
        // 状态
        {
          prop: 'status',
          label: 'user.status',
          width: '80',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'status',
            tagSize: 'small',
            tagConfig: [
              {
                value: 0,
                type: 'danger',
                name: this.$t('user.status0')
              },
              {
                value: 1,
                type: 'success',
                name: this.$t('user.status1')
              }
            ]
          }
        },
        // 创建时间
        { prop: 'createDate', label: 'user.createDate', width: '160', align: 'center', sortable: true }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        username: '',
        gender: '',
        deptId: ''
      }
      // 配置列表请求
      this.tableHandle.list.api = getUserAll
      // 配置导出功能
      this.tableHandle.export.api = exportUser
      // 配置删除功能
      this.tableHandle.delete.api = deleteUser
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteUser
      // console.log('table page created')
    },
    genrateI18nSearchItems() {
      this.searchTreeConfig = {
        request: getSysDeptListAll,
        requestParams: {},
        treeDataTranslate: null,
        treeDataFilter: true,
        treeDataFilterKey: 'name',
        i18nDefault: 'dept.title',
        treeProps: { label: 'name', children: 'children' },
        treeNodeKey: 'id',
        mergeData: [{ source: 'id', target: 'deptId', name: 'name' }]
      }
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    }
  }
}
</script>
