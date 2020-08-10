<template>
  <div>
    <div v-if="hasProject">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="school_label">{{ $t('propertySchool.info') }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <div class="school_logo">
            <el-image
              style="width: 150px; height: 150px"
              :src="schoolInfo && schoolInfo.schoolPicture"
              :alt="$t('propertySchool.logo')"
              fit="fill"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <div class="school_name">{{ schoolInfo && schoolInfo.schoolName }}</div>
          <div class="school_address">{{ schoolInfo && schoolInfo.schoolAddress }}</div>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <div v-if="filterPermission('property:school:qrcode')" class="school_qrcode">
            <el-button
              v-if="qrcode === ''"
              type="text"
              @click="getQRcode"
            >{{ $t('propertySchool.qrcodeBtn') }}</el-button>
            <el-image
              v-else
              style="width: 150px; height: 150px"
              :src="qrcode"
              :alt="$t('propertySchool.qrcode')"
              fit="fill"
            ></el-image>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="school_label">{{ $t('propertySchool.branchInfo') }}</div>
        </el-col>
      </el-row>

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
        <!-- <template slot="search">
        <el-form
          class="table-search-form"
          :inline="true"
          :model="tableSearchParams"
          @keyup.enter.native="searchHandle"
        >-->
        <!-- 查询 -->
        <!-- <el-form-item>
            <el-button
              v-if="filterPermission('property:school:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
        </el-form-item>-->
        <!-- 创建 -->
        <!-- <el-form-item>
            <el-button
              v-if="filterPermission('property:school:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
        </el-form-item>-->
        <!-- 下载模板 -->
        <!--<el-form-item>
            <el-button
              v-if="filterPermission('property:school:save')"
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
        <!--<el-form-item>
            <el-button
              v-if="filterPermission('property:school:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
        </el-form-item>-->
        <!-- 批量删除 -->
        <!-- <el-form-item>
            <el-button
              v-if="filterPermission('property:school:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
        </el-form-item>-->
        <!-- 批量操作 -->
        <!-- <el-form-item>
            <el-button
              v-if="filterPermission('property:school:xxx')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="customSectionHandle({
                i18nMessage: 'prompt.customBatch',
                i18nRequestMessage: 'bbb.bbb',
                request: CCC
              })"
            >{{ $t('ddd.ddd') }}</el-button>
        </el-form-item>-->
        <!-- </el-form>
        </template>-->
        <!-- 操作区域 -->
        <!-- <template slot="operate">
        <el-table-column
          :label="$t('handle')"
          align="center"
          header-align="center"
          fixed="right"
          width="100"
        >
        <template slot-scope="scope">-->
        <!-- 上下架 -->
        <!--<el-button
              v-if="filterPermission('property:school:display')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: {
                  id: scope.row.id,
                  display: scope.row.XXX === 0 ? 1 : 0
                },
                i18nRequestMessage: scope.row.XXX === 0 ? 'on' : 'off',
                request: displayHandle
              })"
        >{{ scope.row.XXX === 0 ? $t('on') : $t('off') }}</el-button>-->
        <!-- 修改 -->
        <!-- <el-button
              v-if="filterPermission('property:school:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
        >{{ $t('update') }}</el-button>-->
        <!-- 单个删除 -->
        <!-- <el-button
              v-if="filterPermission('property:school:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
        >{{ $t('delete') }}</el-button>-->
        <!-- 上移 -->
        <!--<el-button
              v-if="filterPermission('property:school:exchange') && scope.$index !== 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="upHandle(scope.row, scope.$index)"
        >{{ $t('up') }}</el-button>-->
        <!-- 下移 -->
        <!--<el-button
              v-if="filterPermission('property:school:exchange') && scope.$index !== limit - 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="downHandle(scope.row, scope.$index)"
        >{{ $t('down') }}</el-button>-->
        <!-- 单个操作 -->
        <!--<el-button
              v-if="filterPermission('property:school:xxx')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="customHandle({
                data: [scope.row.id],
                i18nRequestMessage: '国际化',
                request: null
              })"
        >{{ $t('ddd.ddd') }}</el-button>-->
        <!-- </template>
        </el-table-column>
        </template>-->
      </yunlin-table>
      <div class="school_tips">{{ $t('propertySchool.tips') }}</div>
    </div>
    <div v-else>
      <div class="school_label">{{ $t('propertySchool.chooseProject') }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getPropertySchoolBranchList } from '@/api/property/schoolBranch'
import { getPropertySchoolInfo, getPropertySchoolQRcode } from '@/api/property/school'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      hasProject: false,
      qrcode: '',
      schoolInfo: null
      // limit: 0
    }
  },
  computed: {
    ...mapGetters(['app_projectId']),
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
  },
  activated() {
    // console.log('table activated')
  },
  created() {
    this.checkProject()
  },
  methods: {
    checkProject() {
      const { app_projectId } = this
      if (app_projectId) {
        this.hasProject = true
        this.init()
      } else {
        this.hasProject = false
      }
    },
    // listCallback() {
    //   const list = this.getTableData()
    //   this.limit = list.length
    // },
    init() {
      // 配置查询区域i18n相关select数据
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      this.tableConfig.hasPagination = false
      // this.tableConfig.highlightCurrentRow = true
      // this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 学院名称
        { prop: 'branchName', label: 'propertySchool.branchName' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getPropertySchoolBranchList
      // this.tableHandle.list.callback = this.listCallback
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
      this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      this.getPropertySchoolInfo()
    },
    getPropertySchoolInfo() {
      getPropertySchoolInfo().then((response) => {
        this.schoolInfo = response
      })
    },
    getQRcode() {
      getPropertySchoolQRcode().then((response) => {
        this.qrcode = response
      })
    }
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    // editHandle(item, options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: false, ...options })
    // }
    // 显示次序更替
    // exchangeHandle() {
    // return XXX
    // }
    // 上下架
    // displayHandle() {
    // return XXX
    // }
  }
}
</script>
<style lang="scss">
.school_label {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0px;
}

.school_logo {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  overflow: hidden;
}

.school_name {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}

.school_qrcode {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.school_tips {
  padding: 10px 0px;
}
</style>
