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
          @keyup.enter.native="clearHandle"
        >
          <el-form-item>
            <el-input
              v-model="tableSearchParams.dictValue"
              :placeholder="$t('dict.dictValue')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.dictLabel"
              :placeholder="$t('dict.dictLabel')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="filterPermission('sys:dict:view')"
              :size="tableConfig.tableSearchSize"
              @click="clearHandle"
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
              v-if="filterPermission('sys:dict:delete')"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getDictDataList, deleteDictData } from '@/api/sys/dictData'

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
      const { id } = this.$attrs.page_drawer_data
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)
      this.tableSearchParams.dictTypeId = id

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        { prop: 'dictValue', label: 'dict.dictValue', width: '80', align: 'center' },
        { prop: 'dictLabel', label: 'dict.dictLabel', width: '150', align: 'center' },
        { prop: 'sort', label: 'dict.sort', width: '50', align: 'center' },
        { prop: 'remark', label: 'dict.remark', align: 'center' },
        { prop: 'createDate', label: 'dict.createDate', align: 'center' }
      ]
      // 配置列表请求
      this.tableHandle.list.api = getDictDataList
      // 配置删除功能
      this.tableHandle.delete.api = deleteDictData
      // 配置section删除功能
      this.tableHandle.deleteSection.api = deleteDictData
      // console.log('table page created')
      this.generateTable()
    },
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      const { dictTypeId } = this.tableSearchParams
      this.$pageSwitch('form', { pageType: 'create', ...options, dictTypeId })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      const { dictTypeId } = this.tableSearchParams
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options, dictTypeId })
    }
  }
}
</script>
