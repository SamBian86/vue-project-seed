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
            <el-button v-if="containsPageType(['edit'])" type="primary" :size="formConfig.formSize" @click.stop="submitHandle">
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
import drawerMixin from '@/mixins/drawer-mixin'
import { createProcBizRoute, editProcBizRoute, getProcDefBizRouteById } from '@/api/activiti/process'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerMixin],
  data() {
    return {
      // 定义表单名称
      formTitle: {
        // create: this.$t('add'),
        edit: ''
        // detail: this.$t('detail')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: createProcBizRoute,
          callback: this.createProcBizRouteCallback
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editProcBizRoute,
          callback: this.editProcBizRouteCallback
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getProcDefBizRouteById
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
          // 业务路由
          span: 24,
          prop: 'bizRoute',
          name: 'process.bizRoute',
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
    createProcBizRouteCallback() {
      this.$drawerCloseByChild()
    },
    editProcBizRouteCallback() {
      this.$drawerCloseByChild()
    }
  }
}
</script>
