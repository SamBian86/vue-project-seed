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
              v-if="containsPageType(['create']) && filterPermission('engineering:project:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:project:update')"
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
import { createEngineeringProject, editEngineeringProject, getEngineeringProjectById } from '@/api/engineering/project'
import { getEngineeringProjectareaList } from '@/api/engineering/projectarea'
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
          api: createEngineeringProject
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringProject
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringProjectById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        projectStatus: 0
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
          // 项目名称
          span: 8,
          prop: 'name',
          name: 'project.name',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 项目状态
          span: 8,
          prop: 'projectStatus',
          name: 'project.projectStatus',
          type: 'select',
          className: 'select-block',
          placeholder: 'project.projectStatus',
          rules: [{ required: true }],
          items: this.getDictByType('project_status'),
          itemType: 'dict'
        },
        {
          // 所属区域
          span: 8,
          prop: 'areaId',
          name: 'project.areaId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringProjectareaList,
            requestParams: {},
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'areaId',
            placeholder: 'project.areaName',
            className: 'select-block',
            mergeData: { target: 'areaId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 项目地址
          span: 16,
          prop: 'projectAddress',
          name: 'project.projectAddress',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 项目类型
          span: 8,
          prop: 'projectType',
          name: 'project.projectType',
          type: 'select',
          className: 'select-block',
          placeholder: 'project.projectType',
          rules: [{ required: true }],
          items: this.getDictByType('project_type'),
          itemType: 'dict'
        },
        {
          // 所属部门
          span: 24,
          prop: 'deptIds',
          name: 'project.deptIds',
          type: 'tree-dynamic',
          rules: [{ required: true }],
          component: 'toolTreeDynamic',
          componentConfig: {
            treeRequest: getSysDeptListAll,
            treeRequestParams: {},
            // treeResultRequest: null,
            // treeResultRequestParams: {},
            // treeResultRequestPropParams: ['id'],
            // treeResultKey: '',
            propName: 'deptIds',
            nodeKey: 'id',
            treeProps: { label: 'name', children: 'children' },
            mergeData: { target: 'deptIds' },
            accordion: false,
            showCheckbox: true,
            defaultExpandAll: false,
            componentNames: ['tree-dynamic']
          }
        },
        {
          // 总占地面积
          span: 8,
          prop: 'projectTotalArea',
          name: 'project.projectTotalArea',
          type: 'text'
        },
        {
          // 建筑用地面积
          span: 8,
          prop: 'projectConstructionLandArea',
          name: 'project.projectConstructionLandArea',
          type: 'text'
        },
        {
          // 总建筑面积
          span: 8,
          prop: 'projectTotalBuildingArea',
          name: 'project.projectTotalBuildingArea',
          type: 'text'
        },
        {
          // 建筑密度
          span: 8,
          prop: 'projectBuildingDensity',
          name: 'project.projectBuildingDensity',
          type: 'text'
        },
        {
          // 绿化面积
          span: 8,
          prop: 'projectGreenArea',
          name: 'project.projectGreenArea',
          type: 'text'
        },
        {
          // 绿地率
          span: 8,
          prop: 'projectGreenRate',
          name: 'project.projectGreenRate',
          type: 'text'
        },
        {
          // 物业公司
          span: 16,
          prop: 'projectPropertyCompany',
          name: 'project.projectPropertyCompany',
          type: 'text'
        },
        {
          // 项目详情信息
          span: 24,
          prop: 'uploadDTOs',
          name: 'project.uploadDTOs',
          type: 'file-upload',
          component: 'toolFileUpload',
          rules: [{ required: true }],
          componentConfig: {
            type: 'multiple-image',
            propName: 'uploadDTOs',
            format: 0,
            limit: 1,
            mergeData: { target: 'uploadDTOs' }
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
