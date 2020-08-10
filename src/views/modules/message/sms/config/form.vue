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
        v-on="$listeners"
      >
        <template slot="footer">
          <div class="form-submit-container">
            <el-button
              v-if="containsPageType(['create', 'edit', 'detail'])"
              :size="formConfig.formSize"
              @click.stop="cancleHandle"
            >{{ $t('back') }}</el-button>
            <!-- <el-button v-if="containsPageType(['create'])" type="primary" :size="formConfig.formSize" @click.stop="submitHandle">
              {{ $t('add') }}
            </el-button>-->
            <el-button
              v-if="containsPageType(['create', 'edit'])"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('confirm') }}</el-button>
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
import drawerMixin from '@/mixins/drawer-mixin'
import { saveMessageSmsConfig, updateMessageSmsConfig, getMessageSmsConfig } from '@/api/message/sms'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerMixin],
  data() {
    return {
      // 定义表单名称
      formTitle: {
        create: '',
        edit: ''
        // detail: this.$t('detail')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: saveMessageSmsConfig,
          callback: this.saveMessageSmsConfigCallback
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: updateMessageSmsConfig,
          callback: this.updateMessageSmsConfigCallback
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
            {
              value: 1,
              props: [
                'qcloudAppId',
                'qcloudAppKey',
                'qcloudSignName',
                'qcloudTemplateId',
                'qiniuAccessKey',
                'qiniuSecretKey',
                'qiniuTemplateId'
              ]
            },
            {
              value: 2,
              props: [
                'aliyunAccessKeyId',
                'aliyunAccessKeySecret',
                'aliyunSignName',
                'aliyunTemplateCode',
                'qiniuAccessKey',
                'qiniuSecretKey',
                'qiniuTemplateId'
              ]
            },
            {
              value: 3,
              props: [
                'qcloudAppId',
                'qcloudAppKey',
                'qcloudSignName',
                'qcloudTemplateId',
                'aliyunAccessKeyId',
                'aliyunAccessKeySecret',
                'aliyunSignName',
                'aliyunTemplateCode'
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission', 'getDictByType'])
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
      const { pageType } = this.$attrs.page_drawer_data.data
      this.formGenerateTitle = formTitle

      if (pageType === 'create') {
        this.$set(this.formData, 'aliyunAccessKeyId', '')
        this.$set(this.formData, 'aliyunAccessKeySecret', '')
        this.$set(this.formData, 'aliyunSignName', '')
        this.$set(this.formData, 'aliyunTemplateCode', '')
        this.$set(this.formData, 'qcloudAppId', '')
        this.$set(this.formData, 'qcloudAppKey', '')
        this.$set(this.formData, 'qcloudSignName', '')
        this.$set(this.formData, 'qcloudTemplateId', '')
        this.$set(this.formData, 'qiniuAccessKey', '')
        this.$set(this.formData, 'qiniuSecretKey', '')
        this.$set(this.formData, 'qiniuTemplateId', '')
        this.$set(this.formData, 'remark', '')
        this.$set(this.formData, 'smsCode', '')
      }
    },
    init() {
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 短信编码
          span: 24,
          prop: 'smsCode',
          name: 'sms.smsCode',
          type: 'select',
          className: 'select-block',
          placeholder: 'sms.smsCode',
          rules: [{ required: true }],
          items: this.getDictByType('smsType'),
          itemType: 'dict'
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'sms.remark',
          type: 'text'
        },
        {
          // 平台类型
          span: 24,
          prop: 'platform',
          name: 'sms.platform',
          type: 'radio-group',
          rules: [{ required: true }],
          items: [
            { label: 1, name: 'sms.platform1' },
            { label: 2, name: 'sms.platform2' },
            { label: 3, name: 'sms.platform3' }
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
        },
        {
          // 七牛AccessKey
          span: 24,
          prop: 'qiniuAccessKey',
          name: 'sms.qiniuAccessKey',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 七牛SecretKey
          span: 24,
          prop: 'qiniuSecretKey',
          name: 'sms.qiniuSecretKey',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 短信模板ID
          span: 24,
          prop: 'qiniuTemplateId',
          name: 'sms.qiniuTemplateId',
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
    },
    cancleHandle() {
      this.$drawerCloseByChild()
    },
    saveMessageSmsConfigCallback() {
      this.$drawerCloseByChild()
    },
    updateMessageSmsConfigCallback() {
      this.$drawerCloseByChild()
    },
    beforeSubmitHandle() {
      const { formData } = this
      const config = {}
      config.aliyunAccessKeyId = formData.aliyunAccessKeyId
      config.aliyunAccessKeySecret = formData.aliyunAccessKeySecret
      config.aliyunSignName = formData.aliyunSignName
      config.aliyunTemplateCode = formData.aliyunTemplateCode
      config.qcloudAppId = formData.qcloudAppId
      config.qcloudAppKey = formData.qcloudAppKey
      config.qcloudSignName = formData.qcloudSignName
      config.qcloudTemplateId = formData.qcloudTemplateId
      config.qiniuAccessKey = formData.qiniuAccessKey
      config.qiniuSecretKey = formData.qiniuSecretKey
      config.qiniuTemplateId = formData.qiniuTemplateId
      this.$set(this.formData, 'config', config)
    },
    // 获取详情数据以后的处理
    afterFormDataUpdate() {
      const { formData } = this
      const { smsCode } = this.formData
      this.$set(this.formData, 'smsCode', !isNaN(smsCode) ? parseInt(smsCode) : '')

      this.$set(this.formData, 'aliyunAccessKeyId', formData.config.aliyunAccessKeyId)
      this.$set(this.formData, 'aliyunAccessKeySecret', formData.config.aliyunAccessKeySecret)
      this.$set(this.formData, 'aliyunSignName', formData.config.aliyunSignName)
      this.$set(this.formData, 'aliyunTemplateCode', formData.config.aliyunTemplateCode)
      this.$set(this.formData, 'qcloudAppId', formData.config.qcloudAppId)
      this.$set(this.formData, 'qcloudAppKey', formData.config.qcloudAppKey)
      this.$set(this.formData, 'qcloudSignName', formData.config.qcloudSignName)
      this.$set(this.formData, 'qcloudTemplateId', formData.config.qcloudTemplateId)
      this.$set(this.formData, 'qiniuAccessKey', formData.config.qiniuAccessKey)
      this.$set(this.formData, 'qiniuSecretKey', formData.config.qiniuSecretKey)
      this.$set(this.formData, 'qiniuTemplateId', formData.config.qiniuTemplateId)
      console.log(this.formData)
    }
  }
}
</script>
