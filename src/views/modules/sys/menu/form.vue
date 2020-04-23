/* eslint-disable vue/html-end-tags */
<template>
  <el-row :gutter="10">
    <el-col :span="formConfig.formSpan" :lg="formConfig.formSpan" :md="formConfig.formSpan" :sm="24" :xs="24">
      <div class="form-title">{{ formTitle[$attrs.pageinfo.data.pageType] }}</div>
      <yunlin-form
        ref="yunlinForm"
        :config="formConfig"
        :handle="formHandle"
        :data="formData"
        :rules="formRules"
        v-bind="$attrs"
        @merge-data="mergeDataHandle"
        v-on="$listeners"
      ></yunlin-form>
    </el-col>
  </el-row>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
import { getMenuList } from '@/api/sys/menu'
import { getIconList, getResourceSelector } from '@/utils'
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
      // 初始化数据定义
      formDefaultData: {
        type: 0,
        sort: 0
      }
    }
  },
  computed: {},
  created() {
    console.log(this.$attrs.pageinfo)
    console.log('form created')

    // 初始化数据
    this.initFormData()

    // 设置整体表单栅格列数
    this.formConfig.formSpan = 12
    // 设置表格内容
    this.formConfig.formItems = [
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
        prop: 'parentName',
        name: 'menu.parentName',
        type: 'popover-tree',
        rules: [{ required: true }],
        component: 'toolPopoverTree',
        componentConfig: {
          useApi: getMenuList,
          useParams: { type: 0 },
          nameDefault: 'menu.parentNameDefault',
          nameInit: 'parentName',
          nameChange: 'name',
          treeProps: { label: 'name', children: 'children' },
          treeNodeKey: 'id',
          mergeData: [
            { from: 'name', to: 'parentName' },
            { from: 'id', to: 'pid' }
          ]
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
          useApi: getIconList,
          useParams: {},
          nameDefault: 'menu.icon',
          nameInit: 'icon',
          nameChange: 'name',
          mergeData: [{ from: 'name', to: 'icon' }],
          listKey: 'name'
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
        rules: [{ required: true }],
        component: 'toolResourceSelector',
        componentConfig: {
          useApi: getResourceSelector,
          useParams: {},
          nameInit: 'resourceList',
          defaultItem: {
            resourceMethod: 'GET',
            resourceUrl: ''
          },
          mergeData: { to: 'resourceList' }
        }
      }
    ]

    this.generateRules(this.formConfig.formItems)
  },
  methods: {}
}
</script>
