import commonMixin from '@/mixins/common-mixin'
export default {
  mixins: [commonMixin],
  data() {
    return {
      formConfig: {
        formName: 'yunlinForm', // 表单名称
        formItems: [
          // radio-group label表示值 name表示国际化对应的值
          // { prop: 'type', name: 'menu.type', type: 'radio-group', items: [{ label: 0, name: 'menu.type0' }] }
        ], // 表单项
        formSize: 'small', // 控件尺寸
        labelPosition: '',
        labelWidth: '120px' // 标签宽度
      },
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: null,
        // 修改抽象方法，用修改接口方法覆盖
        edit: null,
        // 详情抽象方法，用详情接口方法覆盖
        detail: null
      },
      formData: {}, // 存放表单数据
      formRules: {} // 存放表单验证规则
    }
  },
  computed: {},
  created() {
    console.log('form mixin created')
  },
  activated() {
    console.log('form mixin activated')
  },
  methods: {
    // 生成校验规则
    generateRules(items) {
      const formRules = {}
      items.map(item => {
        if (item.rules) {
          const rules = []
          item.rules.forEach(ite => {
            if (ite.required && !ite.message) {
              // 必填验证
              if (item.type === 'text') {
                ite.message = '请输入' + this.$t(item.name)
                ite.trigger = 'blur'
              }
              if (item.type === 'radio-group' || item.type === 'popover-tree') {
                ite.message = '请选择' + this.$t(item.name)
                ite.trigger = 'change'
              }
            } else {
              // 其他验证
              ite.trigger = 'trigger'
            }
            rules.push(ite)
          })
          formRules[item.prop] = rules
        }
      })
      this.formRules = formRules
      console.log(formRules)
    },
    // 修改formItems数据
    mergeFormItems(propName, value) {
      const { formItems } = this.formConfig
      formItems.forEach(item => {
        if (item.prop === propName) {
          item.items = value
        }
      })
      this.$set(this.formConfig, 'formItems', formItems)
    },
    // 关闭Popover组件
    togglePopoverTree() {
      const { formName } = this.formConfig
      this.$refs[formName].togglePopoverTree()
    }
  }
}
