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
            <el-form-item>
              <el-input
                v-model="tableSearchParams.creatorName"
                :placeholder="$t('logLogin.creatorName')"
                :size="tableConfig.tableSearchSize"
                clearable
                @clear="clearHandle"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="tableSearchParams.status"
                :placeholder="$t('logLogin.status')"
                :size="tableConfig.tableSearchSize"
                clearable
                @clear="clearHandle"
              >
                <el-option
                  v-for="(item, index) in logLoginStatus"
                  :key="index"
                  :label="item.label"
                  :value="parseInt(item.value)"
                ></el-option>
              </el-select>
            </el-form-item>
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
              v-if="filterPermission('xxx:xxx:delete')"
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
import { getLogLoginList, exportLogLogin } from '@/api/sys/logLogin'

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
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 用户名
        { prop: 'creatorName', label: 'logLogin.creatorName', width: '160', align: 'center' },
        // 操作类型
        {
          prop: 'operation',
          label: 'logLogin.operation',
          width: '160',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'operation',
            tagSize: 'small',
            tagConfig: [
              {
                value: 0,
                type: 'success',
                name: this.$t('logLogin.operation0')
              },
              {
                value: 1,
                type: 'danger',
                name: this.$t('logLogin.operation1')
              }
            ]
          }
        },
        // 状态
        {
          prop: 'status',
          label: 'logLogin.status',
          width: '120',
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
                name: this.$t('logLogin.status0')
              },
              {
                value: 1,
                type: 'success',
                name: this.$t('logLogin.status1')
              },
              {
                value: 2,
                type: 'warning',
                name: this.$t('logLogin.status2')
              }
            ]
          }
        },
        // 操作IP
        { prop: 'ip', label: 'logLogin.ip', width: '160', align: 'center' },
        // user-agent
        { prop: 'userAgent', label: 'logLogin.userAgent', align: 'center' },
        // 创建时间
        { prop: 'createDate', label: 'logLogin.createDate', width: '200', align: 'center' }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        creatorName: '',
        status: ''
      }
      // 配置列表请求
      this.tableHandle.list.api = getLogLoginList
      // 配置导出功能
      this.tableHandle.export.api = exportLogLogin
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // 登录日志状态
      this.logLoginStatus = [
        { label: this.$t('logLogin.status0'), value: 0 },
        { label: this.$t('logLogin.status1'), value: 1 },
        { label: this.$t('logLogin.status2'), value: 2 }
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
