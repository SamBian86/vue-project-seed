<template>
  <el-row :gutter="10">
    <el-col
      :span="formConfig.formSpan"
      :lg="formConfig.formSpan"
      :md="formConfig.formSpan"
      :sm="24"
      :xs="24"
    >
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
            >返回</el-button>
            <el-button
              v-if="containsPageType(['create']) && filterPermission('sys:menu:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >新增</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('sys:menu:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >修改</el-button>
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
import { createDictData, editDictData, getDictDataById } from '@/api/sys/dictData'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin],
  data() {
    return {
      // 定义表单名称
      formTitle: {
        create: '新增',
        edit: '修改',
        detail: '详情'
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: createDictData
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editDictData
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getDictDataById
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
          // 字典值
          span: 24,
          prop: 'dictValue',
          name: 'dict.dictValue',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 字典标签
          span: 24,
          prop: 'dictLabel',
          name: 'dict.dictLabel',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 排序
          span: 24,
          prop: 'sort',
          name: 'dict.sort',
          type: 'input-number',
          rules: [{ required: true }],
          attrs: {
            controlsPosition: 'right',
            min: 0
          }
        },
        {
          // 字典类型
          span: 24,
          prop: 'remark',
          name: 'dict.remark',
          type: 'textarea',
          attrs: { autosize: { minRows: 2, maxRows: 4 } }
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
