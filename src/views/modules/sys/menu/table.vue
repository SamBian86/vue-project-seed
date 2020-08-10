<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      :config="tableConfig"
      :handle="tableHandle"
      :searchparams="tableSearchParams"
      v-bind="$attrs"
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
            <el-button
              v-if="filterPermission('sys:menu:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
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
            <el-button
              v-if="filterPermission('sys:menu:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <el-button
              v-if="filterPermission('sys:menu:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle(scope.row)"
            >{{ $t('delete') }}</el-button>
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
import { getMenuList, deleteMenu } from '@/api/sys/menu'
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
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.hasPagination = false
      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        { prop: 'name', label: 'menu.name', minWidth: '110' },
        {
          prop: 'icon',
          label: 'menu.icon',
          width: '80',
          align: 'center',
          component: 'toolSvg',
          componentConfig: { svgName: 'icon' }
        },
        {
          prop: 'type',
          label: 'menu.type',
          width: '80',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'type',
            name: 'name',
            tagSize: 'small',
            tagConfig: [
              {
                value: 0,
                name: '菜单'
              },
              {
                value: 1,
                type: 'info',
                name: '按钮'
              }
            ]
          }
        },
        { prop: 'sort', label: 'menu.sort', width: '50', align: 'center' },
        { prop: 'url', label: 'menu.url' },
        { prop: 'permissions', label: 'menu.permissions' }
      ]
      // 配置列表请求
      this.tableHandle.list.api = getMenuList
      // 配置删除功能
      this.tableHandle.delete.api = deleteMenu
      // console.log('table page created')
      this.generateTable()
    },
    createHandle(options = { componentNames: ['yunlin-table', 'popover-tree'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table', 'popover-tree'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    }
  }
}
</script>
