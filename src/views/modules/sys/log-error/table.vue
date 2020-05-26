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
              :placeholder="$t('logError.module')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
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
              v-if="filterPermission('xxx:xxx:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
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
          width="100"
        >
          <template slot-scope="scope">
            <!-- <el-button
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
            >{{ $t('delete') }}</el-button>-->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="errorInfoHandle(scope.row)"
            >{{ $t('logError.errorInfo') }}</el-button>
          </template>
        </el-table-column>
      </template>
    </yunlin-table>

    <yunlin-drawer
      ref="yunlinDrawer"
      :config="drawerConfig"
      v-bind="$attrs"
      @drawer-closed="drawerClosed"
      v-on="$listeners"
    >
      <div class="drawer-text" v-html="drawerData.errorInfo"></div>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getLogErrorList, exportLogError } from '@/api/sys/logError'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
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
      // this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 模块名称
        { prop: 'module', label: 'logError.module', width: '160', align: 'center' },
        // 请求URI
        { prop: 'requestUri', label: 'logError.requestUri', align: 'center' },
        // 请求方式
        { prop: 'requestMethod', label: 'logError.requestMethod', width: '100', align: 'center' },
        // 请求参数
        { prop: 'requestParams', label: 'logError.requestParams', align: 'center' },
        // 操作IP
        { prop: 'ip', label: 'logError.ip', width: '140', align: 'center' },
        // 用户代理
        { prop: 'userAgent', label: 'logError.userAgent', align: 'center' },
        // 创建时间
        { prop: 'createDate', label: 'logError.createDate', width: '160', align: 'center', sortable: true }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        module: ''
      }
      // 配置列表请求
      this.tableHandle.list.api = getLogErrorList
      // 配置导出功能
      this.tableHandle.export.api = exportLogError
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {},
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // }
    errorInfoHandle(row) {
      this.setDrawerData(row)
      this.setDrawerTitle(this.$t('logError.errorInfo'))
      this.drawerVisibleHandle()
    }
  }
}
</script>
