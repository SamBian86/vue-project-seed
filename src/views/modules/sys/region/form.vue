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
              v-if="containsPageType(['create']) && filterPermission('sys:region:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >新增</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('sys:region:update')"
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
import { createRegion, editRegion, getRegionById, getRegionTree } from '@/api/sys/region'
import { treeDataTranslate } from '@/utils'

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
          api: createRegion
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editRegion
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getRegionById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        sort: 0,
        pid: 0,
        parentName: '',
        hasChildren: '',
        treeLevel: 1
      },
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        {
          prop: 'id',
          exclude: [],
          disabledPageType: ['edit']
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
          // 上级区域
          span: 24,
          prop: 'parentName',
          name: 'region.parentName',
          type: 'popover-tree',
          component: 'toolPopoverTree',
          componentConfig: {
            request: getRegionTree,
            requestParams: {},
            treeDataTranslate,
            treeDataFilter: true,
            treeDataFilterKey: 'name',
            i18nDefault: 'region.select',
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
          // 区域名称
          span: 24,
          prop: 'name',
          name: 'region.name',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 区域标识
          span: 24,
          prop: 'id',
          name: 'region.id',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 排序
          span: 24,
          prop: 'sort',
          name: 'region.sort',
          type: 'input-number',
          attrs: {
            controlsPosition: 'right',
            min: 0
          }
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
