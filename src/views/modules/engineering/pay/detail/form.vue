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
              v-if="containsPageType(['create']) && filterPermission('engineering:pay:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:pay:update')"
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
  createEngineeringContractApplypaymentDetails,
  editEngineeringContractApplypaymentDetails
} from '@/api/engineering/contractApplypaymentDetails'
import { getEngineeringSupplierList } from '@/api/engineering/supplier'
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
          api: createEngineeringContractApplypaymentDetails
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringContractApplypaymentDetails
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          // api: getXXXById
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
      const { realName } = this.user_userInfo
      if (pageType === 'create') {
        this.formDefaultData.handleman = realName || ''
        this.formDefaultData.handleDate = new Date()
      }
    },
    init() {
      this.beforeInit()
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 供应商
          span: 24,
          prop: 'supplierId',
          name: 'applypaymentPay.supplierId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringSupplierList,
            requestParams: {},
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'supplierId',
            placeholder: 'applypaymentPay.supplierId',
            className: 'select-block',
            mergeData: { target: 'supplierId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 实付金额
          span: 24,
          prop: 'payAmount',
          name: 'applypaymentPay.payAmount',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 支付方式
          span: 24,
          prop: 'payType',
          name: 'applypaymentPay.payType',
          type: 'text'
        },
        {
          // 经办人
          span: 24,
          prop: 'handleman',
          name: 'applypaymentPay.handleman',
          type: 'text'
        },
        {
          // 经办日期
          span: 24,
          prop: 'handleDate',
          name: 'applypaymentPay.handleDate',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
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
