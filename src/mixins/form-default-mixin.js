import commonMixin from '@/mixins/common-mixin'
export default {
  mixins: [commonMixin],
  data() {
    return {
      componentNames: ['form'], // 用于检查pageMixin中pageUpdateList是否存在componentNames中存在的项，如果存在需要重新获取数据
      formConfig: {
        formName: 'yunlinForm', // 表单名称
        formItems: [], // 表单项
        formItemsReadOnly: [], // 初始表单项
        formSize: 'small', // 控件尺寸
        formSpan: 12, // 整体表单栅格占据列数 默认12列
        labelPosition: '',
        labelWidth: '120px', // 标签宽度
        validateOnRuleChange: false
      },
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: { api: null, callback: null, failCallBack: null },
        // 修改抽象方法，用修改接口方法覆盖
        edit: { api: null, callback: null, failCallBack: null },
        // 详情抽象方法，用详情接口方法覆盖
        detail: { api: null, callback: null, failCallBack: null }
      },
      formData: {}, // 存放表单数据
      formDefaultData: {}, // 存放表单默认数据
      formRules: {}, // 存放表单验证规则
      formAction: [
        // 用于处理表单的隐藏与显示禁用行为
        // prop代表会影响表单展现的因子
        // exclude中代表该prop一旦符合某个value就排除显示props中对应的项目
        // 默认在所有detail类型的页面所有控件都禁用,如果在创建编辑页面需要提供禁用需要配置disabledPageType,对需要禁用的pageType进行配置
        // { prop: 'type', exclude: [{ value: 0, props: ['permissions'] }], disabledPageType: ['edit'] }
      ]
    }
  },
  computed: {},
  watch: {
    $attrs(newVal, oldVal) {
      // 检查drawer打开时drawerData数据是否改变，如果改变就重新初始化控件
      const newPageDrawerData = (newVal.page_drawer_data && newVal.page_drawer_data.data) || ''
      const oldPageDrawerData = (oldVal.page_drawer_data && oldVal.page_drawer_data.data) || ''
      console.log('检查page_drawer_data')
      // 检查page_drawer_data
      if (JSON.stringify(newPageDrawerData) !== JSON.stringify(oldPageDrawerData)) {
        // 组装表单初始数据
        this.generateFormData()
        // 生成标题
        this.generateTitle()
        // 生成表单及验证规则
        this.generateForm()
      }
    }
  },
  created() {
    // console.log('form default mixin created')
  },
  activated() {
    // 重新获取数据以后需要管理pagemixin中的pageUpdateList
    this.$pageCheckUpdateWhenActivated(() => {
      // console.log('重新获取yunlin-table组件数据')
    })
    // console.log('form default mixin activated')
  },
  methods: {
    beforeInit() {
      // 需要一个页面初始化前获取异步数据的逻辑
    },
    // 初始化页面数据
    generateFormData() {
      const pageInfoData = (this.$attrs.page_info && this.$attrs.page_info.data) || {}
      const pageDrawerData = (this.$attrs.page_drawer_data && this.$attrs.page_drawer_data.data) || {}
      const finalData = { ...this.formDefaultData, ...pageInfoData, ...pageDrawerData }
      const { formDataUpdate } = finalData
      const { formName } = this.formConfig
      this.formData = finalData
      // 如果是编辑或者详情页面
      if (formDataUpdate) {
        this.$refs[formName].formDataUpdate(this.formData)
      }
    },
    // 生成表单名称
    generateTitle() {
      const { formTitle } = this
      const { name } = this.formData
      const skip = ['create']
      const formGenerateTitle = {}
      Object.keys(formTitle).map(item => {
        if (!skip.includes(item)) {
          formGenerateTitle[item] = formTitle[item] + name
        }
      })
      this.formGenerateTitle = formGenerateTitle
    },
    // 初始化表单行为, 过滤出需要渲染的项目
    generateForm() {
      const { formAction, formData } = this
      const { pageType } = this.$attrs.page_info.data
      const { formItemsReadOnly } = this.formConfig
      let excludeProps = [] // 存放需要排除的props
      let generateProps = [] // 存放需要生成的props
      const disabledMap = {} // 在非详情页面时需要控制为禁用的字段map

      // { prop: 'type', exclude: [{ value: 0, props: ['permissions'] }], disabledPageType: ['edit'] }
      // 过滤出需要显示的项
      formAction.map(item => {
        const excludes = item.exclude || []
        disabledMap[item.prop] = Array.from(item.disabledPageType || [])
        excludes.map(ite => {
          if (ite.value === formData[item.prop]) {
            excludeProps = [...ite.props]
          }
        })
      })
      excludeProps = Array.from(new Set([...excludeProps]))

      generateProps = formItemsReadOnly.filter(item => !excludeProps.includes(item.prop))

      // 如果是详情页面
      if (pageType === 'detail') {
        generateProps.forEach(item => {
          item.disabled = true
        })
      } else {
        generateProps.forEach(item => {
          // 用于控制某些字段在某种特定的页面上禁用
          if (disabledMap[item.prop] !== undefined) {
            item.disabled = disabledMap[item.prop].includes(pageType)
          }
        })
      }

      // 开始渲染页面
      this.formConfig.formItems = generateProps
      // 生成校验规则
      this.generateRules(generateProps)
    },
    // 生成校验规则, 用于普通添加校验规则，如果是动态添加请使用 generateRuleByProp
    generateRules(items) {
      const { formRules, formData } = this
      const inputTypes = ['text', 'input-number', 'editor']
      const changeTypes = [
        'select',
        'select-dynamic',
        'date-picker',
        'radio-group',
        'popover-tree',
        'popover-icon',
        'resource-selector',
        'file-upload',
        'tree-dynamic'
      ]
      items.map(item => {
        const rules = []
        if (item.rules) {
          item.rules.forEach(ite => {
            if (ite.required && !ite.message) {
              // 必填验证 输入类型
              if (inputTypes.includes(item.type)) {
                ite.message = '请输入' + this.$t(item.name)
                ite.trigger = 'blur'
              }
              // 必填验证 选择
              if (changeTypes.includes(item.type)) {
                ite.message = '请选择' + this.$t(item.name)
                ite.trigger = 'change'
              }
            } else {
              ite.trigger = 'change'
            }
            rules.push(ite)
          })
          // 如果没有nodata为false代表没有数据的不进行校验
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
      // 初始化表单验证规则
      this.$set(this, 'formRules', Object.assign({}, formRules))

      // 清除校验信息
      this.$nextTick(() => {
        const { formRules } = this
        this.clearValidate(Object.keys(Object.assign({}, formRules)))
      })
    },
    // 表单行为 --------------------------------------------------------
    // 清除校验信息
    clearValidate() {
      const { formName } = this.formConfig
      this.$refs[formName].clearValidate()
    },
    // 提交表单
    submitHandle() {
      const { formName } = this.formConfig
      this.$refs[formName].submitHandle()
    },
    // 点击取消按钮前的钩子
    beforeCancleHandle() {},
    // 取消按钮
    cancleHandle() {
      const { formName } = this.formConfig
      this.beforeCancleHandle()
      this.$refs[formName].cancleHandle()
    },
    // 重置填充的数据
    resetHandle(filters = []) {
      const { formName } = this.formConfig
      this.$refs[formName].resetHandle(filters)
    },
    // 表单行为 --------------------------------------------------------

    // yunlin-form组件 事件监听器 --------------------------------------------------------
    // 用于各类自定义组件修改数据
    formDataMerge(data) {
      this.formData = { ...this.formData, ...data }
    },
    // 重新生成对应的校验规则, 用于动态添加校验规则
    formGenerateRuleByProps(props = []) {
      const { formItems } = this.formConfig
      const items = props.length === 0 ? formItems : formItems.filter(item => props.includes(item.prop))
      this.generateRules(items)
    },
    // 用于检查值的修改，用于控制表单的隐藏与显示禁用行为
    formValueListener(prop) {
      const { formAction } = this
      const len = formAction.filter(item => item.prop === prop)
      if (len === 0) {
        return
      }
      this.generateForm()
    },
    // 通知组件更新表单数据
    formDataUpdate(data) {
      this.$set(this, 'formData', { ...this.formData, ...data })
      this.afterFormDataUpdate()
      this.generateForm()
    },
    // 选择值以后需要重新修改某些组件的选取范围,比如date-time
    formResetConfigItem(props = []) {
      const { formItemsReadOnly } = this.formConfig
      formItemsReadOnly.forEach(item => {
        props.map(ite => {
          if (item.prop === ite.prop) {
            Object.keys(ite).map(i => {
              item[i] = ite[i]
            })
            console.log('修改' + item.prop)
          }
        })
      })
      this.formConfig.formItemsReadOnly = formItemsReadOnly
    },
    // 获取详情数据以后的处理
    afterFormDataUpdate() {
      // const { formData } = this
    }
    // yunlin-form组件 事件监听器 --------------------------------------------------------
  }
}
