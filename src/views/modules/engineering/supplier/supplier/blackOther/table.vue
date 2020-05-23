<template>
  <div class="drawer-container">
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
            <el-button
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>-->
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>-->
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('xxx:xxx:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 拉黑当前供应商 -->
          <el-form-item>
            <el-button
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="blackHandle()"
            >{{ $t('supplier.blackCurrent') }}</el-button>
          </el-form-item>
          <!-- 全部拉黑 -->
          <el-form-item>
            <el-button
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="blackAllHandle()"
            >{{ $t('supplier.blackAll') }}</el-button>
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
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: '国际化',
                request: null
              })"
            >{{ $t('ddd.ddd') }}</el-button>
          </template>
        </el-table-column>
      </template>-->
    </yunlin-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getEngineeringSupplierListBySupplierId, setEngineeringSupplierBlack } from '@/api/engineering/supplier'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, drawerMixin, tableDefaultMixin],
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
      const { id } = this.$attrs.page_drawer_data
      // 配置查询区域i18n相关select数据
      // this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.hasPagination = false
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 供应商名称
        { prop: 'name', label: 'supplier.name', width: '200', align: 'center' },
        // 供应商类别
        { prop: 'supplierTypeNames', label: 'supplier.supplierTypeNames', align: 'center' },
        // 法人
        { prop: 'supplierCorporation', label: 'supplier.supplierCorporation', width: '160', align: 'center' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      this.tableSearchParams.supplierId = id
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringSupplierListBySupplierId
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
    },
    genrateI18nSearchItems() {
      // XXX
      // this.smsStatus = [
      //   { label: this.$t('aaa'), value: 0 },
      //   { label: this.$t('aaa'), value: 1 }
      // ]
    },
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // }
    // 拉黑当前供应商
    blackHandle() {
      const { supplierId } = this.tableSearchParams
      this.customHandle({
        data: { blackType: 1, id: supplierId },
        i18nRequestMessage: 'supplier.blackCurrent',
        request: this.setEngineeringSupplierBlack,
        successCallBack: this.$drawerCloseByChild
      })
    },
    // 拉黑同一法人供应商
    blackAllHandle() {
      const { supplierId } = this.tableSearchParams
      this.customHandle({
        data: { blackType: 0, id: supplierId },
        i18nRequestMessage: 'supplier.blackMessage',
        request: this.setEngineeringSupplierBlack,
        successCallBack: this.$drawerCloseByChild
      })
    },
    setEngineeringSupplierBlack() {
      return setEngineeringSupplierBlack
    }
  }
}
</script>
