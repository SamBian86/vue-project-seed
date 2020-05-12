<template>
  <el-row :gutter="10">
    <el-col :span="formConfig.formSpan" :lg="formConfig.formSpan" :md="formConfig.formSpan" :sm="24" :xs="24">
      <div class="form-title">{{ formGenerateTitle[$attrs.page_info.data.pageType] }}</div>
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
            <el-button v-if="containsPageType(['edit'])" type="primary" :size="formConfig.formSize" @click.stop="submitHandle">
              {{ $t('add') }}
            </el-button>
            <!-- <el-button
              v-if="containsPageType(['edit'])"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('update') }}</el-button>-->
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
import { saveMessageSmsConfig, getMessageSmsConfig } from '@/api/message/sms'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin],
  data() {
    return {
      // 定义表单名称
      formTitle: {
        // create: '新增',
        edit: '新增'
        // detail: '详情'
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          // api: saveMessageSmsConfig
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: saveMessageSmsConfig
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getMessageSmsConfig
        }
      },
      // 初始化数据定义
      formDefaultData: {
        platform: 1
      },
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        {
          prop: 'platform',
          exclude: [
            { value: 1, props: ['qcloudAppId', 'qcloudAppKey', 'qcloudSignName', 'qcloudTemplateId'] },
            { value: 2, props: ['aliyunAccessKeyId', 'aliyunAccessKeySecret', 'aliyunSignName', 'aliyunTemplateCode'] }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
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
          // 平台类型
          span: 24,
          prop: 'platform',
          name: 'sms.platform',
          type: 'radio-group',
          rules: [{ required: true }],
          items: [
            { label: 1, name: 'sms.platform1' },
            { label: 2, name: 'sms.platform2' }
          ]
        },
        {
          // 阿里key
          span: 24,
          prop: 'aliyunAccessKeyId',
          name: 'sms.aliyunAccessKeyId',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 阿里secret
          span: 24,
          prop: 'aliyunAccessKeySecret',
          name: 'sms.aliyunAccessKeySecret',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 阿里短信签名
          span: 24,
          prop: 'aliyunSignName',
          name: 'sms.aliyunSignName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 阿里短信模板
          span: 24,
          prop: 'aliyunTemplateCode',
          name: 'sms.aliyunTemplateCode',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 腾讯AppId
          span: 24,
          prop: 'qcloudAppId',
          name: 'sms.qcloudAppId',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 腾讯AppKey
          span: 24,
          prop: 'qcloudAppKey',
          name: 'sms.qcloudAppKey',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 腾讯短信签名
          span: 24,
          prop: 'qcloudSignName',
          name: 'sms.qcloudSignName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 腾讯短信模板
          span: 24,
          prop: 'qcloudTemplateId',
          name: 'sms.qcloudTemplateId',
          type: 'text',
          rules: [{ required: true }]
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
