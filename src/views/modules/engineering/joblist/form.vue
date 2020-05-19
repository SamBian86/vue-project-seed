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
            <el-button
              v-if="containsPageType(['create']) && filterPermission('engineering:joblist:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('add') }}
            </el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:joblist:update')"
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
import {
  createEngineeringJoblist,
  editEngineeringJoblist,
  getEngineeringJoblistById,
  getEngineeringJoblist
} from '@/api/engineering/joblist'
import { getSysDeptListAll } from '@/api/sys/dept'

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
          api: createEngineeringJoblist
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringJoblist
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringJoblistById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        pid: 0
      },
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [{ prop: 'deptName', disabledPageType: ['create', 'edit', 'detail'] }]
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
    beforeInit() {
      const { deptId } = this.$attrs.page_info.data
      this.deptId = deptId
    },
    init() {
      this.beforeInit()
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 岗位名称
          span: 24,
          prop: 'jobName',
          name: 'joblist.jobName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 上级岗位
          span: 24,
          prop: 'pjobName',
          name: 'joblist.pjobName',
          type: 'select-dynamic',
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringJoblist,
            requestParams: {},
            itemProps: {
              label: 'jobName',
              value: 'id'
            },
            propName: 'pjobName',
            placeholder: 'joblist.pjobName',
            className: 'select-block',
            mergeData: { target: 'pid' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 所属部门
          span: 24,
          prop: 'deptName',
          name: 'joblist.deptName',
          type: 'popover-tree',
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'menu.parentNameDefault',
            propName: 'deptName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'deptName', default: '' },
              { source: 'id', target: 'deptId', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'joblist.remark',
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
