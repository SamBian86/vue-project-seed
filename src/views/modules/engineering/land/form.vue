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
              v-if="containsPageType(['create']) && filterPermission('engineering:land:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:land:update')"
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
import {
  createEngineeringLandSubject,
  editEngineeringLandSubject,
  getEngineeringLandSubjectById
} from '@/api/engineering/landSubject'
import { getEngineeringProjectList } from '@/api/engineering/project'
import { getSysDeptListAll } from '@/api/sys/dept'
import { getUserList } from '@/api/sys/user'
// import { validateMobile } from '@/utils/validator'

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
          api: createEngineeringLandSubject
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringLandSubject
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringLandSubjectById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: []
    }
  },
  computed: {
    ...mapGetters(['user_userInfo']),
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
    beforeInit() {
      const { pageType } = this.$attrs.page_info.data
      const { id, deptId, deptName } = this.user_userInfo
      if (pageType === 'create') {
        this.formDefaultData.landbudgetUserId = id || ''
        this.formDefaultData.landbudgetDeptId = deptId || ''
        this.formDefaultData.landbudgetDeptName = deptName || ''
      }
    },
    init() {
      this.beforeInit()
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 项目名称
          span: 24,
          prop: 'projectId',
          name: 'land.projectId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringProjectList,
            requestParams: {},
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'projectId',
            placeholder: 'land.projectId',
            className: 'select-block',
            mergeData: { target: 'projectId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 预算主题
          span: 24,
          prop: 'budgetSubjectName',
          name: 'land.budgetSubjectName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 预算人
          span: 24,
          prop: 'landbudgetUserId',
          name: 'land.landbudgetUserId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getUserList,
            requestParams: {},
            itemProps: {
              label: 'realName',
              value: 'id'
            },
            propName: 'landbudgetUserId',
            placeholder: 'land.landbudgetUserId',
            className: 'select-block',
            mergeData: { target: 'landbudgetUserId' },
            mergeOtherData: [
              { source: 'deptName', target: 'landbudgetDeptName', default: '' },
              { source: 'deptId', target: 'landbudgetDeptId', default: 0 }
            ],
            componentNames: ['select-dynamic']
          }
        },
        {
          // 预算部门 getSysDeptListAll
          span: 24,
          prop: 'landbudgetDeptName',
          name: 'land.landbudgetDeptName',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'land.landbudgetDeptName',
            propName: 'landbudgetDeptName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'landbudgetDeptName', default: '' },
              { source: 'id', target: 'landbudgetDeptId', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 预算时间
          span: 24,
          prop: 'landbudgetTime',
          name: 'land.landbudgetTime',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          rules: [{ required: true }]
        },
        {
          // 预算说明
          span: 24,
          prop: 'landbudgetRemark',
          name: 'land.landbudgetRemark',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 } }
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
