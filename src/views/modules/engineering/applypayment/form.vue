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
              v-if="containsPageType(['create']) && filterPermission('engineering:applypayment:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:applypayment:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('update') }}</el-button>
          </div>
        </template>
      </yunlin-form>
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
          :disabled="containsPageType(['detail'])"
          @drawer-close-by-child="drawerCloseByChild"
          @form-data-merge="formDataMerge"
        ></component>
      </yunlin-drawer>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formDefaultMixin from '@/mixins/form-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import {
  createEngineeringContractApplypayment,
  editEngineeringContractApplypayment,
  getEngineeringContractApplypaymentById,
  getEngineeringContractApplypaymentByPlanId
} from '@/api/engineering/contractApplypayment'
import { getEngineeringProjectList } from '@/api/engineering/project'
import { getEngineeringContractList, getEngineeringContractById } from '@/api/engineering/contract'
import { getEngineeringContractPayplanListById } from '@/api/engineering/contractPayplan'
import applyCostInfoList from './apply-cost-info-list'
// import { validateContractUnivalence } from '@/utils/validator'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        apply: applyCostInfoList
      },
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
          api: createEngineeringContractApplypayment
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringContractApplypayment
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringContractApplypaymentById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        // 合同编号
        { prop: 'contractCode', disabledPageType: ['create', 'edit', 'detail'] },
        // 供应商
        { prop: 'supplierName', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractTypeName', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractTotalPrice', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractUnivalence', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractTime', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractFinalPrice', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractPayType', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractHandleman', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractHandlemanPhone', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractSupplierLinkman', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractSupplierLinkphone', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'contractRemark', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'ossList', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'costPayName', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'needPayAmount', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'invoiceAmount', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'haveApplyAmount', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'havePayAmount', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'applyCostinfoDto', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'otherOssList', disabledPageType: ['create', 'edit', 'detail'] },
        { prop: 'thisAmount', disabledPageType: ['create', 'edit', 'detail'] }
      ],
      planList: [],
      contractList: []
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
          // 项目名称
          span: 8,
          prop: 'projectId',
          name: 'applypayment.projectId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringProjectList,
            requestParams: {},
            afterChange: this.afterProjectChange,
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'projectId',
            placeholder: 'applypayment.projectId',
            className: 'select-block',
            mergeData: { target: 'projectId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 合同
          span: 8,
          prop: 'contractId',
          name: 'applypayment.contractId',
          type: 'select',
          className: 'select-block',
          placeholder: 'applypayment.contractId',
          afterChange: this.afterContractChange,
          rules: [{ required: true }],
          items: this.contractList
        },
        {
          // 款项
          span: 8,
          prop: 'planId',
          name: 'applypayment.planId',
          type: 'select',
          className: 'select-block',
          placeholder: 'applypayment.planId',
          afterChange: this.afterPlanChange,
          rules: [{ required: true }],
          items: this.planList
        },
        {
          // 分割线
          span: 24,
          name: 'applypayment.baseInfo',
          type: 'divider'
        },
        {
          // 合同编号
          span: 8,
          prop: 'contractCode',
          name: 'applypayment.contractCode',
          type: 'text'
        },
        {
          // 供应商
          span: 8,
          prop: 'supplierName',
          name: 'applypayment.supplierName',
          type: 'text'
        },
        {
          // 合同类别
          span: 8,
          prop: 'contractTypeName',
          name: 'applypayment.contractTypeName',
          type: 'text'
        },
        {
          // 合同金额
          span: 8,
          prop: 'contractTotalPrice',
          name: 'applypayment.contractTotalPrice',
          type: 'text'
        },
        {
          // 单价
          span: 8,
          prop: 'contractUnivalence',
          name: 'applypayment.contractUnivalence',
          type: 'text'
        },
        {
          // 签约日期
          span: 8,
          prop: 'contractTime',
          name: 'applypayment.contractTime',
          type: 'text'
        },
        {
          // 终审额
          span: 8,
          prop: 'contractFinalPrice',
          name: 'applypayment.contractFinalPrice',
          type: 'text'
        },
        {
          // 付款方式
          span: 8,
          prop: 'contractPayType',
          name: 'applypayment.contractPayType',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.contractPayType',
          items: this.getDictByType('contract_pay_type'),
          itemType: 'dict'
        },
        {
          // 经办人
          span: 8,
          prop: 'contractHandleman',
          name: 'applypayment.contractHandleman',
          type: 'text'
        },
        {
          // 经办人电话
          span: 8,
          prop: 'contractHandlemanPhone',
          name: 'applypayment.contractHandlemanPhone',
          type: 'text'
        },
        {
          // 乙方联系人
          span: 8,
          prop: 'contractSupplierLinkman',
          name: 'applypayment.contractSupplierLinkman',
          type: 'text'
        },
        {
          // 乙方联系人电话
          span: 8,
          prop: 'contractSupplierLinkphone',
          name: 'applypayment.contractSupplierLinkphone',
          type: 'text'
        },
        {
          // 合同备注
          span: 24,
          prop: 'contractRemark',
          name: 'applypayment.contractRemark',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 } }
        },
        {
          // 附件
          span: 24,
          prop: 'ossList',
          name: 'applypayment.ossList',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-file',
            propName: 'ossList',
            format: 2,
            limit: 100,
            mergeData: { target: 'ossList' }
          }
        },
        {
          // 分割线
          span: 24,
          name: 'applypayment.payInfo',
          type: 'divider'
        },
        {
          // 款项名称
          span: 8,
          prop: 'costPayName',
          name: 'applypayment.costPayName',
          type: 'text'
        },
        {
          // 应付金额
          span: 8,
          prop: 'needPayAmount',
          name: 'applypayment.needPayAmount',
          type: 'text'
        },
        {
          // 开票金额
          span: 8,
          prop: 'invoiceAmount',
          name: 'applypayment.invoiceAmount',
          type: 'text'
        },
        {
          // 已申请金额
          span: 8,
          prop: 'haveApplyAmount',
          name: 'applypayment.haveApplyAmount',
          type: 'text'
        },
        {
          // 已付金额
          span: 8,
          prop: 'havePayAmount',
          name: 'applypayment.havePayAmount',
          type: 'text'
        },
        {
          // 本次申请金额
          span: 8,
          prop: 'thisAmount',
          name: 'applypayment.thisAmount',
          type: 'text'
        },
        {
          // 科目明细
          span: 8,
          prop: 'applyCostinfoDto',
          name: 'applypayment.applyCostinfoDto',
          placeholder: 'applypayment.applyCostinfoDtoButton',
          type: 'button',
          buttonType: 'text',
          clickHandle: this.applyCostinfoDtoHandle
        },
        {
          // 相关票据
          span: 24,
          prop: 'otherOssList',
          name: 'applypayment.otherOssList',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-file',
            propName: 'otherOssList',
            format: 2,
            limit: 100,
            mergeData: { target: 'otherOssList' }
          }
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'applypayment.remark',
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

      this.drawerConfig.size = '90%'
    },
    // 切换项目以后的操作
    afterProjectChange() {
      this.cleanBaseInfo()
      this.cleanPayInfo()
      this.getEngineeringContractList()
    },
    getEngineeringContractList() {
      const { projectId } = this.formData
      if (projectId) {
        getEngineeringContractList({ projectId }).then(response => {
          response.forEach(item => {
            item.value = item.id
            item.placeholderText = item.contractName
          })
          this.contractList = response
          this.formResetConfigItem([{ prop: 'contractId', items: response }])
        })
      } else {
        this.contractList = []
        this.planList = []
        this.formResetConfigItem([
          { prop: 'contractId', items: [] },
          { prop: 'planId', items: [] }
        ])
        this.formDataMerge({
          contractId: '',
          planId: ''
        })
      }
    },
    // 切换合同
    afterContractChange() {
      this.cleanBaseInfo()
      this.cleanPayInfo()
      this.getEngineeringContractPayplanListById()
    },
    getEngineeringContractPayplanListById() {
      const { contractId } = this.formData
      if (contractId) {
        getEngineeringContractPayplanListById({ contractId }).then(response => {
          response.forEach(item => {
            item.value = item.id
            item.placeholderText = item.costPayName
          })
          this.planList = response
          this.formResetConfigItem([{ prop: 'planId', items: response }])
          this.formDataMerge({
            planId: ''
          })
        })
        // 获取合同详情
        this.getEngineeringContractById()
      } else {
        this.planList = []
        this.formResetConfigItem([{ prop: 'planId', items: [] }])
        this.formDataMerge({
          planId: ''
        })
      }
    },
    // 获取合同详情
    getEngineeringContractById() {
      const { contractId } = this.formData

      getEngineeringContractById({ id: contractId }).then(response => {
        const {
          contractCode,
          supplierName,
          supplierId,
          contractTypeName,
          contractTotalPrice,
          contractUnivalence,
          contractTime,
          contractFinalPrice,
          contractPayType,
          contractHandleman,
          contractHandlemanPhone,
          contractSupplierLinkman,
          contractSupplierLinkphone,
          ossList,
          remark
        } = response
        this.formDataMerge({
          contractCode, // 合同编号
          supplierName, // 供应商
          supplierId,
          contractTypeName, // 合同类别
          contractTotalPrice, // 合同金额
          contractUnivalence, // 单价
          contractTime, // 签约日期
          contractFinalPrice, // 终审额
          contractPayType, // 付款方式
          contractHandleman, // 经办人
          contractHandlemanPhone, // 联系电话
          contractSupplierLinkman, // 乙方联系人
          contractSupplierLinkphone, // 联系电话
          ossList, // 附件
          contractRemark: remark // 备注
        })
      })
    },
    cleanBaseInfo() {
      this.formDataMerge({
        contractCode: '', // 合同编号
        supplierName: '', // 供应商
        contractTypeName: '', // 合同类别
        contractTotalPrice: '', // 合同金额
        contractUnivalence: '', // 单价
        contractTime: '', // 签约日期
        contractFinalPrice: '', // 终审额
        contractPayType: '', // 付款方式
        contractHandleman: '', // 经办人
        contractHandlemanPhone: '', // 联系电话
        contractSupplierLinkman: '', // 乙方联系人
        contractSupplierLinkphone: '', // 联系电话
        ossList: [], // 附件
        contractRemark: '' // 备注
      })
    },
    // 切换款项
    afterPlanChange() {
      const { planId, pageType } = this.formData
      if (pageType === 'edit') {
        return false
      }
      if (planId) {
        getEngineeringContractApplypaymentByPlanId({
          planId
        }).then(response => {
          const { costPayName, needPayAmount, invoiceAmount, haveApplyAmount, havePayAmount, ossList, thisAmount } = response
          this.formDataMerge({
            costPayName, // 款项名称
            needPayAmount, // 应付金额
            invoiceAmount, // 开票金额
            haveApplyAmount, // 已申请金额
            havePayAmount, // 已付金额
            otherOssList: ossList, // 相关票据
            thisAmount // 本次申请金额
          })
        })
      } else {
        this.cleanPayInfo()
      }
    },
    cleanPayInfo() {
      this.formDataMerge({
        costPayName: '', // 款项名称
        needPayAmount: '', // 应付金额
        invoiceAmount: '', // 开票金额
        haveApplyAmount: '', // 已申请金额
        havePayAmount: '', // 已付金额
        otherOssList: [], // 相关票据
        thisAmount: '', // 本次申请金额
        remark: '' // 申请备注
      })
    },
    // 获取详情后执行
    afterFormDataUpdate() {
      const { projectId, contractId } = this.formData
      if (projectId) {
        getEngineeringContractList({ projectId }).then(response => {
          response.forEach(item => {
            item.value = item.id
            item.placeholderText = item.contractName
          })
          this.contractList = response
          this.formResetConfigItem([{ prop: 'contractId', items: response }])
        })
      }
      if (contractId) {
        getEngineeringContractPayplanListById({ contractId }).then(response => {
          response.forEach(item => {
            item.value = item.id
            item.placeholderText = item.costPayName
          })
          this.planList = response
          this.formResetConfigItem([{ prop: 'planId', items: response }])
        })
        // 获取合同详情
        this.getEngineeringContractById()
      }
      this.afterPlanChange()
    },
    // 打开科目明细
    applyCostinfoDtoHandle() {
      const { id, contractId, applyCostinfoDto } = this.formData
      const { pageType } = this.$attrs.page_info.data
      if (!contractId) {
        this.$message({
          message: `${this.$t('choose')}${this.$t('applypayment.contractId')}`,
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.setDrawerComponent('apply')
      this.setDrawerData({ list: applyCostinfoDto || [], id, contractId, pageType })
      this.setDrawerTitle(this.$t('applypayment.applyCostinfoDtoTitle'))
      this.drawerVisibleHandle()
    }
  }
}
</script>
