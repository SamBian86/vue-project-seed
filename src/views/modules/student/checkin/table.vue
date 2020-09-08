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
          <el-form-item>
            <el-input
              v-model="tableSearchParams.nameOrPhoneOrNo"
              :placeholder="$t('studentCheckin.nameOrPhoneOrNo')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.branchId"
              :placeholder="$t('studentCheckin.branchId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in branchList"
                :key="index"
                :label="item.branchName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.className"
              :placeholder="$t('studentCheckin.className')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.buildingOrRoom"
              :placeholder="$t('studentCheckin.buildingOrRoom')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('student:checkin:view')"
              :size="tableConfig.tableSearchSize"
              @click="clearHandle"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('student:checkin:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >
              {{ $t('add') }}
            </el-button>
          </el-form-item>-->
          <!-- 下载模板 -->
          <!--<el-form-item>
            <el-button
              v-if="filterPermission('student:checkin:downloadExcel')"
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
            <button-import v-if="filterPermission('student:checkin:importExcel')" :config="importConfig"></button-import>
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
          <el-form-item>
            <el-button
              v-if="filterPermission('student:checkin:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('student:checkin:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >
              {{ $t('deleteBatch') }}
            </el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('student:checkin:xxx')"
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
            <!-- 上下架 -->
            <!--<el-button
              v-if="filterPermission('student:checkin:display')"
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
            <!-- 详情 -->
            <el-button
              v-if="filterPermission('student:checkin:view')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="detailHandle(scope.row)"
            >{{ $t('detail') }}</el-button>
            <!-- 修改 -->
            <!-- <el-button
              v-if="filterPermission('student:checkin:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >
              {{ $t('update') }}
            </el-button>-->
            <!-- 单个删除 -->
            <!-- <el-button
              v-if="filterPermission('student:checkin:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle([scope.row.id])"
            >
              {{ $t('delete') }}
            </el-button>-->
            <!-- 上移 -->
            <!--<el-button
              v-if="filterPermission('student:checkin:exchange') && scope.$index !== 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="upHandle(scope.row, scope.$index)"
            >{{ $t('up') }}</el-button>-->
            <!-- 下移 -->
            <!--<el-button
              v-if="filterPermission('student:checkin:exchange') && scope.$index !== limit - 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="downHandle(scope.row, scope.$index)"
            >{{ $t('down') }}</el-button>-->
            <!-- 单个操作 -->
            <!--<el-button
              v-if="filterPermission('student:checkin:xxx')"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getPropertySchoolBranchList } from '@/api/property/schoolBranch'
import { getStudentDormitoryPageList, exportStudentDormitory } from '@/api/student/dormitory'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      branchList: []
      // limit: 0
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
      // this.tableConfig.hasPagination = false
      // this.tableConfig.highlightCurrentRow = true
      // this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = [
        // 入宿时间
        { prop: 'createDate', label: 'studentCheckin.createDate', width: '160' },
        // 学生姓名
        { prop: 'studentName', label: 'studentCheckin.studentName', width: '100' },
        // 手机号
        { prop: 'studentPhone', label: 'studentCheckin.studentPhone', width: '120' },
        // 学号
        { prop: 'studentNo', label: 'studentCheckin.studentNo', width: '120' },
        // 学院
        { prop: 'branchName', label: 'studentCheckin.branchName' },
        // 班级
        { prop: 'className', label: 'studentCheckin.className', width: '140' },
        // 楼栋
        { prop: 'buildingName', label: 'studentCheckin.buildingName', width: '140' },
        // 宿舍号
        { prop: 'roomName', label: 'studentCheckin.roomName', width: '140' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      this.tableSearchParams.type = 1
      // 配置列表请求
      this.tableHandle.list.api = getStudentDormitoryPageList
      // this.tableHandle.list.callback = this.listCallback
      // 配置导出功能
      this.tableHandle.export.api = exportStudentDormitory
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
      this.getPropertySchoolBranchList()
    },
    getPropertySchoolBranchList() {
      getPropertySchoolBranchList().then((response) => {
        this.branchList = response
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
