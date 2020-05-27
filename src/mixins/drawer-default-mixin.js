export default {
  mixins: [],
  data() {
    return {
      componentNames: ['drawer'], // 用于检查pageMixin中pageUpdateList是否存在componentNames中存在的项，如果存在需要重新获取数据
      drawerConfig: {
        drawerName: 'yunlinDrawer', // 抽屉名称，请与父组件ref名称相同
        title: '',
        modalAppendToBody: true,
        customClass: '',
        direction: 'rtl',
        withHeader: true,
        wrapperClosable: true,
        destroyOnClose: true,
        size: '80%'
      },
      drawerData: {},
      drawerComponent: null, // 当前只用的component
      drawerComponents: {
        // 页面中如果有多组件切换，则配置此项目
        // xxx: xxxComponent
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    // console.log('drawer default mixin created')
  },
  activated() {
    // 重新获取数据以后需要管理pagemixin中的pageUpdateList
    this.$pageCheckUpdateWhenActivated(() => {
      // console.log('重新获取drawer组件数据')
    })
    // console.log('drawer default mixin activated')
  },
  methods: {
    // 用于控制显示隐藏的方法
    drawerVisibleHandle(visible) {
      const { drawerName } = this.drawerConfig
      this.$refs[drawerName].drawerVisibleHandle(visible)
    },
    // 设置drawerData初始化数据
    setDrawerData(data) {
      this.$set(this, 'drawerData', data)
    },
    // 设置drawer标题
    setDrawerTitle(title) {
      this.drawerConfig.title = title
    },
    // 设置drawer的component
    setDrawerComponent(name) {
      const { drawerComponents } = this
      if (!drawerComponents[name]) {
        Promise.reject('请检查drawerComponents是否存在')
      } else {
        this.drawerComponent = drawerComponents[name]
      }
    },
    // yunlin-drawer组件 事件监听器 --------------------------------------------------------
    drawerClosed() {
      console.log('关闭drawer钩子')
    },
    // 用于子组件关闭drawer
    drawerCloseByChild() {
      this.drawerVisibleHandle(false)
    }
  }
}
