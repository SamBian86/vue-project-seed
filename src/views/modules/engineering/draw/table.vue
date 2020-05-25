<template>
  <div>
    <yunlin-table
      ref="yunlinTable"
      class="table-no-padding"
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
        <el-form class="table-search-form" :inline="true" :model="tableSearchParams" @keyup.enter.native="searchHandle">
          <el-form-item>
            <el-input
              v-model="tableSearchParams.budgetSubjectName"
              :placeholder="$t('draw.budgetSubjectName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.projectId"
              :placeholder="$t('draw.projectId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >
              {{ $t('query') }}
            </el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item> -->
          <!-- 打开draw -->
          <!-- <el-form-item>
            <el-button type="primary" :size="tableConfig.tableSearchSize" @click="XXXXXXHandle()">{{ $t('xxx') }}</el-button>
          </el-form-item> -->
          <!-- 下载模板 -->
          <!--<el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:save')"
              type="success"
              :size="tableConfig.tableSearchSize"
              @click="downloadHandle({
                i18nRequestMessage: 'downloadTemp',
                request: null,
                data: {excelType: 2}
              })"
            >{{ $t('downloadTemp') }}</el-button>
          </el-form-item>-->
          <!-- 导入 -->
          <!--<el-form-item>
            <button-import :config="importConfig"></button-import>
          </el-form-item>-->
          <!-- 清空选中 -->
          <!--<el-form-item>
            <el-button
              v-if="tableCurrent !== null"
              :size="tableConfig.tableSearchSize"
              @click="clearCurrentChange()"
            >{{ t('clearCurrent') }}</el-button>
          </el-form-item>-->
          <!-- 导出 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item> -->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('engineering:draw:xxx')"
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
        <el-table-column :label="$t('handle')" align="center" header-align="center" fixed="right" width="160">
          <template slot-scope="scope">
            <!-- 单个操作 -->
            <el-button type="text" :size="tableConfig.tableSearchSize" @click="drawingbudgetHandle(scope.row)">{{
              $t('draw.drawingbudget')
            }}</el-button>
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('engineering:draw:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button>
            <!-- 单个删除 -->
            <!-- <el-button
              v-if="filterPermission('engineering:draw:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >
              {{ $t('delete') }}
            </el-button> -->
            <!-- 单个操作 -->
            <!-- <el-button
              v-if="filterPermission('engineering:draw:xxx')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="
                customHandle({
                  data: [scope.row.id],
                  i18nRequestMessage: '国际化',
                  request: null
                })
              "
            >
              {{ $t('ddd.ddd') }}
            </el-button> -->
          </template>
        </el-table-column>
      </template>
    </yunlin-table>
    <yunlin-drawer ref="yunlinDrawer" :config="drawerConfig" v-bind="$attrs" @drawer-closed="drawerClosed" v-on="$listeners">
      <component :is="drawerComponent" :drawer-data="drawerData" @drawer-close-by-child="drawerCloseByChild"></component>
      <!-- <xxx :drawer-data="drawerData" @drawer-close-by-child="drawerCloseByChild" v-on="$listeners"></xxx> -->
    </yunlin-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import { getEngineeringProjectList } from '@/api/engineering/project'
import { getEngineeringDrawSubjectPageList } from '@/api/engineering/drawSubject'
import drawingbudget from './drawingbudget'

export default {
  name: 'Tabel',
  components: { drawingbudget },
  mixins: [pageMixin, tableDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      projectList: [],
      drawerComponents: {
        drawingbudget
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
      // this.tableConfig.highlightCurrentRow = true
      // this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHead = [
        // 项目名称
        { prop: 'projectName', label: 'draw.projectName', width: '160' },
        // 预算主题
        { prop: 'budgetSubjectName', label: 'draw.budgetSubjectName' },
        // 初期预算时间
        { prop: 'landbudgetTime', label: 'draw.landbudgetTime', width: '160' },
        // 预算人
        { prop: 'landbudgetUserName', label: 'draw.landbudgetUserName', width: '100' },
        // 预算部门
        { prop: 'landbudgetDeptName', label: 'draw.landbudgetDeptName', width: '100' },
        // 施工图预算时间
        { prop: 'drawingbudgetTime', label: 'draw.drawingbudgetTime', width: '160' },
        // 预算人
        { prop: 'drawingbudgetUserName', label: 'draw.drawingbudgetUserName', width: '100' },
        // 预算部门
        { prop: 'drawingbudgetDeptName', label: 'draw.drawingbudgetDeptName', width: '100' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getEngineeringDrawSubjectPageList
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
      getEngineeringProjectList().then(response => {
        this.projectList = response
      })
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
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    },
    drawingbudgetHandle(row) {
      this.setDrawerComponent('drawingbudget')
      this.setDrawerData(row)
      this.setDrawerTitle(row.budgetSubjectName)
      this.drawerVisibleHandle()
    }
    // drawerClosed() {
    // drawer关闭以后父页面需要的操作
    // this.searchHandle()
    // }
  }
}
</script>
