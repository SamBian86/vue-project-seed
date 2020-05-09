<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      :config="tableConfig"
      :handle="tableHandle"
      :searchparams="tableSearchParams"
      v-bind="$attrs"
      @table-selection-listener="tableSelectionListener"
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
              v-model="tableSearchParams.module"
              :placeholder="$t('logOperation.module')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.status"
              :placeholder="$t('logOperation.status')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in logOperationStatus"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button :size="tableConfig.tableSearchSize" @click="searchHandle()">{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>-->
          <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:delete') && tableSections.length"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
        </el-form>
      </template>
      <!-- 操作区域 -->
      <!-- <template slot="operate">
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              v-if="filterPermission('xxx:xxx:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <el-button
              v-if="filterPermission('xxx:xxx:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </template>-->
    </yunlin-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getLogOperationList, exportLogOperation } from '@/api/sys/logOperation'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
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
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 用户名
        { prop: 'creatorName', label: 'logOperation.creatorName', align: 'center' },
        // 用户操作
        { prop: 'operation', label: 'logOperation.operation', align: 'center' },
        // 模块名称
        { prop: 'module', label: 'logOperation.module', align: 'center' },
        // 请求URI
        { prop: 'requestUri', label: 'logOperation.requestUri', align: 'center' },
        // 请求方式
        { prop: 'requestMethod', label: 'logOperation.requestMethod', align: 'center' },
        // 请求参数
        { prop: 'requestParams', label: 'logOperation.requestParams', align: 'center' },
        // 请求时长 sortable
        { prop: 'requestTime', label: 'logOperation.requestTime', width: '120', align: 'center', sortable: true },
        // 状态 sortable
        {
          prop: 'status',
          label: 'logOperation.status',
          width: '120',
          align: 'center',
          sortable: true,
          component: 'toolTag',
          componentConfig: {
            prop: 'status',
            name: 'name',
            tagSize: 'small',
            tagConfig: [
              {
                value: 0,
                type: 'danger',
                name: this.$t('logOperation.status0')
              },
              {
                value: 1,
                type: 'success',
                name: this.$t('logOperation.status1')
              }
            ]
          }
        },
        // 操作IP
        { prop: 'ip', label: 'logOperation.ip', align: 'center' },
        // User-Agent
        { prop: 'userAgent', label: 'logOperation.userAgent', align: 'center' },
        // 创建时间
        { prop: 'createDate', label: 'logOperation.createDate', align: 'center' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getLogOperationList
      // 配置导出功能
      this.tableHandle.export.api = exportLogOperation
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
    },
    genrateI18nSearchItems() {
      // 操作日志状态
      this.logOperationStatus = [
        { label: this.$t('logOperation.status0'), value: 0 },
        { label: this.$t('logOperation.status1'), value: 1 }
      ]
    }
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // }
  }
}
</script>
