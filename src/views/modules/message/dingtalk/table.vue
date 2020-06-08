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
          @keyup.enter.native="searchHandle"
        >
          <!-- 查询 -->
          <!-- <el-form-item>
            <el-button :size="tableConfig.tableSearchSize" @click="searchHandle()">{{ $t('query') }}</el-button>
          </el-form-item>-->
          <!-- 创建 -->
          <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 配置 -->
          <el-form-item>
            <el-button
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="dingtalkConfigHandle()"
            >{{ $t('dingtalk.config') }}</el-button>
          </el-form-item>
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >
              {{ $t('export') }}
            </el-button>
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
          width="200"
        >
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个操作 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="sendDingtalkHandle(scope.row)"
            >{{ $t('dingtalk.send') }}</el-button>
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
      <component
        :is="drawerComponent"
        :drawer-data="drawerData"
        @drawer-close-by-child="drawerCloseByChild"
        v-on="$listeners"
      ></component>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getMessageDingtalkPageList, deleteMessageDingtalk } from '@/api/message/dingtalk'
import configDingtalk from './config'
import sendDingtalk from './send'

export default {
  name: 'Tabel',
  components: { configDingtalk, sendDingtalk },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        config: configDingtalk,
        send: sendDingtalk
      }
    }
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
      // this.tableConfig.hasPagination = false
      // this.tableConfig.lazy = true
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 审批类型
        {
          prop: 'type',
          label: 'dingtalk.type',
          width: '120',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'type',
            type: 'text',
            tagSize: 'small',
            tagConfig: [
              {
                value: 0,
                name: this.$t('dingtalk.type0')
              },
              {
                value: 1,
                name: this.$t('dingtalk.type1')
              },
              {
                value: 2,
                name: this.$t('dingtalk.type2')
              },
              {
                value: 3,
                name: this.$t('dingtalk.type3')
              }
            ]
          }
        },
        // 消息链接路径
        { prop: 'messageUrl', label: 'dingtalk.messageUrl', width: '200', align: 'center' },
        // 参数1
        { prop: 'params1', label: 'dingtalk.params1', align: 'center' },
        // 参数2
        { prop: 'params2', label: 'dingtalk.params2', align: 'center' },
        // 参数3
        { prop: 'params3', label: 'dingtalk.params3', align: 'center' },
        // 参数4
        { prop: 'params4', label: 'dingtalk.params4', align: 'center' },
        // 创建时间
        { prop: 'createDate', label: 'dingtalk.createDate', width: '160', align: 'center', sortable: true }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getMessageDingtalkPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteMessageDingtalk
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteMessageDingtalk
      // console.log('table page created')
      this.generateTable()
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
    dingtalkConfigHandle() {
      this.setDrawerComponent('config')
      this.setDrawerData({ data: { pageType: 'edit', formDataUpdate: true } })
      this.setDrawerTitle(this.$t('dingtalk.config'))
      this.drawerVisibleHandle()
    },
    sendDingtalkHandle(row) {
      this.setDrawerComponent('send')
      this.setDrawerData({ data: { pageType: 'create', id: row.id } })
      this.setDrawerTitle(this.$t('dingtalk.send'))
      this.drawerVisibleHandle()
    }
  }
}
</script>
