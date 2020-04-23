export default {
  data() {
    return {}
  },
  computed: {},
  created() {
    console.log('common mixin created')
  },
  activated() {
    console.log('common mixin activated')
  },
  methods: {
    // 打开任何组件 name 组件名称
    handleAny(name, data = {}) {
      this.$emit('page-change', name, data)
    },
    // 转换成一个promise方法
    transformToPromise(_resolve, message = '请检查被转换的方法是否有返回值') {
      return new Promise((resolve, reject) => {
        if (_resolve()) {
          resolve(_resolve())
        } else {
          reject(message)
        }
      })
    }
  }
}
