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
        <template slot="before-foot">
          <el-row :gutter="10">
            <el-col>
              <div>
                <el-divider
                  content-position="left"
                >{{ $t('contractSettlement.changeTypeAmountList') }}</el-divider>
              </div>
            </el-col>
            <el-col>
              <div class="choose-table-area">
                <el-table :data="changeTypeAmountList" border>
                  <el-table-column
                    prop="changeTypeName"
                    :label="$t('contractSettlement.changeTypeName')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="changeTypeAmount"
                    :label="$t('contractSettlement.changeTypeAmount')"
                  ></el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col>
              <div>
                <el-divider content-position="left">{{ $t('contractSettlement.changeCostInfos') }}</el-divider>
              </div>
            </el-col>
            <el-col>
              <div class="choose-table-area">
                <el-table :data="changeCostInfos" border>
                  <el-table-column
                    prop="costTypeCode"
                    :label="$t('contractSettlement.costTypeCode')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="costTypeName"
                    :label="$t('contractSettlement.costTypeName')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="drawingbudgetTotalCost"
                    :label="$t('contractSettlement.drawingbudgetTotalCost')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="costControlRate"
                    :label="$t('contractSettlement.costControlRate')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="contractGeneratedAmount"
                    :label="$t('contractSettlement.contractGeneratedAmount')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="changeGeneratedAmount"
                    :label="$t('contractSettlement.changeGeneratedAmount')"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    prop="remark"
                    :label="$t('contractSettlement.remark')"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="footer">
          <div class="form-submit-container">
            <el-button
              v-if="containsPageType(['create', 'edit', 'detail'])"
              :size="formConfig.formSize"
              @click.stop="cancleHandle"
            >{{ $t('back') }}</el-button>
            <el-button
              v-if="containsPageType(['create']) && filterPermission('engineering:settlement:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:settlement:update')"
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
import { getSysDeptListAll } from '@/api/sys/dept'
import { getUserList } from '@/api/sys/user'
import {
  createEngineeringContractSettlement,
  editEngineeringContractSettlement,
  getEngineeringContractSettlementById
} from '@/api/engineering/contractSettlement'
// import { validateMobile } from '@/utils/validator'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin],
  data() {
    return {
      changeCostInfos: [],
      changeTypeAmountList: [],
      // 定义表单名称
      formTitle: {
        create: this.$t('add'),
        edit: this.$t('contractSettlement.settlement'),
        detail: this.$t('contractSettlement.settlement')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: createEngineeringContractSettlement
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringContractSettlement
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringContractSettlementById
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
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 分割线
          span: 24,
          name: 'contractSettlement.settlementBaseInfo',
          type: 'divider'
        },
        {
          // 合同名称
          span: 8,
          prop: 'contractName',
          name: 'contractSettlement.contractName',
          type: 'text',
          disabled: true
        },
        {
          // 合同编号
          span: 8,
          prop: 'contractCode',
          name: 'contractSettlement.contractCode',
          type: 'text',
          disabled: true
        },
        {
          // 供应商
          span: 8,
          prop: 'supplierName',
          name: 'contractSettlement.supplierName',
          type: 'text',
          disabled: true
        },
        {
          // 合同金额
          span: 8,
          prop: 'contractTotalPrice',
          name: 'contractSettlement.contractTotalPrice',
          type: 'text',
          disabled: true
        },
        {
          // 累计变更金额
          span: 8,
          prop: 'totalChangeAmount',
          name: 'contractSettlement.totalChangeAmount',
          type: 'text',
          disabled: true
        },
        {
          // 累计变更比例
          span: 8,
          prop: 'totalChangeRatio',
          name: 'contractSettlement.totalChangeRatio',
          type: 'text',
          disabled: true
        },
        {
          // 分割线
          span: 24,
          name: 'contractSettlement.settlementInfo',
          type: 'divider'
        },
        {
          // 结算名称
          span: 8,
          prop: 'settlementName',
          name: 'contractSettlement.settlementName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 暂定金额
          span: 8,
          prop: 'settlementProvisionalAmount',
          name: 'contractSettlement.settlementProvisionalAmount',
          type: 'text'
        },
        {
          // 实际金额
          span: 8,
          prop: 'settlementActualAmount',
          name: 'contractSettlement.settlementActualAmount',
          type: 'text'
        },
        {
          // 送审价
          span: 8,
          prop: 'settlementTrialAmount',
          name: 'contractSettlement.settlementTrialAmount',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 结算变更金额
          span: 8,
          prop: 'settlementChangeAmount',
          name: 'contractSettlement.settlementChangeAmount',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 终审额
          span: 8,
          prop: 'settlementFinalAmount',
          name: 'contractSettlement.settlementFinalAmount',
          type: 'text',
          disabled: true
        },
        {
          // 本次变更税额
          span: 8,
          prop: 'thisChangeAmount',
          name: 'contractSettlement.thisChangeAmount',
          type: 'text'
        },
        {
          // 合同税额
          span: 8,
          prop: 'contractTaxAmount',
          name: 'contractSettlement.contractTaxAmount',
          type: 'text'
        },
        {
          // 合同平均税率
          span: 8,
          prop: 'contractAvgTax',
          name: 'contractSettlement.contractAvgTax',
          type: 'text'
        },
        {
          // 经办人
          span: 8,
          prop: 'userId',
          name: 'contractSettlement.userId',
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
            propName: 'userId',
            placeholder: 'contractSettlement.userId',
            className: 'select-block',
            mergeData: { target: 'userId' },
            mergeOtherData: [
              { source: 'deptName', target: 'deptName', default: '' },
              { source: 'id', target: 'deptId', default: 0 }
            ],
            componentNames: ['select-dynamic']
          }
        },
        {
          // 经办人部门
          span: 8,
          prop: 'deptId',
          name: 'contractSettlement.deptId',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'contractSettlement.defaultDeptName',
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
          // 结算详细说明
          span: 24,
          prop: 'remark',
          name: 'contractSettlement.remark',
          type: 'textarea',
          attrs: { autosize: { minRows: 3, maxRows: 5 } }
        },
        {
          // 附件
          span: 24,
          prop: 'settlementOssIds',
          name: 'contractSettlement.settlementOssIds',
          type: 'file-upload',
          component: 'toolFileUpload',
          rules: [{ required: true }],
          componentConfig: {
            type: 'multiple-file',
            propName: 'settlementOssIds',
            format: 2,
            limit: 20,
            mergeData: { target: 'settlementOssIds' }
          }
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
      const { changeCostInfos, changeTypeAmountList } = this.formData
      this.changeCostInfos = changeCostInfos
      this.changeTypeAmountList = changeTypeAmountList
    }
  }
}
</script>
<style lang="scss">
.choose-table-area {
  padding: 20px 0px;
}
</style>

