// 这个mixin在page的子组件中使用, 用于触发page-default-mixin中的方法，修改传入的$attrs相关属性
export default {
  data() {
    return {}
  },
  computed: {},
  activated() {
    // console.log('page mixin activated')
  },
  created() {
    // console.log('page mixin created')
  },
  methods: {
    // 用于子页面切换其他页面
    $pageSwitch(name, data = {}) {
      this.$emit('page-switch', name, data)
    },
    // 将组件名称添加到检查列表
    $pageUpdateListAdd(componentNames = []) {
      this.$emit('page-update-list-add', componentNames)
    },
    // 将组件名称移出检查列表
    $pageUpdateListDelete(componentNames = []) {
      this.$emit('page-update-list-delete', componentNames)
      console.log(`删除标识${componentNames}`)
    },
    // 判断componentNames组件是否在page_update_list中
    $pageUpdateListContains(componentNames = []) {
      const { page_update_list } = this.$attrs
      let hasComponent = false
      if (page_update_list.length !== 0) {
        page_update_list.map(item => {
          componentNames.map(ite => {
            if (item === ite) {
              hasComponent = true
            }
          })
        })
        console.log('以下组件数据会更新:' + page_update_list)
      }
      return hasComponent
    },
    // 用于所有组件检查是否需要重新获取数据
    $pageCheckUpdateWhenActivated(fn = () => {}) {
      const { componentNames } = this
      if (this.$pageUpdateListContains(componentNames)) {
        fn()
        console.log(`重新获取${componentNames}数据`)
        this.$pageUpdateListDelete(componentNames)
      }
    }
  }
}
