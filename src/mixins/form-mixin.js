import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
export default {
  mixins: [commonMixin, pageMixin],
  data() {
    return {
      formConfig: {
        formName: 'yunlinForm', // 表单名称
        formItems: [], // 表单项
        formItemsReadOnly: [], // 初始表单项
        formSize: 'small', // 控件尺寸
        formSpan: 12, // 整体表单栅格占据列数 默认12列
        labelPosition: '',
        labelWidth: '120px', // 标签宽度
        updateCheck: ['form'] // 用于检查pageMixin中pageUpdateList是否存在updateCheck中存在的项，如果存在需要重新获取数据
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
      formRules: {}, // 存放表单验证规则
      formAction: [
        // 用于处理表单的隐藏与显示禁用行为
        // prop代表会影响表单展现的因子, exclude中代表该prop一旦符合某个value就排除现实props中对应的项目
        // { prop: 'type', exclude: [{ value: 0, props: ['permissions'] }] }
      ]
    }
  },
  computed: {},
  created() {
    // console.log('form mixin created')
  },
  activated() {
    const { updateCheck } = this.formConfig
    const { pageupdate } = this.$attrs
    // 重新获取数据以后需要管理pagemixin中的pageUpdateList
    if (this.isInPageUpdateList(pageupdate, updateCheck)) {
      this.$emit('page-queue-delete', updateCheck)
    }
    // console.log('form mixin activated')
  },
  methods: {
    // 工具方法清单
    // 初始化页面数据
    initFormData() {
      this.formData = { ...this.$attrs.pageinfo.data, ...this.formDefaultData }
      console.log('初始化页面数据')
    },
    generateForm() {
      this.generateAction()
    },
    // 生成校验规则, 用于普通添加校验规则，如果是动态添加请使用 generateRuleByProp
    generateRules(items) {
      const { formRules, formData } = this
      const inputTypes = ['text', 'input-number']
      const changeTypes = ['select', 'radio-group', 'popover-tree', 'popover-icon', 'resource-selector']
      items.map(item => {
        const rules = []
        if (item.rules) {
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
              ite.trigger = 'change'
            }
            rules.push(ite)
          })
          if (item.ruleConfig) {
            if (!item.ruleConfig.nodata && formData[item.prop] && formData[item.prop].length !== 0) {
              formRules[item.prop] = rules
            }
            if (!item.ruleConfig.nodata && formData[item.prop] && formData[item.prop].length === 0) {
              delete formRules[item.prop]
            }
          } else {
            formRules[item.prop] = rules
          }
        }
      })
      this.$set(this, 'formRules', Object.assign({}, formRules))

      this.$nextTick(() => {
        const { formRules } = this
        this.clearValidate(Object.keys(Object.assign({}, formRules)))
      })
    },
    // 重新生成对应的校验规则, 用于动态添加校验规则
    generateRuleByProp(prop = []) {
      const { formItems } = this.formConfig
      const items = prop.length === 0 ? formItems : formItems.filter(item => prop.indexOf(item.prop) !== -1)
      this.generateRules(items)
    },
    // 用于各类自定义组件修改数据
    mergeDataHandle(data) {
      // console.log('form-mixin 合并数据 ')
      this.formData = { ...this.formData, ...data }
    },
    // 清除校验信息
    clearValidate() {
      const { formName } = this.formConfig
      this.$refs[formName].clearValidate()
    },
    // 用于检查值的修改，用于控制表单的隐藏与显示禁用行为
    checkAction(prop) {
      const { formAction } = this
      const len = formAction.filter(item => item.prop === prop)
      if (len === 0) {
        return
      }
      this.generateAction()
    },
    // 初始化表单行为, 过滤出需要渲染的项目
    generateAction() {
      const { formAction, formData } = this
      const { formItemsReadOnly } = this.formConfig
      let excludeProps = []
      let generateProps = []

      formAction.map(item => {
        const excludes = item.exclude
        excludes.map(ite => {
          if (ite.value === formData[item.prop]) {
            excludeProps = [...ite.props]
          }
        })
      })
      excludeProps = Array.from(new Set([...excludeProps]))
      generateProps = formItemsReadOnly.filter(item => excludeProps.indexOf(item.prop) === -1)

      this.formConfig.formItems = generateProps
      this.generateRules(generateProps)
    },
    // 提交表单
    handleSubmit() {
      const { formName } = this.formConfig
      this.$refs[formName].handleSubmit()
    },
    // 取消按钮
    handleCancle() {
      const { formName } = this.formConfig
      this.$refs[formName].handleCancle()
    }
  }
}
