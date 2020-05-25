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
        @form-reset-config-item="formResetConfigItem"
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
            <el-button
              v-if="containsPageType(['create']) && filterPermission('engineering:draw:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('add') }}
            </el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:draw:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
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
import { editEngineeringDrawSubject } from '@/api/engineering/drawSubject'
import { getSysDeptListAll } from '@/api/sys/dept'
import { getUserList } from '@/api/sys/user'
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
          api: editEngineeringDrawSubject
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
          // 预算人
          span: 24,
          prop: 'drawingbudgetUserId',
          name: 'draw.drawingbudgetUserId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getUserList,
            requestParams: {},
            itemProps: {
              label: 'realName',
              value: 'id'
            },
            propName: 'drawingbudgetUserId',
            placeholder: 'draw.drawingbudgetUserId',
            className: 'select-block',
            mergeData: { target: 'drawingbudgetUserId' },
            mergeOtherData: [
              { source: 'deptName', target: 'drawingbudgetDeptName', default: '' },
              { source: 'deptId', target: 'drawingbudgetDeptId', default: 0 }
            ],
            componentNames: ['select-dynamic']
          }
        },
        {
          // 预算部门 getSysDeptListAll
          span: 24,
          prop: 'drawingbudgetDeptName',
          name: 'draw.drawingbudgetDeptName',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'draw.drawingbudgetDeptName',
            propName: 'drawingbudgetDeptName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'drawingbudgetDeptName', default: '' },
              { source: 'id', target: 'drawingbudgetDeptId', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 预算时间
          span: 24,
          prop: 'drawingbudgetTime',
          name: 'draw.drawingbudgetTime',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd'
        },
        {
          // 预算说明
          span: 24,
          prop: 'drawingbudgetRemark',
          name: 'draw.drawingbudgetRemark',
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
