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
              v-if="containsPageType(['create']) && filterPermission('xxx:xxx:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('xxx:xxx:update')"
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
import { createEngineeringSupplier, editEngineeringSupplier, getEngineeringSupplierById } from '@/api/engineering/supplier'

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
          api: createEngineeringSupplier
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringSupplier
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringSupplierById
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
          // 供应商名称
          span: 12,
          prop: 'name',
          name: 'supplier.name',
          type: 'text',
          rules: [{ required: true }]
        },
        // {
        //   // 供应商类别
        //   span: 12,
        //   prop: '字段',
        //   name: '国际化',
        //   type: 'select',
        //   className: 'select-block',
        //   placeholder: '国际化',
        //   rules: [{ required: true }],
        //   items: this.getDictByType('gender'),
        //   itemType: 'dict'
        // },
        {
          // 是否挂靠
          span: 12,
          prop: 'isRely',
          name: 'supplier.isRely',
          type: 'select',
          className: 'select-block',
          placeholder: 'supplier.isRely',
          rules: [{ required: true }],
          items: this.getDictByType('supplier_is_rely'),
          itemType: 'dict'
        },
        {
          // 供货商评级
          span: 12,
          prop: 'supplierGrade',
          name: 'supplier.supplierGrade',
          type: 'select',
          className: 'select-block',
          placeholder: 'supplier.supplierGrade',
          rules: [{ required: true }],
          items: this.getDictByType('supplier_grade'),
          itemType: 'dict'
        },
        {
          // 法人代表
          span: 12,
          prop: 'supplierCorporation',
          name: 'supplier.supplierCorporation',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 法人电话
          span: 12,
          prop: 'supplierCorporationPhone',
          name: 'supplier.supplierCorporationPhone',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 联系人
          span: 12,
          prop: 'supplierLinkman',
          name: 'supplier.supplierLinkman',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 联系电话
          span: 12,
          prop: 'supplierLinkphone',
          name: 'supplier.supplierLinkphone',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 注册地址
          span: 12,
          prop: 'supplierAddress',
          name: 'supplier.supplierAddress',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 供货商备注
          span: 12,
          prop: 'supplierDetail',
          name: 'supplier.supplierDetail',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 } }
        },
        {
          // 供货商文件
          span: 24,
          prop: 'supplierOssIds',
          name: 'supplier.supplierOssIds',
          type: 'file-upload',
          rules: [{ required: true }],
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-file',
            propName: 'supplierOssIds',
            format: 2,
            mergeData: { target: 'supplierOssIds' }
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
