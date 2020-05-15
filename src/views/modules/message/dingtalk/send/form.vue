<template>
  <el-row :gutter="10">
    <el-col :span="formConfig.formSpan" :lg="formConfig.formSpan" :md="formConfig.formSpan" :sm="24" :xs="24">
      <div v-if="formGenerateTitle[$attrs.page_info.data.pageType] !== ''" class="form-title">
        {{ formGenerateTitle[$attrs.page_info.data.pageType] }}
      </div>
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
            </el-button>-->
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
import { sendMessageDingtalk, getMessageDingtalkTemplateTypeList } from '@/api/message/dingtalk'
import { validateMobile } from '@/utils/validator'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerMixin],
  data() {
    return {
      // 定义表单名称
      formTitle: {
        create: ''
        // edit: this.$t('update'),
        // detail: this.$t('detail')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: sendMessageDingtalk,
          callback: this.sendMessageDingtalkCallback
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          // api: editXXX,
          // callback: this.XXXCallback
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          // api: getXXXById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: []
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
          // 钉钉用户手机
          span: 24,
          prop: 'phoneNumber',
          name: 'dingtalk.phoneNumber',
          type: 'text',
          rules: [{ required: true }, { validator: validateMobile, trigger: 'blur' }]
        },
        {
          // 通知类型
          span: 24,
          prop: 'sendType',
          name: 'dingtalk.sendType',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getMessageDingtalkTemplateTypeList,
            requestParams: {},
            itemProps: {
              label: 'dictLabel',
              value: 'dictValue'
            },
            propName: 'sendType',
            placeholder: 'dingtalk.sendType',
            className: 'select-block',
            mergeData: { target: 'sendType' }
          }
        },
        {
          // 参数值1
          span: 24,
          prop: 'value1',
          name: 'dingtalk.value1',
          type: 'text'
        },
        {
          // 参数值2
          span: 24,
          prop: 'value2',
          name: 'dingtalk.value2',
          type: 'text'
        },
        {
          // 参数值3
          span: 24,
          prop: 'value3',
          name: 'dingtalk.value3',
          type: 'text'
        },
        {
          // 参数值4
          span: 24,
          prop: 'value4',
          name: 'dingtalk.value4',
          type: 'text'
        },
        {
          // 参数值5
          span: 24,
          prop: 'value5',
          name: 'dingtalk.value5',
          type: 'text'
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
    sendMessageDingtalkCallback() {
      this.resetHandle()
      this.$drawerCloseByChild()
    }
  }
}
</script>
