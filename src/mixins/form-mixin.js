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
        formSpan: 12, // 整体表单栅格占据列数 默认12列
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
      formDefaultData: {}, // 存放表单默认数据
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
    // 工具方法清单
    // 初始化页面数据
    initFormData() {
      this.formData = { ...this.$attrs.pageinfo.data, ...this.formDefaultData }
      console.log('初始化页面数据')
    },
    // 生成校验规则
    generateRules(items) {
      const formRules = {}
      const inputTypes = ['text', 'input-number']
      const changeTypes = ['radio-group', 'popover-tree', 'popover-icon', 'resource-selector']
      items.map(item => {
        if (item.rules) {
          const rules = []
          item.rules.forEach(ite => {
            if (ite.required && !ite.message) {
              // 必填验证 输入类型
              if (inputTypes.indexOf(item.type) !== -1) {
                ite.message = '请输入' + this.$t(item.name)
                ite.trigger = 'blur'
              }
              // 必填验证 选择
              if (changeTypes.indexOf(item.type) !== -1) {
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
    // 用于各类自定义组件修改数据
    mergeDataHandle(data) {
      // console.log('form-mixin 合并数据 ')
      this.formData = { ...this.formData, ...data }
    }
  }
}
