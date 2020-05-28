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
              v-if="containsPageType(['create']) && filterPermission('engineering:contract:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:contract:update')"
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
import { createEngineeringContract, editEngineeringContract, getEngineeringContractById } from '@/api/engineering/contract'
import { getEngineeringProjectList } from '@/api/engineering/project'
import { getEngineeringContractTypeTree } from '@/api/engineering/contractType'
import { getEngineeringSupplierList } from '@/api/engineering/supplier'
import costInfoList from './cost-info-list'
import { validateMobile } from '@/utils/validator'

export default {
  name: 'Form',
  components: { costInfoList },
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        cost: costInfoList
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
          api: createEngineeringContract
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringContract
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringContractById
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
    this.formConfig.formSpan = 24
  },
  methods: {
    generateTitle() {
      const { formTitle } = this
      this.formGenerateTitle = formTitle
    },
    init() {
      this.formConfig.labelWidth = '150px'
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 分割线
          span: 24,
          name: 'contract.baseInfo',
          type: 'divider'
        },
        {
          // 所属项目
          span: 8,
          prop: 'projectId',
          name: 'contract.projectId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringProjectList,
            requestParams: {},
            afterChange: this.afterChange,
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'projectId',
            placeholder: 'contract.projectId',
            className: 'select-block',
            mergeData: { target: 'projectId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 合同名称
          span: 8,
          prop: 'contractName',
          name: 'contract.contractName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 合同性质
          span: 8,
          prop: 'contractProperties',
          name: 'contract.contractProperties',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.contractProperties',
          rules: [{ required: true }],
          items: this.getDictByType('contract_properties'),
          itemType: 'dict'
        },
        {
          // 合同类别
          span: 8,
          prop: 'contractTypeId',
          name: 'contract.contractTypeId',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getEngineeringContractTypeTree,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'contract.parentNameDefault',
            propName: 'contractTypeName',
            sourceName: 'label',
            treeProps: { label: 'label', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'label', target: 'contractTypeName', default: '' },
              { source: 'id', target: 'contractTypeId', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 合同编号
          span: 8,
          prop: 'contractCode',
          name: 'contract.contractCode',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 供应商
          span: 8,
          prop: 'supplierId',
          name: 'contract.supplierId',
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
            placeholder: 'contract.supplierId',
            className: 'select-block',
            mergeData: { target: 'supplierId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 科目明细
          span: 8,
          prop: 'costInfoList',
          name: 'contract.costInfoList',
          placeholder: 'contract.costInfoListButton',
          type: 'button',
          buttonType: 'text',
          clickHandle: this.costInfoListHandle,
          rules: [{ required: true }]
        },
        {
          // 合同金额
          span: 8,
          prop: 'contractTotalPrice',
          name: 'contract.contractTotalPrice',
          type: 'text',
          disabled: true
        },
        {
          // 单价
          span: 8,
          prop: 'contractUnivalence',
          name: 'contract.contractUnivalence',
          type: 'text'
        },
        {
          // 终审额
          span: 8,
          prop: 'contractFinalPrice',
          name: 'contract.contractFinalPrice',
          type: 'text',
          disabled: true
        },
        {
          // 付款方式
          span: 8,
          prop: 'contractPayType',
          name: 'contract.contractPayType',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.contractPayType',
          items: this.getDictByType('contract_pay_type'),
          itemType: 'dict'
        },
        {
          // 签约日期
          span: 8,
          prop: 'contractTime',
          name: 'contract.contractTime',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          rules: [{ required: true }]
        },
        {
          // 经办人
          span: 8,
          prop: 'contractHandleman',
          name: 'contract.contractHandleman',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 经办人电话
          span: 16,
          prop: 'contractHandlemanPhone',
          name: 'contract.contractHandlemanPhone',
          type: 'text',
          rules: [{ required: true }, { validator: validateMobile, trigger: 'blur' }]
        },
        {
          // 乙方联系人
          span: 8,
          prop: 'contractSupplierLinkman',
          name: 'contract.contractSupplierLinkman',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 乙方联系人电话
          span: 16,
          prop: 'contractSupplierLinkphone',
          name: 'contract.contractSupplierLinkphone',
          type: 'text',
          rules: [{ required: true }, { validator: validateMobile, trigger: 'blur' }]
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'contract.remark',
          type: 'textarea',
          attrs: { autosize: { minRows: 3, maxRows: 5 } }
        },
        {
          // 分割线
          span: 24,
          name: 'contract.otherInfo',
          type: 'divider'
        },
        {
          // 合同履行开始日期
          span: 8,
          prop: 'contractStartDate',
          name: 'contract.contractStartDate',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          afterChange: () => {
            const { contractStartDate } = this.formData
            const props = []
            const item = {}
            item.prop = 'contractEndDate'
            item.pickerOptions = {
              disabledDate(time) {
                return time.getTime() < new Date(contractStartDate.replace('-', '/') + ' 00:00:00').getTime()
              }
            }
            props.push(item)
            return props
          }
        },
        {
          // 合同履行结束日期
          span: 8,
          prop: 'contractEndDate',
          name: 'contract.contractEndDate',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          pickerOptions: {}
        },
        {
          // 发票类型
          span: 8,
          prop: 'contractInvoiceType',
          name: 'contract.contractInvoiceType',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.contractInvoiceType',
          items: this.getDictByType('contract_receipt_type'),
          itemType: 'dict'
        },
        {
          // 发票税率
          span: 8,
          prop: 'contractInvoiceRate',
          name: 'contract.contractInvoiceRate',
          type: 'text'
        },
        {
          // 取得发票时间
          span: 8,
          prop: 'contractInvoiceTime',
          name: 'contract.contractInvoiceTime',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
        },
        {
          // 主体是否审核
          span: 8,
          prop: 'isCheck',
          name: 'contract.isCheck',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.isCheck',
          items: [
            { label: 'contract.isCheck0', value: 0 },
            { label: 'contract.isCheck1', value: 1 }
          ]
        },
        {
          // 签约人权限
          span: 8,
          prop: 'isAuthority',
          name: 'contract.isAuthority',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.isAuthority',
          items: [
            { label: 'contract.isAuthority0', value: 0 },
            { label: 'contract.isAuthority1', value: 1 }
          ]
        },
        {
          // 律师是否审核
          span: 8,
          prop: 'isLawyerAudit',
          name: 'contract.isLawyerAudit',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.isLawyerAudit',
          items: [
            { label: 'contract.isLawyerAudit0', value: 0 },
            { label: 'contract.isLawyerAudit1', value: 1 }
          ]
        },
        {
          // 双方是否签字
          span: 8,
          prop: 'isBothSignature',
          name: 'contract.isBothSignature',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.isBothSignature',
          items: [
            { label: 'contract.isBothSignature0', value: 0 },
            { label: 'contract.isBothSignature1', value: 1 }
          ]
        },
        {
          // 是否商贸经办
          span: 8,
          prop: 'isBusinessHandle',
          name: 'contract.isBusinessHandle',
          type: 'select',
          className: 'select-block',
          placeholder: 'contract.isBusinessHandle',
          items: [
            { label: 'contract.isBusinessHandle0', value: 0 },
            { label: 'contract.isBusinessHandle1', value: 1 }
          ]
        },
        {
          // 履行交货地点
          span: 16,
          prop: 'contractDeliveryPlace',
          name: 'contract.contractDeliveryPlace',
          type: 'text'
        },
        {
          // 质量验收标准
          span: 16,
          prop: 'contractQualityStandard',
          name: 'contract.contractQualityStandard',
          type: 'text'
        },
        {
          // 运输包装要求
          span: 16,
          prop: 'contractTransportStandard',
          name: 'contract.contractTransportStandard',
          type: 'text'
        },
        {
          // 法律管辖地
          span: 16,
          prop: 'contractJurisdiction',
          name: 'contract.contractJurisdiction',
          type: 'text'
        },
        {
          // 合同生效条件
          span: 16,
          prop: 'contractEffectStandard',
          name: 'contract.contractEffectStandard',
          type: 'text'
        },
        {
          // 合同附件
          span: 24,
          prop: 'ossList',
          name: 'contract.ossList',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-file',
            propName: 'ossList',
            format: 2,
            limit: 20,
            mergeData: { target: 'ossList' }
          }
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
    // 打开明细
    costInfoListHandle() {
      const { costInfoList, projectId } = this.formData
      if (!projectId) {
        this.$message({
          message: `${this.$t('choose')}${this.$t('contract.projectId')}`,
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.setDrawerComponent('cost')
      this.setDrawerData({ list: costInfoList || [], projectId })
      this.setDrawerTitle(this.$t('contract.costInfoListTitle'))
      this.drawerVisibleHandle()
    },
    // 修改项目以后的操作
    afterChange() {
      this.cleanForCostInfo()
    },
    // 修改所属项目以后清除重置数据
    cleanForCostInfo() {
      this.formDataMerge({
        costInfoList: [],
        contractTotalPrice: ''
      })
    }
  }
}
</script>
