/* eslint-disable vue/html-end-tags */
<template>
  <el-row :gutter="10">
    <el-col
      :span="formConfig.formSpan"
      :lg="formConfig.formSpan"
      :md="formConfig.formSpan"
      :sm="24"
      :xs="24"
    >
      <div class="form-title">{{ formGenerateTitle[$attrs.pageinfo.data.pageType] }}</div>
      <yunlin-form
        ref="yunlinForm"
        :config="formConfig"
        :handle="formHandle"
        :data="formData"
        :rules="formRules"
        v-bind="$attrs"
        @merge-data="mergeDataHandle"
        @generate-rule-by-prop="generateRuleByProp"
        @check-action="checkAction"
        @update-form-data="updateFormData"
        v-on="$listeners"
      >
        <template slot="footer">
          <div class="form-submit-container">
            <el-button
              v-if="checkPageType(['create', 'edit', 'detail'])"
              :size="formConfig.formSize"
              @click.stop="handleCancle"
            >返回</el-button>
            <el-button
              v-if="formHandle.create && checkPageType(['create']) && filterPermission('sys:menu:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="handleSubmit"
            >新增</el-button>
            <el-button
              v-if="formHandle.edit && checkPageType(['edit']) && filterPermission('sys:menu:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="handleSubmit"
            >修改</el-button>
          </div>
        </template>
      </yunlin-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import formMixin from '@/mixins/form-mixin'
import { getMenuList, createMenu, editMenu, getMenuById } from '@/api/sys/menu'
import { getIconList, getResourceSelector } from '@/utils'
import { validateEmpty } from '@/utils/validator'
export default {
  name: 'Form',
  components: {},
  mixins: [formMixin],
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
          api: createMenu
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editMenu
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getMenuById
        }
      },
      // 初始化数据定义
      formDefaultData: {
        type: 0,
        sort: 0,
        pid: 0,
        resourceList: [],
        parentName: '一级菜单'
      },
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [
        {
          prop: 'type',
          exclude: [
            { value: 0, props: ['permissions'] },
            { value: 1, props: ['url', 'icon'] }
          ],
          disabledPageType: ['edit']
        }
      ]
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
  },
  activated() {
    console.log('form activated')
    this.init()
  },
  created() {
    // console.log(this.$attrs.pageinfo)
    // console.log('form created')
  },
  methods: {
    generateTitle() {
      const { formTitle } = this
      this.formGenerateTitle = formTitle
    },
    init() {
      // 设置整体表单栅格列数
      this.formConfig.formSpan = 12
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 类型
          span: 24,
          prop: 'type',
          name: 'menu.type',
          type: 'radio-group',
          items: [
            { label: 0, name: 'menu.type0' },
            { label: 1, name: 'menu.type1' }
          ]
        },
        {
          // 名称
          span: 24,
          prop: 'name',
          name: 'menu.name',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 上级菜单
          span: 24,
          prop: 'pid',
          name: 'menu.parentName',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getMenuList,
            requestParams: { type: 0 },
            i18nDefault: 'menu.parentNameDefault',
            propName: 'parentName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'parentName', defalut: '' },
              { source: 'id', target: 'pid', defalut: 0 }
            ],
            updateCheck: ['popover-tree']
          }
        },
        {
          // 路由
          span: 24,
          prop: 'url',
          name: 'menu.url',
          type: 'text'
        },
        {
          // 排序
          span: 24,
          prop: 'sort',
          name: 'menu.sort',
          type: 'input-number',
          attrs: {
            controlsPosition: 'right',
            min: 0
          }
        },
        {
          // 图标
          span: 24,
          prop: 'icon',
          name: 'menu.icon',
          type: 'popover-icon',
          component: 'toolPopoverIcon',
          componentConfig: {
            request: args => {
              return Promise.resolve(getIconList(args))
            },
            requestParams: {},
            i18nName: 'menu.icon',
            propName: 'icon',
            sourceName: 'name',
            mergeData: [{ source: 'name', target: 'icon' }],
            compareKey: 'name'
          }
        },
        // 授权标识
        {
          span: 24,
          prop: 'permissions',
          name: 'menu.permissions',
          placeholder: 'menu.permissionsTips',
          type: 'text'
        },
        // 授权资源
        {
          span: 24,
          prop: 'resourceList',
          name: 'menu.resource',
          type: 'resource-selector',
          rules: [{ required: true }, { validator: validateEmpty, trigger: 'blur' }],
          ruleConfig: {
            nodata: false
          },
          component: 'toolResourceSelector',
          componentConfig: {
            request: args => {
              return Promise.resolve(getResourceSelector(args))
            },
            requestParams: {},
            propName: 'resourceList',
            defaultItem: {
              resourceMethod: 'GET',
              resourceUrl: ''
            },
            mergeData: { target: 'resourceList' }
          }
        }
      ]

      // 初始化数据
      this.initFormData()
      // 根据当前行为生成校验规则等
      this.generateForm()
      // 生成标题
      this.generateTitle()
    }
  }
}
</script>
