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
              v-if="containsPageType(['create']) && filterPermission('engineering:employee:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:employee:update')"
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
import { createEngineeringEmployee, editEngineeringEmployee, getEngineeringEmployeeById } from '@/api/engineering/employee'
import { getEngineeringJoblist } from '@/api/engineering/joblist'
import { getSysDeptListAll } from '@/api/sys/dept'
export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin],
  data() {
    return {
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
          api: createEngineeringEmployee
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringEmployee
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringEmployeeById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        relationshipId: 0
      },
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
    this.formConfig.formSpan = 24
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
          // 分割线
          span: 24,
          name: 'employee.companyInfo',
          type: 'divider'
        },
        {
          // 头像
          span: 24,
          prop: 'headPhoto',
          name: 'employee.headPhoto',
          type: 'file-upload',
          rules: [{ required: true }],
          component: 'toolFileUpload',
          componentConfig: {
            type: 'single-image',
            propName: 'headPhoto',
            format: 0,
            mergeData: { target: 'headPhoto' }
          }
        },
        {
          // 姓名
          span: 8,
          prop: 'name',
          name: 'employee.name',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 性别
          span: 8,
          prop: 'sex',
          name: 'employee.sex',
          type: 'select',
          className: 'select-block',
          placeholder: 'employee.sex',
          rules: [{ required: true }],
          items: this.getDictByType('gender'),
          itemType: 'dict'
        },
        {
          // 岗位
          span: 8,
          prop: 'positionId',
          name: 'employee.positionId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringJoblist,
            requestParams: {},
            itemProps: {
              label: 'jobName',
              value: 'id'
            },
            propName: 'positionId',
            placeholder: 'employee.positionName',
            className: 'select-block',
            mergeData: { target: 'positionId' }
          }
        },
        {
          // 所属部门
          span: 8,
          prop: 'deptName',
          name: 'employee.deptName',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'employee.deptNameDefault',
            propName: 'deptName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'deptName', default: '' },
              { source: 'id', target: 'deptId', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 在职状态
          span: 8,
          prop: 'status',
          name: 'employee.status',
          type: 'select',
          className: 'select-block',
          placeholder: 'employee.status',
          rules: [{ required: true }],
          items: this.getDictByType('employee_status'),
          itemType: 'dict'
        },
        {
          // 空格
          span: 8,
          type: 'empty'
        },
        {
          // 合同开始时间
          span: 8,
          prop: 'contractStartTime',
          name: 'employee.contractStartTime',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          afterChange: () => {
            const { contractStartTime } = this.formData
            const props = []
            const item = {}
            item.prop = 'constractEndTime'
            item.pickerOptions = {
              disabledDate(time) {
                return time.getTime() < new Date(contractStartTime + ' 00:00:00').getTime()
              }
            }
            props.push(item)
            return props
          }
        },
        {
          // 合同结束时间
          span: 8,
          prop: 'constractEndTime',
          name: 'employee.constractEndTime',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          pickerOptions: {}
        },
        {
          // 是否兼职
          span: 8,
          prop: 'relationshipId',
          name: 'employee.relationshipId',
          type: 'select',
          className: 'select-block',
          placeholder: 'employee.relationshipId',
          items: [
            { label: 'employee.relationshipId0', value: 0 },
            { label: 'employee.relationshipId1', value: 1 }
          ]
        },
        {
          // 分割线
          span: 24,
          name: 'employee.personalInfo',
          type: 'divider'
        },
        {
          // 手机号码
          span: 8,
          prop: 'phoneNumber',
          name: 'employee.phoneNumber',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 生日
          span: 8,
          prop: 'birthday',
          name: 'employee.birthday',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
        },
        {
          // 籍贯
          span: 8,
          prop: 'nativePlace',
          name: 'employee.nativePlace',
          type: 'text'
        },
        {
          // 民族
          span: 8,
          prop: 'nation',
          name: 'employee.nation',
          type: 'text'
        },
        {
          // 学历
          span: 8,
          prop: 'education',
          name: 'employee.education',
          type: 'text'
        },
        {
          // 紧急联系人
          span: 8,
          prop: 'emergencyContactName',
          name: 'employee.emergencyContactName',
          type: 'text'
        },
        {
          // 紧急联系人电话
          span: 8,
          prop: 'emergencyContactPhoneNumber',
          name: 'employee.emergencyContactPhoneNumber',
          type: 'text'
        },
        {
          // 住址
          span: 8,
          prop: 'address',
          name: 'employee.address',
          type: 'text'
        },
        {
          // 是否结婚
          span: 8,
          prop: 'married',
          name: 'employee.married',
          type: 'select',
          className: 'select-block',
          placeholder: 'employee.married',
          items: this.getDictByType('married_status'),
          itemType: 'dict'
        },
        {
          // 户口所在地
          span: 8,
          prop: 'censusRegister',
          name: 'employee.censusRegister',
          type: 'text'
        },
        {
          // 身份账号
          span: 8,
          prop: 'idCard',
          name: 'employee.idCard',
          type: 'text'
        }
      ]

      // 组装表单初始数据
      this.generateFormData()
      // 生成标题
      this.generateTitle()
      // 生成表单及验证规则
      this.generateForm()
    }
  }
}
</script>
