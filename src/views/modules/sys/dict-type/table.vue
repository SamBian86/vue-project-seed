<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      :config="tableConfig"
      :handle="tableHandle"
      v-bind="$attrs"
      @table-selection-listener="tableSelectionListener"
      v-on="$listeners"
    >
      <!-- 查询区域 -->
      <template slot="search">
        <el-form
          class="table-search-form"
          :inline="true"
          :model="tableConfig.searchParams"
          @keyup.enter.native="searchHandle"
        >
          <el-form-item>
            <el-input
              v-model="tableConfig.searchParams.dictName"
              :placeholder="$t('dict.dictName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableConfig.searchParams.dictType"
              :placeholder="$t('dict.dictType')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:dict:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:dict:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:dict:delete') && tableSections.length"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
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
              v-if="filterPermission('sys:dict:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <el-button
              v-if="filterPermission('sys:dict:delete')"
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
      <dict-data :drawer-data="drawerData"></dict-data>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getDictTypeList, deleteDictType } from '@/api/sys/dictType'
import dictData from '../dict-data'

export default {
  name: 'Tabel',
  components: { dictData },
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
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.tableType = 'selection'

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        { prop: 'dictName', label: 'dict.dictName', align: 'center' },
        {
          prop: 'dictType',
          label: 'dict.dictType',
          minWidth: '120',
          align: 'center',
          component: 'toolButton',
          componentConfig: { prop: 'dictType', buttonType: 'text', clickHandle: this.dictTypeClickHandle }
        },
        { prop: 'sort', label: 'dict.sort', width: '50', align: 'center' },
        { prop: 'remark', label: 'dict.remark', align: 'center' },
        { prop: 'createDate', label: 'dict.createDate', align: 'center' }
      ]
      // 配置列表请求
      this.tableHandle.list.api = getDictTypeList
      // 配置删除功能
      this.tableHandle.delete.api = deleteDictType
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteDictType
      // console.log('table page created')
    },
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    },
    // 点击字典类型
    dictTypeClickHandle(row) {
      this.setDrawerData(row)
      this.setDrawerTitle(row.dictName + '列表')
      this.drawerVisibleHandle()
    }
  }
}
</script>
