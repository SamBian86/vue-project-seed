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
              v-if="containsPageType(['create']) && filterPermission('sys:role:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('add') }}
            </el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('sys:role:update')"
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
import { createSysRole, editSysRole, getSysRoleById } from '@/api/sys/role'
import { getMenuSelectList } from '@/api/sys/menu'
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
          api: createSysRole
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editSysRole
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: null
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
          // 名称
          span: 24,
          prop: 'name',
          name: 'role.name',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'role.remark',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 } }
        },
        {
          // 菜单权限
          span: 24,
          prop: 'menuIdList',
          name: 'role.menuList',
          type: 'tree-dynamic',
          component: 'toolTreeDynamic',
          componentConfig: {
            treeRequest: getMenuSelectList,
            treeRequestParams: {},
            treeResultRequest: getSysRoleById,
            treeResultRequestParams: {},
            treeResultRequestPropParams: ['id'],
            treeResultKey: 'menuIdList',
            propName: 'menuIdList',
            nodeKey: 'id',
            treeProps: { label: 'name', children: 'children' },
            mergeData: { target: 'menuIdList' },
            accordion: true,
            showCheckbox: true,
            componentNames: ['tree-dynamic-1']
          }
        },
        {
          // 数据授权
          span: 24,
          prop: 'deptIdList',
          name: 'role.deptList',
          type: 'tree-dynamic',
          component: 'toolTreeDynamic',
          componentConfig: {
            treeRequest: getSysDeptListAll,
            treeRequestParams: {},
            treeResultRequest: getSysRoleById,
            treeResultRequestParams: {},
            treeResultRequestPropParams: ['id'],
            treeResultKey: 'deptIdList',
            propName: 'deptIdList',
            nodeKey: 'id',
            treeProps: { label: 'name', children: 'children' },
            mergeData: { target: 'deptIdList' },
            accordion: true,
            showCheckbox: true,
            componentNames: ['tree-dynamic-2']
          }
        }
      ]

      // 组装表单初始数据
      this.generateFormData()
      // 生成标题
      this.generateTitle()
      // 生成表单及验证规则
      this.generateForm()
    },
    // 关闭前回调
    beforeCancleHandle() {
      this.$pageUpdateListAdd(['tree-dynamic-1', 'tree-dynamic-2'])
    }
  }
}
</script>
