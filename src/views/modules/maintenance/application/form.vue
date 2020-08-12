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
              v-if="containsPageType(['create']) && filterPermission('maintenance:application:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('maintenance:application:update')"
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
import { getMaintenanceApplicationById } from '@/api/maintenance/application'
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
          // api: createXXX
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          // api: editXXX
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getMaintenanceApplicationById
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
          // 分割线
          span: 24,
          name: 'maintenanceApplication.baseInfo',
          type: 'divider'
        },
        {
          // 报修时间
          span: 24,
          prop: 'createDate',
          name: 'maintenanceApplication.createDate',
          type: 'text'
        },
        {
          // 报修人
          span: 24,
          prop: 'studentName',
          name: 'maintenanceApplication.studentName',
          type: 'text'
        },
        {
          // 报修人电话
          span: 24,
          prop: 'studentPhone',
          name: 'maintenanceApplication.studentPhone',
          type: 'text'
        },
        {
          // 报修地点
          span: 24,
          prop: 'address',
          name: 'maintenanceApplication.address',
          type: 'text'
        },
        {
          // 详情内容
          span: 24,
          prop: 'details',
          name: 'maintenanceApplication.details',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 } }
        },
        {
          // 报修图片
          span: 24,
          prop: 'ossUrls',
          name: 'maintenanceApplication.ossUrls',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-image',
            propName: 'ossUrls',
            format: 0,
            limit: 99,
            mergeData: { target: 'ossUrls' }
          }
        },
        {
          // 分割线
          span: 24,
          name: 'maintenanceApplication.otherInfo',
          type: 'divider'
        },
        {
          // 处理状态
          span: 24,
          prop: 'status',
          name: 'maintenanceApplication.status',
          type: 'select',
          className: 'select-block',
          placeholder: 'maintenanceApplication.status',
          rules: [{ required: true }],
          items: this.getDictByType('maintenanceStatus'),
          itemType: 'dict'
        },
        {
          // 接单时间
          span: 24,
          prop: 'executeTime',
          name: 'maintenanceApplication.executeTime',
          type: 'text'
        },
        {
          // 处理人
          span: 24,
          prop: 'executorName',
          name: 'maintenanceApplication.executorName',
          type: 'text'
        },
        {
          // 处理人手机号
          span: 24,
          prop: 'executorPhoneNumber',
          name: 'maintenanceApplication.executorPhoneNumber',
          type: 'text'
        },
        {
          // 完成时间
          span: 24,
          prop: 'completeTime',
          name: 'maintenanceApplication.completeTime',
          type: 'text'
        },
        {
          // 完成结果
          span: 24,
          prop: 'completeType',
          name: 'maintenanceApplication.completeType',
          type: 'select',
          className: 'select-block',
          placeholder: 'maintenanceApplication.completeType',
          rules: [{ required: true }],
          items: this.getDictByType('completeType'),
          itemType: 'dict'
        },
        {
          // 完成说明
          span: 24,
          prop: 'completeComment',
          name: 'maintenanceApplication.completeComment',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 } }
        },
        {
          // 完成图片
          span: 24,
          prop: 'completeOssUrls',
          name: 'maintenanceApplication.completeOssUrls',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-image',
            propName: 'completeOssUrls',
            format: 0,
            limit: 99,
            mergeData: { target: 'completeOssUrls' }
          }
        },
        {
          // 评价结果
          span: 24,
          prop: 'evaluateComment',
          name: 'maintenanceApplication.evaluateComment',
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
