<template>
  <el-row :gutter="10">
    <el-col
      :span="formConfig.formSpan"
      :lg="formConfig.formSpan"
      :md="formConfig.formSpan"
      :sm="24"
      :xs="24"
    >
      <div
        v-if="formGenerateTitle[$attrs.page_info.data.pageType] !== ''"
        class="form-title"
      >{{ formGenerateTitle[$attrs.page_info.data.pageType] }}</div>
      <yunlin-form
        ref="yunlinForm"
        :config="formConfig"
        :handle="formHandle"
        :data="formData"
        :rules="formRules"
        v-bind="$attrs"
        @form-data-merge="formDataMerge"
        @form-generate-rule-by-props="formGenerateRuleByProps"
        @form-value-listener="formValueListener"
        @form-data-update="formDataUpdate"
        @form-reset-config-item="formResetConfigItem"
        v-on="$listeners"
      >
        <template slot="footer">
          <div class="form-submit-container">
            <el-button
              v-if="containsPageType(['create', 'edit', 'detail'])"
              :size="formConfig.formSize"
              @click.stop="cancleHandle"
            >{{ $t('back') }}</el-button>
            <el-button
              v-if="containsPageType(['create']) && filterPermission('student:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('student:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('update') }}</el-button>
          </div>
        </template>
      </yunlin-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formDefaultMixin from '@/mixins/form-default-mixin'
import { createStudent, editStudent, getStudentById } from '@/api/student'
import { getPropertySchoolBranchList } from '@/api/property/schoolBranch'
import { getSchoolSpecialityListByBranchId } from '@/api/school/speciality'
import { getSchoolClassListBySpecialityId } from '@/api/school/class'
import { getSchoolBuildingList } from '@/api/school/building'
import { getSchoolFloorListByBuildingId } from '@/api/school/floor'
import { getSchoolRoomListByFloorId } from '@/api/school/room'
import { validateMobile } from '@/utils/validator'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin],
  data() {
    return {
      rooms: [],
      // 定义表单名称
      formTitle: {
        create: this.$t('add'),
        edit: this.$t('update'),
        detail: this.$t('detail')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: createStudent
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editStudent
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getStudentById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: []
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
  },
  activated() {
    // console.log('form activated')
    this.init()
  },
  created() {
    // console.log(this.$attrs.page_info)
    // console.log('form created')

    // 设置整体表单栅格列数
    this.formConfig.formSpan = 12
  },
  methods: {
    generateTitle() {
      const { formTitle } = this
      this.formGenerateTitle = formTitle
    },
    init() {
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 学生姓名
          span: 24,
          prop: 'studentName',
          name: 'student.studentName',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 15 }
        },
        {
          // 性别
          span: 24,
          prop: 'studentSex',
          name: 'student.studentSex',
          type: 'select',
          className: 'select-block',
          placeholder: 'student.studentSex',
          rules: [{ required: true }],
          items: this.getDictByType('gender'),
          itemType: 'dict'
        },
        {
          // 手机号
          span: 24,
          prop: 'studentPhone',
          name: 'student.studentPhone',
          type: 'text',
          rules: [{ required: true }, { validator: validateMobile, trigger: 'blur' }],
          attrs: { maxlength: 11 }
        },
        {
          // 学号
          span: 24,
          prop: 'studentNo',
          name: 'student.studentNo',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 20 }
        },
        {
          // 所属学院
          span: 24,
          prop: 'branchId',
          name: 'student.branchId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getPropertySchoolBranchList,
            requestParams: {},
            afterChange: this.afterBranchChange,
            itemProps: {
              label: 'branchName',
              value: 'id'
            },
            propName: 'branchId',
            placeholder: 'student.branchId',
            className: 'select-block',
            mergeData: { target: 'branchId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 所属专业 specialityId
          span: 24,
          prop: 'specialityId',
          name: 'student.specialityId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'student.specialityId',
          afterChange: this.afterSpecialityChange,
          items: []
        },
        {
          // 所属班级 classId
          span: 24,
          prop: 'classId',
          name: 'student.classId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'student.classId',
          items: []
        },
        {
          // 所属宿舍楼 buildingId
          span: 24,
          prop: 'buildingId',
          name: 'student.buildingId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getSchoolBuildingList,
            requestParams: {
              buildingType: 0
            },
            afterChange: this.afterBuildingChange,
            itemProps: {
              label: 'buildingName',
              value: 'id'
            },
            propName: 'buildingId',
            placeholder: 'student.buildingId',
            className: 'select-block',
            mergeData: { target: 'buildingId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 所属楼层 floorId
          span: 24,
          prop: 'floorId',
          name: 'student.floorId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'student.floorId',
          afterChange: this.afterFloorChange,
          items: []
        },
        {
          // 宿舍房间 roomId
          span: 24,
          prop: 'roomId',
          name: 'student.roomId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'student.roomId',
          afterChange: this.afterRoomChange,
          items: []
        },
        {
          // 床位号 bedNum
          span: 24,
          prop: 'bedNum',
          name: 'student.bedNum',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'student.bedNum',
          items: []
        },
        {
          // 联系人姓名
          span: 24,
          prop: 'contactName',
          name: 'student.contactName',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 15 }
        },
        {
          // 手机号
          span: 24,
          prop: 'contactPhoneNumber',
          name: 'student.contactPhoneNumber',
          type: 'text',
          rules: [{ required: true }, { validator: validateMobile, trigger: 'blur' }],
          attrs: { maxlength: 11 }
        }
      ]

      // 组装表单初始数据
      this.generateFormData()
      // 生成标题
      this.generateTitle()
      // 生成表单及验证规则
      this.generateForm()
    },
    afterFormDataUpdate() {
      this.getSchoolSpecialityListByBranchId()
      this.getSchoolClassListBySpecialityId()
      this.getSchoolFloorListByBuildingId()
      this.getSchoolRoomListByFloorId()
    },
    afterBranchChange() {
      const { branchId } = this.formData
      this.$set(this.formData, 'specialityId', '')
      this.$set(this.formData, 'classId', '')
      if (branchId) {
        this.getSchoolSpecialityListByBranchId()
      } else {
        this.formResetConfigItem([{ prop: 'specialityId', items: [] }])
        this.formResetConfigItem([{ prop: 'classId', items: [] }])
      }
    },
    getSchoolSpecialityListByBranchId() {
      const { branchId } = this.formData
      getSchoolSpecialityListByBranchId({ branchId }).then((response) => {
        response.forEach((item) => {
          item.placeholderText = item.specialityName
          item.value = item.id
        })
        this.formResetConfigItem([{ prop: 'specialityId', items: response }])
      })
    },
    afterSpecialityChange() {
      const { specialityId } = this.formData
      this.$set(this.formData, 'classId', '')
      if (specialityId) {
        this.getSchoolClassListBySpecialityId()
      } else {
        this.formResetConfigItem([{ prop: 'classId', items: [] }])
      }
    },
    getSchoolClassListBySpecialityId() {
      const { specialityId } = this.formData
      getSchoolClassListBySpecialityId({ specialityId }).then((response) => {
        response.forEach((item) => {
          item.placeholderText = item.className
          item.value = item.id
        })
        this.formResetConfigItem([{ prop: 'classId', items: response }])
      })
    },
    afterBuildingChange() {
      const { buildingId } = this.formData
      this.$set(this.formData, 'floorId', '')
      this.$set(this.formData, 'roomId', '')
      this.$set(this.formData, 'bedNum', '')
      if (buildingId) {
        this.getSchoolFloorListByBuildingId()
      } else {
        this.formResetConfigItem([{ prop: 'floorId', items: [] }])
        this.formResetConfigItem([{ prop: 'roomId', items: [] }])
        this.$set(this, 'rooms', [])
        this.formResetConfigItem([{ prop: 'bedNum', items: [] }])
      }
    },
    getSchoolFloorListByBuildingId() {
      const { buildingId } = this.formData
      getSchoolFloorListByBuildingId({ buildingId }).then((response) => {
        response.forEach((item) => {
          item.placeholderText = item.floorName
          item.value = item.id
        })
        this.formResetConfigItem([{ prop: 'floorId', items: response }])
      })
    },
    afterFloorChange() {
      const { floorId } = this.formData
      this.$set(this.formData, 'roomId', '')
      this.$set(this.formData, 'bedNum', '')
      if (floorId) {
        this.getSchoolRoomListByFloorId()
      } else {
        this.formResetConfigItem([{ prop: 'roomId', items: [] }])
        this.$set(this, 'rooms', [])
        this.formResetConfigItem([{ prop: 'bedNum', items: [] }])
      }
    },
    getSchoolRoomListByFloorId() {
      const { floorId } = this.formData
      getSchoolRoomListByFloorId({ floorId }).then((response) => {
        response.forEach((item) => {
          item.placeholderText = item.roomName
          item.value = item.id
        })
        this.formResetConfigItem([{ prop: 'roomId', items: response }])
        this.$set(this, 'rooms', response)
        this.getSchoolRoomBedNumList()
      })
    },
    afterRoomChange() {
      const { roomId } = this.formData
      if (roomId) {
        this.getSchoolRoomBedNumList()
      } else {
        this.formResetConfigItem([{ prop: 'bedNum', items: [] }])
      }
    },
    getSchoolRoomBedNumList() {
      const { roomId } = this.formData
      const { rooms } = this
      const bedItem = rooms.filter((item) => item.id === roomId)
      const beds = []
      if (bedItem && bedItem.length !== 0) {
        const roomBedNum = bedItem[0]['roomBedNum']
        for (let i = 1; i <= roomBedNum; i++) {
          beds.push({
            placeholderText: i,
            value: i
          })
        }
        this.formResetConfigItem([{ prop: 'bedNum', items: beds }])
      } else {
        this.$set(this.formData, 'bedNum', '')
      }
    }
  }
}
</script>
