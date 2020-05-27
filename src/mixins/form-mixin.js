// 这个mixin在form.vue的子组件中使用, 用于触发form-default-mixin中的方法
export default {
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log('form-mixin created')
  },
  activated() {
    // console.log('form mixin activated')
  },
  methods: {
    // 用于子组件修改数据以后的数据合并
    $formDataMerge(data = {}) {
      this.$emit('form-data-merge', data)
    },
    // 重新生成对应的校验规则, 用于动态添加校验规则
    $formGenerateRuleByProps(props = []) {
      this.$emit('form-generate-rule-by-props', props)
    },
    // 用于检查值的修改，用于控制表单的隐藏与显示禁用行为
    $formValueListener(prop = '') {
      this.$emit('form-value-listener', prop)
    },
    // 数据更新
    $formDataUpdate(data) {
      console.log('$formDataUpdate')
      console.log(data)
      this.$emit('form-data-update', data || {})
    },
    // 更新formItemsReadOnly中的某项配置
    $formResetConfigItem(props) {
      this.$emit('form-reset-config-item', props || [])
    }
  }
}
