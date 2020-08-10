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
              v-if="containsPageType(['create']) && filterPermission('school:class:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('school:class:update')"
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
import { getSchoolSpecialityListByBranchId } from '@/api/school/speciality'
import { createSchoolClass, editSchoolClass, getSchoolClassById } from '@/api/school/class'
import { getPropertySchoolBranchList } from '@/api/property/schoolBranch'
import { validateMobile } from '@/utils/validator'

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
          api: createSchoolClass
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editSchoolClass
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getSchoolClassById
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
          // 专业名称
          span: 24,
          prop: 'className',
          name: 'schoolClass.className',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 20 }
        },
        {
          // 所属分院
          span: 24,
          prop: 'branchId',
          name: 'schoolClass.branchId',
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
            placeholder: 'schoolClass.branchId',
            className: 'select-block',
            mergeData: { target: 'branchId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 所属专业 specialityId
          span: 24,
          prop: 'specialityId',
          name: 'schoolClass.specialityId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'schoolClass.specialityId',
          items: []
        },
        {
          // 班主任
          span: 24,
          prop: 'classLinkMan',
          name: 'schoolClass.classLinkMan',
          type: 'text',
          attrs: { maxlength: 15 }
        },
        {
          // 班主任联系电话
          span: 24,
          prop: 'classLinkPhone',
          name: 'schoolClass.classLinkPhone',
          type: 'text',
          rules: [{ validator: validateMobile, trigger: 'blur' }],
          attrs: { maxlength: 20 }
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
    },
    afterBranchChange() {
      const { branchId } = this.formData
      this.formData.specialityId = ''
      if (branchId) {
        this.getSchoolSpecialityListByBranchId()
      } else {
        this.formResetConfigItem([{ prop: 'specialityId', items: [] }])
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
    }
  }
}
</script>
