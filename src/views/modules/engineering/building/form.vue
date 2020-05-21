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
              v-if="containsPageType(['create']) && filterPermission('engineering:building:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:building:update')"
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
import { createEngineeringBuilding, editEngineeringBuilding, getEngineeringBuildingById } from '@/api/engineering/building'
import { getEngineeringProjectList } from '@/api/engineering/project'

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
          api: createEngineeringBuilding
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringBuilding
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringBuildingById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        { prop: 'projectId', disabledPageType: ['edit'] },
        { prop: 'buildingNumber', disabledPageType: ['edit'] }
      ]
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
          // 项目名称
          span: 24,
          prop: 'projectId',
          name: 'building.projectId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringProjectList,
            requestParams: {},
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'projectId',
            placeholder: 'building.projectId',
            className: 'select-block',
            mergeData: { target: 'projectId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 楼栋号
          span: 24,
          prop: 'buildingNumber',
          name: 'building.buildingNumber',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 楼栋总层数
          span: 24,
          prop: 'buildingTotalFloor',
          name: 'building.buildingTotalFloor',
          type: 'text'
        },
        {
          // 楼栋层高
          span: 24,
          prop: 'projectFloorHeight',
          name: 'building.projectFloorHeight',
          type: 'text'
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'building.remark',
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
