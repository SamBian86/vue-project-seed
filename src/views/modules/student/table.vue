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
              v-model="tableSearchParams.studentName"
              :placeholder="$t('student.studentName')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.studentSex"
              :placeholder="$t('student.studentSex')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            >
              <el-option
                v-for="(item, index) in getDictByType('gender')"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.studentPhone"
              :placeholder="$t('student.studentPhone')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="tableSearchParams.studentNo"
              :placeholder="$t('student.studentNo')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.branchId"
              :placeholder="$t('student.branchId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
              @change="branchChangeHandle"
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
            <el-select
              v-model="tableSearchParams.specialityId"
              :placeholder="$t('student.specialityId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
              @change="specialityChangeHandle"
            >
              <el-option
                v-for="(item, index) in specialityList"
                :key="index"
                :label="item.specialityName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.classId"
              :placeholder="$t('student.classId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
              @change="classChangeHandle"
            >
              <el-option
                v-for="(item, index) in classList"
                :key="index"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.buildingId"
              :placeholder="$t('student.buildingId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
              @change="buildingChangeHandle"
            >
              <el-option
                v-for="(item, index) in buildingList"
                :key="index"
                :label="item.buildingName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.floorId"
              :placeholder="$t('student.floorId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
              @change="floorChangeHandle"
            >
              <el-option
                v-for="(item, index) in floorList"
                :key="index"
                :label="item.floorName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="tableSearchParams.roomId"
              :placeholder="$t('student.roomId')"
              :size="tableConfig.tableSearchSize"
              clearable
              @clear="clearHandle"
              @change="roomChangeHandle"
            >
              <el-option
                v-for="(item, index) in roomList"
                :key="index"
                :label="item.roomName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 查询 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('student:view')"
              :size="tableConfig.tableSearchSize"
              @click="searchHandle()"
            >{{ $t('query') }}</el-button>
          </el-form-item>
          <!-- 创建 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('student:save')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="createHandle()"
            >{{ $t('add') }}</el-button>
          </el-form-item>
          <!-- 下载模板 -->
          <el-form-item>
            <el-button
              v-if="filterPermission('student:downloadExcel')"
              type="success"
              :size="tableConfig.tableSearchSize"
              @click="downloadHandle({
                i18nRequestMessage: 'downloadTemp',
                request: exportStudent,
                data: {excelType: 2}
              })"
            >{{ $t('downloadTemp') }}</el-button>
          </el-form-item>
          <!-- 导入 -->
          <!--<el-form-item>
            <button-import :config="importConfig"></button-import>
          </el-form-item>-->
          <el-form-item>
            <button-import :config="importConfig"></button-import>
          </el-form-item>

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
              v-if="filterPermission('student:export')"
              type="primary"
              :size="tableConfig.tableSearchSize"
              @click="exportHandle()"
            >{{ $t('export') }}</el-button>
          </el-form-item>-->
          <!-- 批量删除 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('student:delete')"
              type="danger"
              :size="tableConfig.tableSearchSize"
              @click="deleteSectionHandle()"
            >{{ $t('deleteBatch') }}</el-button>
          </el-form-item>-->
          <!-- 批量操作 -->
          <!-- <el-form-item>
            <el-button
              v-if="filterPermission('student:xxx')"
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
          width="160"
        >
          <template slot-scope="scope">
            <!-- 上下架 -->
            <!--<el-button
              v-if="filterPermission('student:display')"
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
              v-if="filterPermission('student:view')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="detailHandle(scope.row)"
            >{{ $t('detail') }}</el-button>
            <!-- 修改 -->
            <el-button
              v-if="filterPermission('student:update')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="editHandle(scope.row)"
            >{{ $t('update') }}</el-button>
            <!-- 单个删除 -->
            <el-button
              v-if="filterPermission('student:delete')"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="deleteHandle({id: scope.row.id})"
            >{{ $t('delete') }}</el-button>
            <!-- 上移 -->
            <!--<el-button
              v-if="filterPermission('student:exchange') && scope.$index !== 0"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="upHandle(scope.row, scope.$index)"
            >{{ $t('up') }}</el-button>-->
            <!-- 下移 -->
            <!--<el-button
              v-if="filterPermission('student:exchange') && scope.$index !== limit - 1"
              type="text"
              :size="tableConfig.tableSearchSize"
              @click="downHandle(scope.row, scope.$index)"
            >{{ $t('down') }}</el-button>-->
            <!-- 单个操作 -->
            <!--<el-button
              v-if="filterPermission('student:xxx')"
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
import { getStudentPageList, deleteStudent, exportStudent, importStudent } from '@/api/student'
import { getPropertySchoolBranchList } from '@/api/property/schoolBranch'
import { getSchoolSpecialityListByBranchId } from '@/api/school/speciality'
import { getSchoolClassListBySpecialityId } from '@/api/school/class'
import { getSchoolBuildingList } from '@/api/school/building'
import { getSchoolFloorListByBuildingId } from '@/api/school/floor'
import { getSchoolRoomListByFloorId } from '@/api/school/room'
import buttonImport from '@/components/yunlin-table/button/import'

export default {
  name: 'Tabel',
  components: { buttonImport },
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      branchList: [],
      specialityList: [],
      classList: [],
      buildingList: [],
      floorList: [],
      roomList: []

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
        // 学生姓名
        { prop: 'studentName', label: 'student.studentName', width: '120' },
        // 性别
        {
          prop: 'studentSex',
          label: 'student.studentSex',
          width: '80',
          align: 'center',
          component: 'toolTag',
          componentConfig: {
            prop: 'studentSex',
            type: 'text',
            tagConfig: this.dictDataForComponent('gender', { dictLabel: 'name', dictValue: 'value' })
          }
        },
        // 手机号
        { prop: 'studentPhone', label: 'student.studentPhone', width: '140' },
        // 学号
        { prop: 'studentNo', label: 'student.studentNo', width: '140' },
        // 所属学院
        { prop: 'branchName', label: 'student.branchName' },
        // 所属专业
        { prop: 'specialityName', label: 'student.specialityName', width: '180' },
        // 所属班级
        { prop: 'className', label: 'student.className', width: '160' },
        // 所属宿舍楼
        { prop: 'buildingName', label: 'student.buildingName', width: '100' },
        // 所属楼层
        { prop: 'floorName', label: 'student.floorName', width: '100' },
        // 宿舍楼房间
        { prop: 'roomName', label: 'student.roomName', width: '100' }
      ]
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      this.tableHandle.list.api = getStudentPageList
      // this.tableHandle.list.callback = this.listCallback
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      this.tableHandle.delete.api = deleteStudent
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteStudent
      // console.log('table page created')
      this.generateTable()
    },
    genrateI18nSearchItems() {
      this.importConfig = {
        format: 0,
        uploadRequest: importStudent,
        uploadRequestCallBack: this.uploadRequestCallBack
      }
      // XXX
      this.getPropertySchoolBranchList()
      this.getSchoolBuildingList()
    },
    getPropertySchoolBranchList() {
      getPropertySchoolBranchList().then((response) => {
        this.branchList = response
      })
    },
    getSchoolBuildingList() {
      getSchoolBuildingList().then((response) => {
        this.buildingList = response
      })
    },
    // 创建
    createHandle(options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { pageType: 'create', ...options })
    },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true, ...options })
    },
    exportStudent() {
      return exportStudent
    },
    uploadRequestCallBack() {
      this.searchHandle()
    },
    // 显示次序更替
    // exchangeHandle() {
    // return XXX
    // }
    // 上下架
    // displayHandle() {
    // return XXX
    // }
    branchChangeHandle(branchId) {
      this.$set(this.tableSearchParams, 'specialityId', '')
      this.$set(this.tableSearchParams, 'classId', '')
      this.$set(this, 'specialityList', [])
      this.$set(this, 'classList', [])
      if (branchId !== '') {
        this.getSchoolSpecialityListByBranchId()
      }
    },
    getSchoolSpecialityListByBranchId() {
      const { branchId } = this.tableSearchParams
      if (branchId) {
        getSchoolSpecialityListByBranchId({ branchId }).then((response) => {
          this.$set(this, 'specialityList', response)
          this.searchHandle()
        })
      }
    },
    specialityChangeHandle(specialityId) {
      this.$set(this.tableSearchParams, 'classId', '')
      this.$set(this, 'classList', [])
      if (specialityId !== '') {
        this.getSchoolClassListBySpecialityId()
      }
    },
    getSchoolClassListBySpecialityId() {
      const { specialityId } = this.tableSearchParams
      if (specialityId) {
        getSchoolClassListBySpecialityId({ specialityId }).then((response) => {
          this.$set(this, 'classList', response)
          this.searchHandle()
        })
      }
    },
    classChangeHandle(classId) {
      this.searchHandle()
    },
    buildingChangeHandle(buildingId) {
      this.$set(this.tableSearchParams, 'floorId', '')
      this.$set(this.tableSearchParams, 'roomId', '')
      this.$set(this, 'floorList', [])
      this.$set(this, 'roomList', [])
      if (buildingId !== '') {
        this.getSchoolFloorListByBuildingId()
      }
    },
    getSchoolFloorListByBuildingId() {
      const { buildingId } = this.tableSearchParams
      if (buildingId) {
        getSchoolFloorListByBuildingId({ buildingId }).then((response) => {
          this.$set(this, 'floorList', response)
          this.searchHandle()
        })
      }
    },
    floorChangeHandle(floorId) {
      this.$set(this.tableSearchParams, 'roomId', '')
      this.$set(this, 'roomList', [])
      if (floorId !== '') {
        this.getSchoolRoomListByFloorId()
      }
    },
    getSchoolRoomListByFloorId() {
      const { floorId } = this.tableSearchParams
      if (floorId) {
        getSchoolRoomListByFloorId({ floorId }).then((response) => {
          this.$set(this, 'roomList', response)
          this.searchHandle()
        })
      }
    },
    roomChangeHandle(roomId) {
      this.searchHandle()
    }
  }
}
</script>
