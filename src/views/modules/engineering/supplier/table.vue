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
          <el-form-item>
            <el-input
              v-model="tableSearchParams.supplierName"
              :placeholder="$t('supplier.name')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.supplierGrade"
              :placeholder="$t('supplier.supplierGrade')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in getDictByType('supplier_grade')"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <search-tree :config="searchTreeConfig" @table-params-merge="tableParamsMerge"></search-tree>
          </el-form-item>

          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:supplier:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:supplier:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:supplier:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:supplier:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
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
          align="left"
          header-align="center"
          fixed="right"
          width="350"
        >
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('engineering:supplier:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 修改联系人 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="supplierLinkmanHandle(scope.row)"
            >{{ $t('supplier.hisSupplierLinkman') }}</el-button>
            <!-- 资质 -->
            <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="qualificationsHandle(scope.row)"
            >{{ $t('supplier.qualifications') }}</el-button>
            <!-- 单个拉黑 -->
            <el-button
              v-if="scope.row.isBlacklist !== 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: { blackType: 1, id: scope.row.id},
                i18nRequestMessage: 'supplier.blackCurrent',
                request: setEngineeringSupplierBlack
              })"
            >{{ $t('supplier.black') }}</el-button>
            <!-- 其他供应商拉黑列表 -->
            <el-button
              v-if="scope.row.isBlacklist !== 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="blackOtherHandle(scope.row)"
            >{{ $t('supplier.blackOther') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('engineering:supplier:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >{{ $t('delete') }}</el-button>
            <!-- <el-button
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: '国际化',
                request: null
              })"
            >{{ $t('ddd.ddd') }}</el-button>-->
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
      ></component>
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import {
  getEngineeringSupplierPageList,
  deleteEngineeringSupplier,
  setEngineeringSupplierBlack
} from '@/api/engineering/supplier'
import { getEngineeringSupplierTypeTree } from '@/api/engineering/supplierType'
import searchTree from '@/components/yunlin-table/search/search-tree'
import blackOther from './supplier/blackOther'
import linkHis from './supplier/linkhis'
import qualifications from './supplier/qualifications'
export default {
  name: 'Tabel',
  components: { searchTree, blackOther, linkHis, qualifications },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        black: blackOther,
        linkhis: linkHis,
        qualifications: qualifications
      }
    }
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
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
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 供应商名称
        { prop: 'name', label: 'supplier.name', align: 'center' },
        // 联系人
        { prop: 'supplierLinkman', label: 'supplier.supplierLinkman', width: '120', align: 'center' },
        // 联系电话
        { prop: 'supplierLinkphone', label: 'supplier.supplierLinkphone', width: '160', align: 'center' },
        // 供应商类别
        { prop: 'supplierTypeNames', label: 'supplier.supplierTypeNames', align: 'center' },
        // 供应商评级
        { prop: 'supplierGradeName', label: 'supplier.supplierGradeName', align: 'center' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringSupplierPageList
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteEngineeringSupplier
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteEngineeringSupplier
      // console.log('table page created')
    },
    genrateI18nSearchItems() {
      // XXX
      this.searchTreeConfig = {
        request: getEngineeringSupplierTypeTree,
        requestParams: {},
        treeDataTranslate: null,
        treeDataFilter: true,
        treeDataFilterKey: '',
        i18nDefault: 'supplier.supplierTypeIds',
        treeProps: { label: 'typeName', children: 'children' },
        treeNodeKey: '',
        mergeData: [{ source: 'id', target: 'supplierTypeId', name: 'typeName' }]
      }
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    // 拉黑方法
    setEngineeringSupplierBlack() {
      return setEngineeringSupplierBlack
    },
    // 同一法人其他供应商列表
    blackOtherHandle(row) {
      this.setDrawerComponent('black')
      this.setDrawerData(row)
      this.setDrawerTitle(this.$t('supplier.blackOtherSame'))
      this.drawerVisibleHandle()
    },
    supplierLinkmanHandle(row) {
      this.setDrawerComponent('linkhis')
      this.setDrawerData(row)
      this.setDrawerTitle(this.$t('supplierLinkhis.title'))
      this.drawerVisibleHandle()
    },
    qualificationsHandle(row) {
      this.setDrawerComponent('qualifications')
      this.setDrawerData(row)
      this.setDrawerTitle(this.$t('supplierQualifications.title'))
      this.drawerVisibleHandle()
    }
  }
}
</script>
