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
              v-if="containsPageType(['create']) && filterPermission('sys:user:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >
              {{ $t('add') }}
            </el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('sys:user:update')"
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
import { createUser, editUser, getUserById } from '@/api/sys/user'
import { getSysDeptListAll } from '@/api/sys/dept'
import { validateEmail, validateMobile } from '@/utils/validator'
import { getSysRoleList } from '@/api/sys/role'

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
          api: createUser
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editUser
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getUserById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        gender: 0,
        status: 1,
        deptId: 0
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
          // 用户名
          span: 24,
          prop: 'username',
          name: 'user.username',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 所属部门
          span: 24,
          prop: 'deptName',
          name: 'user.deptName',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            treeDataFilter: true,
            treeDataFilterKey: '',
            i18nDefault: 'dept.title',
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
          // 密码
          span: 24,
          prop: 'password',
          name: 'user.password',
          type: 'text'
        },
        {
          // 确认密码
          span: 24,
          prop: 'confirmPassword',
          name: 'user.confirmPassword',
          type: 'text'
        },
        {
          // 真实姓名
          span: 24,
          prop: 'realName',
          name: 'user.realName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 性别
          span: 24,
          prop: 'gender',
          name: 'user.gender',
          type: 'radio-group',
          items: this.dictDataForComponent('gender', { dictLabel: 'name', dictValue: 'label' })
        },
        {
          // 邮箱
          span: 24,
          prop: 'email',
          name: 'user.email',
          type: 'text',
          rules: [{ required: true }, { validator: validateEmail, trigger: 'blur' }]
        },
        {
          // 手机号
          span: 24,
          prop: 'mobile',
          name: 'user.mobile',
          type: 'text',
          rules: [{ required: true }, { validator: validateMobile, trigger: 'blur' }]
        },
        {
          // 角色
          span: 24,
          prop: 'roleIdList',
          name: 'user.roleIdList',
          type: 'select-dynamic',
          component: 'toolSelectDynamic',
          componentConfig: {
            multiple: true,
            request: getSysRoleList,
            requestParams: {},
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'roleIdList',
            placeholder: 'user.roleIdList',
            className: 'select-block',
            mergeData: { target: 'roleIdList' }
          }
        },
        {
          // 状态
          span: 24,
          prop: 'status',
          name: 'user.status',
          type: 'radio-group',
          items: [
            { label: 0, name: 'user.status0' },
            { label: 1, name: 'user.status1' }
          ]
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
