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
              v-if="containsPageType(['create']) && filterPermission('interior:check:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('interior:check:update')"
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
import { getInteriorCheckById } from '@/api/interior/check'
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
          api: getInteriorCheckById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        {
          prop: 'interiorCheckType',
          exclude: [
            { value: 0, props: ['scoreList'] },
            { value: 1, props: ['interiorConclusion', 'regulationsRemark'] }
          ]
        }
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
    afterFormDataUpdate() {
      const { interiorConclusion, scoreList, interiorCheckType } = this.formData
      if (interiorCheckType === 1) {
        scoreList.unshift({ typeName: this.$t('interiorCheck.total'), checkScore: interiorConclusion })
        this.$set(this.formData, 'scoreList', scoreList)
      }
    },
    init() {
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 分割线
          span: 24,
          name: 'interiorCheck.baseInfo',
          type: 'divider'
        },
        {
          // 检查时间
          span: 24,
          prop: 'createDate',
          name: 'interiorCheck.createDate',
          type: 'text'
        },
        {
          // 检查人
          span: 24,
          prop: 'userName',
          name: 'interiorCheck.userName',
          type: 'text'
        },
        {
          // 宿舍
          span: 24,
          prop: 'roomName',
          name: 'interiorCheck.roomName',
          type: 'text'
        },
        {
          // 分割线
          span: 24,
          name: 'interiorCheck.otherInfo',
          type: 'divider'
        },
        {
          // 检查结果
          span: 24,
          prop: 'interiorConclusion',
          name: 'interiorCheck.interiorConclusion',
          type: 'text'
        },
        {
          // 评分列表
          span: 24,
          prop: 'scoreList',
          name: 'interiorCheck.scoreList',
          type: 'page-component',
          component: listComponent,
          componentConfig: {
            propName: 'scoreList'
          }
        },
        {
          // 备注
          span: 24,
          prop: 'regulationsRemark',
          name: 'interiorCheck.regulationsRemark',
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
