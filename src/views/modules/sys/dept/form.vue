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
              v-if="containsPageType(['create']) && filterPermission('sys:dept:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('sys:dept:update')"
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
import { createSysDept, editSysDept, getSysDeptById, getSysDeptListAll } from '@/api/sys/dept'
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
          api: createSysDept
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editSysDept
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getSysDeptById
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
          // 组织类型
          span: 24,
          prop: 'type',
          name: 'dept.type',
          type: 'select',
          className: 'select-block',
          placeholder: 'dept.type',
          rules: [{ required: true }],
          items: this.getDictByType('deptType'),
          itemType: 'dict'
        },
        {
          // 组织名称
          span: 24,
          prop: 'name',
          name: 'dept.name',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 30 }
        },
        {
          // 上级组织
          span: 24,
          prop: 'pid',
          name: 'dept.pid',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'menu.parentNameDefault',
            propName: 'parentName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'parentName', default: '' },
              { source: 'id', target: 'pid', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 联系人
          span: 24,
          prop: 'contactName',
          name: 'dept.contactName',
          type: 'text',
          attrs: { maxlength: 15 }
        },
        {
          // 联系电话
          span: 24,
          prop: 'contactPhone',
          name: 'dept.contactPhone',
          type: 'text',
          attrs: { maxlength: 11 }
        },
        {
          // 联系地址
          span: 24,
          prop: 'contactAddress',
          name: 'dept.contactAddress',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 }, maxlength: 50 }
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
