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
            <el-button v-if="containsPageType(['create'])" type="primary" :size="formConfig.formSize" @click.stop="submitHandle">
              {{ $t('confirm') }}
            </el-button>
            <!-- <el-button
              v-if="containsPageType(['edit'])"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('update') }}
            </el-button> -->
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
import { saveOssFileConfig, getOssFileInfo } from '@/api/oss/oss'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerMixin],
  data() {
    return {
      // 定义表单名称
      formTitle: {
        create: ''
        // edit: this.$t('edit'),
        // detail: this.$t('detail')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: saveOssFileConfig,
          callback: this.saveOssFileConfigCallback
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          // api: editXXX,
          // callback: this.XXXCallback
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getOssFileInfo
        }
      },
      // 初始化数据定义
      formDefaultData: {
        type: 1
      },
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        {
          prop: 'type',
          exclude: [
            {
              value: 1,
              props: [
                'aliyunDomain',
                'aliyunPrefix',
                'aliyunEndPoint',
                'aliyunAccessKeyId',
                'aliyunAccessKeySecret',
                'aliyunBucketName',
                'qcloudDomain',
                'qcloudPrefix',
                'qcloudAppId',
                'qcloudSecretId',
                'qcloudSecretKey',
                'qcloudBucketName',
                'qcloudRegion',
                'fastdfsDomain',
                'localDomain',
                'localPrefix',
                'localPath'
              ]
            },
            {
              value: 2,
              props: [
                'qiniuDomain',
                'qiniuPrefix',
                'qiniuAccessKey',
                'qiniuSecretKey',
                'qiniuBucketName',
                'qcloudDomain',
                'qcloudPrefix',
                'qcloudAppId',
                'qcloudSecretId',
                'qcloudSecretKey',
                'qcloudBucketName',
                'qcloudRegion',
                'fastdfsDomain',
                'localDomain',
                'localPrefix',
                'localPath'
              ]
            },
            {
              value: 3,
              props: [
                'qiniuDomain',
                'qiniuPrefix',
                'qiniuAccessKey',
                'qiniuSecretKey',
                'qiniuBucketName',
                'aliyunDomain',
                'aliyunPrefix',
                'aliyunEndPoint',
                'aliyunAccessKeyId',
                'aliyunAccessKeySecret',
                'aliyunBucketName',
                'fastdfsDomain',
                'localDomain',
                'localPrefix',
                'localPath'
              ]
            },
            {
              value: 4,
              props: [
                'qiniuDomain',
                'qiniuPrefix',
                'qiniuAccessKey',
                'qiniuSecretKey',
                'qiniuBucketName',
                'aliyunDomain',
                'aliyunPrefix',
                'aliyunEndPoint',
                'aliyunAccessKeyId',
                'aliyunAccessKeySecret',
                'aliyunBucketName',
                'qcloudDomain',
                'qcloudPrefix',
                'qcloudAppId',
                'qcloudSecretId',
                'qcloudSecretKey',
                'qcloudBucketName',
                'qcloudRegion',
                'localDomain',
                'localPrefix',
                'localPath'
              ]
            },
            {
              value: 5,
              props: [
                'qiniuDomain',
                'qiniuPrefix',
                'qiniuAccessKey',
                'qiniuSecretKey',
                'qiniuBucketName',
                'aliyunDomain',
                'aliyunPrefix',
                'aliyunEndPoint',
                'aliyunAccessKeyId',
                'aliyunAccessKeySecret',
                'aliyunBucketName',
                'qcloudDomain',
                'qcloudPrefix',
                'qcloudAppId',
                'qcloudSecretId',
                'qcloudSecretKey',
                'qcloudBucketName',
                'qcloudRegion',
                'fastdfsDomain'
              ]
            }
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
          // 类型
          span: 24,
          prop: 'type',
          name: 'oss.type',
          type: 'radio-group',
          rules: [{ required: true }],
          items: [
            { label: 1, name: 'oss.type1' },
            { label: 2, name: 'oss.type2' },
            { label: 3, name: 'oss.type3' },
            { label: 4, name: 'oss.type4' },
            { label: 5, name: 'oss.type5' }
          ]
        },
        // 七牛
        // 'qiniuDomain','qiniuPrefix','qiniuAccessKey','qiniuSecretKey','qiniuBucketName'
        {
          // 域名
          span: 24,
          prop: 'qiniuDomain',
          name: 'oss.qiniuDomain',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 路径前缀
          span: 24,
          prop: 'qiniuPrefix',
          name: 'oss.qiniuPrefix',
          type: 'text'
        },
        {
          // AccessKey
          span: 24,
          prop: 'qiniuAccessKey',
          name: 'oss.qiniuAccessKey',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // SecretKey
          span: 24,
          prop: 'qiniuSecretKey',
          name: 'oss.qiniuSecretKey',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 空间名
          span: 24,
          prop: 'qiniuBucketName',
          name: 'oss.qiniuBucketName',
          type: 'text',
          rules: [{ required: true }]
        },
        // 阿里云
        // 'aliyunDomain', 'aliyunPrefix', 'aliyunEndPoint', 'aliyunAccessKeyId', 'aliyunAccessKeySecret', 'aliyunBucketName'
        {
          // 域名
          span: 24,
          prop: 'aliyunDomain',
          name: 'oss.aliyunDomain',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 路径前缀
          span: 24,
          prop: 'aliyunPrefix',
          name: 'oss.aliyunPrefix',
          type: 'text'
        },
        {
          // EndPoint
          span: 24,
          prop: 'aliyunEndPoint',
          name: 'oss.aliyunEndPoint',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // AccessKeyId
          span: 24,
          prop: 'aliyunAccessKeyId',
          name: 'oss.aliyunAccessKeyId',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // AccessKeySecret
          span: 24,
          prop: 'aliyunAccessKeySecret',
          name: 'oss.aliyunAccessKeySecret',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // BucketName
          span: 24,
          prop: 'aliyunBucketName',
          name: 'oss.aliyunBucketName',
          type: 'text',
          rules: [{ required: true }]
        },
        // 腾讯云
        // 'qcloudDomain', 'qcloudPrefix', 'qcloudAppId', 'qcloudSecretId', 'qcloudSecretKey', 'qcloudBucketName', 'qcloudRegion'
        {
          // 域名
          span: 24,
          prop: 'qcloudDomain',
          name: 'oss.qcloudDomain',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 路径前缀
          span: 24,
          prop: 'qcloudPrefix',
          name: 'oss.qcloudPrefix',
          type: 'text'
        },
        {
          // AppId
          span: 24,
          prop: 'qcloudAppId',
          name: 'oss.qcloudAppId',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // SecretId
          span: 24,
          prop: 'qcloudSecretId',
          name: 'oss.qcloudSecretId',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // SecretKey
          span: 24,
          prop: 'qcloudSecretKey',
          name: 'oss.qcloudSecretKey',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // BucketName
          span: 24,
          prop: 'qcloudBucketName',
          name: 'oss.qcloudBucketName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 所属地区
          span: 24,
          prop: 'qcloudRegion',
          name: 'oss.qcloudRegion',
          type: 'select',
          placeholder: 'oss.qcloudRegionTips',
          className: 'select-block',
          rules: [{ required: true }],
          items: [
            { label: 'oss.qcloudRegionBeijing1', value: 'ap-beijing-1' },
            { label: 'oss.qcloudRegionBeijing', value: 'ap-beijing' },
            { label: 'oss.qcloudRegionShanghai', value: 'ap-shanghai' },
            { label: 'oss.qcloudRegionGuangzhou', value: 'ap-guangzhou' },
            { label: 'oss.qcloudRegionChengdu', value: 'ap-chengdu' },
            { label: 'oss.qcloudRegionChongqing', value: 'ap-chongqing' },
            { label: 'oss.qcloudRegionSingapore', value: 'ap-singapore' },
            { label: 'oss.qcloudRegionHongkong', value: 'ap-hongkong' },
            { label: 'oss.qcloudRegionToronto', value: 'na-toronto' },
            { label: 'oss.qcloudRegionFrankfurt', value: 'eu-frankfurt' }
          ]
        },
        // FastDFS
        // 'fastdfsDomain'
        {
          // 域名
          span: 24,
          prop: 'fastdfsDomain',
          name: 'oss.fastdfsDomain',
          type: 'text',
          rules: [{ required: true }]
        },
        // 本地上传
        // 'localDomain', 'localPrefix', 'localPath'
        {
          // 域名
          span: 24,
          prop: 'localDomain',
          name: 'oss.localDomain',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 路径前缀
          span: 24,
          prop: 'localPrefix',
          name: 'oss.localPrefix',
          type: 'text'
        },
        {
          // 存储目录
          span: 24,
          prop: 'localPath',
          name: 'oss.localPath',
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
      // this.resetHandle()
      this.$drawerCloseByChild()
    },
    saveOssFileConfigCallback() {
      // this.resetHandle()
      this.$drawerCloseByChild()
    }
  }
}
</script>
