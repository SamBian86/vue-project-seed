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
        <el-form
          class="table-search-form"
          :inline="true"
          :model="tableSearchParams"
          @keyup.enter.native="clearHandle"
        >
          <!-- <el-form-item>
            <el-input
              v-model="tableSearchParams.mobile"
              :placeholder="$t('sms.mobile')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>-->
          <!-- 查询 -->
          <!-- <el-form-item>
            <el-button :size="tableConfig.tableSearchSize" @click="clearHandle">{{ $t('query') }}</el-button>
          </el-form-item>-->
          <!-- 创建 -->
          <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="smsConfigHandle()"
            >{{ $t('sms.config') }}</el-button>
          </el-form-item>

          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <el-form-item>
            <el-button
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
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
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="100"
        >
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="smsConfigEditHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
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
      <config-message
        :drawer-data="drawerData"
        @drawer-close-by-child="drawerCloseByChild"
        v-on="$listeners"
      ></config-message>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getMessageSmsPageList, deleteMessageSms } from '@/api/message/sms'
import configMessage from './config'

export default {
  name: 'Tabel',
  components: { configMessage },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
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
      // this.tableConfig.hasPagination = false
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 平台类型
        {
          prop: 'platform',
          label: 'sms.platform',
          width: '160',
          align: 'center',
          sortable: true,
          component: 'toolTag',
          componentConfig: {
            prop: 'platform',
            type: 'text',
            tagSize: 'small',
            tagConfig: [
              {
                value: 1,
                name: this.$t('sms.platform1')
              },
              {
                value: 2,
                name: this.$t('sms.platform2')
              },
              {
                value: 3,
                name: this.$t('sms.platform3')
              }
            ]
          }
        },
        // 短信编码
        {
          prop: 'smsCode',
          label: 'sms.smsCode',
          width: '100',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'smsCode',
            type: 'text',
            tagConfig: this.dictDataForComponent('smsType', { dictLabel: 'name', dictValue: 'value' })
          }
        },
        // 备注
        { prop: 'remark', label: 'sms.remark' },
        // 创建时间
        { prop: 'createDate', label: 'sms.createDate', width: '160', align: 'center', sortable: true }
      ]
      // 是否填充查询条件为空
      this.tableConfig.searchFillEmpty = true
      this.tableSearchParams = {
        mobile: '',
        status: ''
      }
      // 配置列表请求
      this.tableHandle.list.api = getMessageSmsPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteMessageSms
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteMessageSms
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
    // 打开drawer组件方法 新增配置
    smsConfigHandle() {
      this.setDrawerData({ data: { pageType: 'create', id: '', formDataUpdate: false } })
      this.setDrawerTitle(this.$t('sms.config'))
      this.drawerVisibleHandle()
    },
    smsConfigEditHandle(row) {
      this.setDrawerData({ data: { pageType: 'edit', id: row.id, formDataUpdate: true } })
      this.setDrawerTitle(this.$t('sms.editConfig'))
      this.drawerVisibleHandle()
    },
    drawerClosed() {
      // drawer关闭以后父页面需要的操作
      this.searchHandle()
    }
  }
}
</script>
