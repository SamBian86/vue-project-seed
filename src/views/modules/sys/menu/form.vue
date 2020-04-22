<template>
  <div>
    <div class="form-title">
      {{ formTitle[$attrs.pageinfo.data.pageType] }}
    </div>
    <yunlin-form
      ref="yunlinForm"
      :config="formConfig"
      :handle="formHandle"
      :data="formData"
      :rules="formRules"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </yunlin-form>
  </div>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
import { getMenuList } from '@/api/sys/menu'
export default {
  components: {},
  mixins: [formMixin],
  data() {
    return {
      formTitle: {
        create: '新增',
        edit: '修改',
        detail: '详情'
      },
      menuList: []
    }
  },
  computed: {},
  created() {
    console.log(this.$attrs.pageinfo)
    // 设置表格内容
    this.formConfig.formItems = [
      {
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
        span: 12,
        prop: 'name',
        name: 'menu.name',
        type: 'text',
        rules: [{ required: true }]
      },
      {
        span: 24,
        prop: 'parentName',
        name: 'menu.parentName',
        type: 'popover-tree',
        rules: [{ required: true }],
        nameDefault: 'menu.parentNameDefault', // 用于没有值的时候国际化默认内容
        popoverStatus: true, // 用于popover组件控制隐藏显示
        items: [], // el-tree 数据集合
        treeProps: { label: 'name', children: 'children' }, // el-tree 配置
        treeNodeKey: 'id', // 树形展开
        currentChange: this.currentChange // 点击树节点处理方法
      }
    ]

    this.generateRules(this.formConfig.formItems)
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      getMenuList({ type: 0 }).then(response => {
        this.menuList = response
        this.mergeFormItems('parentName', response)
      })
    },
    currentChange(value) {
      const { name } = value
      this.$attrs.pageinfo.data['parentName'] = name
      this.togglePopoverTree()
    }
  }
}
</script>
