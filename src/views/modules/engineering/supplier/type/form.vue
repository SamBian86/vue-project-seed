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
              v-if="containsPageType(['create']) && filterPermission('engineering:supplier:type:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:supplier:type:update')"
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
  createEngineeringSupplierType,
  editEngineeringSupplierType,
  getEngineeringSupplierTypeById,
  getEngineeringSupplierTypeTree
} from '@/api/engineering/supplierType'

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
          api: createEngineeringSupplierType
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringSupplierType
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringSupplierTypeById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        pid: 0
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
          // 类别名称
          span: 24,
          prop: 'typeName',
          name: 'supplierType.typeName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 上级类别
          span: 24,
          prop: 'parentName',
          name: 'supplierType.parentName',
          type: 'popover-tree',
          component: 'toolPopoverTree',
          componentConfig: {
            request: getEngineeringSupplierTypeTree,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'supplierType.parentNameDefault',
            propName: 'parentName',
            sourceName: 'name',
            treeProps: { label: 'typeName', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'typeName', target: 'parentName', default: '' },
              { source: 'id', target: 'pid', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
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
