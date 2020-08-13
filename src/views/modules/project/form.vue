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
              v-if="containsPageType(['create']) && filterPermission('project:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('project:update')"
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
import { createProject, editProject, getProjectById, getProjectSchoolList } from '@/api/project'
import { validateMobile } from '@/utils/validator'
import levelComponent from './page-component/level'
import goodsComponent from './page-component/goods'

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
          api: createProject
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editProject
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getProjectById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        isLinkHousekeeper: 1,
        interiorCheckType: 0
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
          // 分割线
          span: 24,
          name: 'project.baseInfo',
          type: 'divider'
        },
        {
          // 项目名称
          span: 24,
          prop: 'projectName',
          name: 'project.projectName',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 30 }
        },
        {
          // 学校
          span: 24,
          prop: 'schoolId',
          name: 'project.schoolId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'project.schoolId',
          items: []
        },
        {
          // 项目负责人
          span: 24,
          prop: 'projectManager',
          name: 'project.projectManager',
          type: 'text',
          attrs: { maxlength: 15 }
        },
        {
          // 项目联系电话
          span: 24,
          prop: 'projectLinkPhone',
          name: 'project.projectLinkPhone',
          type: 'text',
          rules: [{ validator: validateMobile, trigger: 'blur' }],
          attrs: { maxlength: 11 }
        },
        {
          // 分割线
          span: 24,
          name: 'project.projectConfig',
          type: 'divider'
        },
        {
          // 是否开启联系宿管
          span: 24,
          prop: 'isLinkHousekeeper',
          name: 'project.isLinkHousekeeper',
          type: 'radio-group',
          rules: [{ required: true }],
          items: this.getDictByType('isLinkHousekeeper', 'radio')
        },
        {
          // 内务检查类型
          span: 24,
          prop: 'interiorCheckType',
          name: 'project.interiorCheckType',
          type: 'radio-group',
          allways: true,
          rules: [{ required: true }],
          items: this.getDictByType('interiorCheckType', 'radio')
        },
        {
          // 等级设置
          span: 24,
          prop: 'level',
          name: 'project.level',
          type: 'page-component',
          rules: [{ required: true }],
          component: levelComponent,
          componentConfig: {
            propName: 'interiorCheckType'
          }
        },
        {
          // 领用物品
          span: 24,
          prop: 'goodsList',
          name: 'project.goodsList',
          type: 'page-component',
          component: goodsComponent,
          componentConfig: {
            propName: 'goodsList'
          }
        },
        {
          // 接单超时提醒
          span: 24,
          prop: 'limitOvertime',
          name: 'project.limitOvertime',
          type: 'text',
          append: {
            type: 'button',
            text: 'project.overtimeUnit'
          }
        }
      ]

      // 组装表单初始数据
      this.generateFormData()
      // 生成标题
      this.generateTitle()
      // 生成表单及验证规则
      this.generateForm()

      if (this.containsPageType(['create'])) {
        this.getProjectSchoolList()
      }
    },
    afterFormDataUpdate() {
      const { isLinkHousekeeper, levelList, scoreList, id } = this.formData
      this.$set(this.formData, 'isLinkHousekeeper', parseInt(isLinkHousekeeper))
      this.$set(this.formData, 'level', levelList || scoreList)
      this.getProjectSchoolList(id)
    },
    getProjectSchoolList(projectId = '') {
      getProjectSchoolList({
        projectId
      }).then((response) => {
        response.forEach((item) => {
          item.placeholderText = item.schoolName
          item.value = item.id
        })
        this.formResetConfigItem([{ prop: 'schoolId', items: response }])
      })
    }
  }
}
</script>
