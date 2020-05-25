<template>
  <el-row :gutter="10">
    <el-col :span="formConfig.formSpan" :lg="formConfig.formSpan" :md="formConfig.formSpan" :sm="24" :xs="24">
      <div v-if="formGenerateTitle[$attrs.page_info.data.pageType] !== ''" class="form-title">{{
        formGenerateTitle[$attrs.page_info.data.pageType]
      }}</div>
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
            >
              {{ $t('back') }}
            </el-button>
            <el-button
              v-if="containsPageType(['create']) && filterPermission('engineering:cost:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('add') }}
            </el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:cost:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('update') }}
            </el-button>
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
  getEngineeringCostTypeTree,
  createEngineeringCostType,
  editEngineeringCostType,
  getEngineeringCostTypeById
} from '@/api/engineering/costType'

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
          api: createEngineeringCostType
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringCostType
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringCostTypeById
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
          // 科目编号
          span: 24,
          prop: 'costTypeCode',
          name: 'cost.costTypeCode',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 科目名称
          span: 24,
          prop: 'costTypeName',
          name: 'cost.costTypeName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 上级科目
          span: 24,
          prop: 'pcostTypeName',
          name: 'cost.pcostTypeName',
          type: 'popover-tree',
          component: 'toolPopoverTree',
          componentConfig: {
            request: getEngineeringCostTypeTree,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'cost.pid',
            propName: 'pcostTypeName',
            sourceName: 'costTypeName',
            treeProps: { label: 'costTypeName', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'costTypeName', target: 'pcostTypeName', default: '' },
              { source: 'id', target: 'pid', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 原始指标
          span: 24,
          prop: 'costPrimitiveTarget',
          name: 'cost.costPrimitiveTarget',
          type: 'text'
        },
        {
          // 是否强控
          span: 24,
          prop: 'isStrongControl',
          name: 'cost.isStrongControl',
          type: 'select',
          className: 'select-block',
          placeholder: 'cost.isStrongControl',
          rules: [{ required: true }],
          items: this.getDictByType('cost_is_strong_control'),
          itemType: 'dict'
        },
        {
          // 强控比例
          span: 24,
          prop: 'costControlRate',
          name: 'cost.costControlRate',
          type: 'text'
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'cost.remark',
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
