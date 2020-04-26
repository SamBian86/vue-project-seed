<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      :config="tableConfig"
      :handle="tableHandle"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 查询区域 -->
      <template slot="search">
        <el-form :inline="true" :model="tableConfig.searchParams" @keyup.enter.native="tableSearch">
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:menu:save')"
              type="primary"
              size="small"
              @click="handleCreate()"
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
              size="small"
              @click="handleEdit(scope.row)"
            >{{ $t('update') }}</el-button>
            <el-button
              v-if="filterPermission('sys:menu:delete')"
              type="text"
              size="small"
              @click="handleDelete(scope.row)"
            >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </template>
    </yunlin-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tableMixin from '@/mixins/table-mixin'
import { getMenuList, deleteMenu } from '@/api/sys/menu'
export default {
  name: 'Tabel',
  components: {},
  mixins: [tableMixin],
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
    // 是否显示树形数据
    this.tableConfig.rowKey = 'id'
    // 设置获取列表信息
    this.tableConfig.tableHead = [
      { prop: 'name', label: 'menu.name', minWidth: '110px' },
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
          value: 'type',
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
      { prop: 'url', label: 'menu.url', align: 'center' },
      { prop: 'permissions', label: 'menu.permissions', align: 'center' }
    ]
    // 配置列表请求
    this.tableHandle.getList = getMenuList
    // 配置删除功能
    this.tableHandle.delete = deleteMenu
    // console.log('table page created')
  },
  methods: {
    handleCreate(options = { pageUpdateNames: ['table', 'popover-tree'] }) {
      this.handleAny('form', { pageType: 'create', ...options })
    },
    // 编辑
    handleEdit(item, options = { pageUpdateNames: ['table', 'popover-tree'] }) {
      this.handleAny('form', { ...item, pageType: 'edit', ...options })
    }
  }
}
</script>
