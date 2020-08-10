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
              v-if="containsPageType(['create']) && filterPermission('student:checkout:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('add') }}
            </el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('student:checkout:update')"
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
import { getStudentDormitoryById } from '@/api/student/dormitory'
import listComponent from './list'
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
          // api: editXXX
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getStudentDormitoryById
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
          // 分割线
          span: 24,
          name: 'studentCheckout.baseInfo',
          type: 'divider'
        },
        {
          // 入宿时间
          span: 24,
          prop: 'createDate',
          name: 'studentCheckout.createDate',
          type: 'text'
        },
        {
          // 学生
          span: 24,
          prop: 'studentName',
          name: 'studentCheckout.studentName',
          type: 'text'
        },
        {
          // 手机号
          span: 24,
          prop: 'studentPhone',
          name: 'studentCheckout.studentPhone',
          type: 'text'
        },
        {
          // 学号
          span: 24,
          prop: 'studentNo',
          name: 'studentCheckout.studentNo',
          type: 'text'
        },
        {
          // 学院
          span: 24,
          prop: 'branchName',
          name: 'studentCheckout.branchName',
          type: 'text'
        },
        {
          // 班级
          span: 24,
          prop: 'className',
          name: 'studentCheckout.className',
          type: 'text'
        },
        {
          // 宿舍楼栋
          span: 24,
          prop: 'buildingName',
          name: 'studentCheckout.buildingName',
          type: 'text'
        },
        {
          // 宿舍号
          span: 24,
          prop: 'roomName',
          name: 'studentCheckout.roomName',
          type: 'text'
        },
        {
          // 分割线
          span: 24,
          name: 'studentCheckout.otherInfo',
          type: 'divider'
        },
        {
          // 领用物品
          span: 24,
          prop: 'collectingList',
          name: 'studentCheckout.collectingList',
          type: 'page-component',
          component: listComponent,
          componentConfig: {
            propName: 'collectingList'
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
