<template>
  <div>
    <el-tree
      ref="treeDynamic"
      :data="items"
      :props="config.treeProps"
      :node-key="config.nodeKey"
      :accordion="config.accordion"
      :show-checkbox="config.showCheckbox"
      :default-expand-all="config.defaultExpandAll"
      @check="checkHandle"
    ></el-tree>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'ToolTreeDynamic',
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          treeRequest: null, // el-tree 获取数据的方法
          treeRequestParams: {}, // 获取数据方法传参
          treeResultRequest: null, // 获取选中数据的方法
          treeResultRequestParams: {}, // 获取选中数据方法传参
          treeResultRequestPropParams: [], // 从pageData中某个键的数据用于传参
          treeResultKey: '', // 用于取结果集的键
          propName: '', // 初始化用于显示的键名
          nodeKey: '',
          treeProps: {}, // el-tree的props配置 { label: 'name', children: 'children' }
          mergeData: { target: '' },
          accordion: true,
          showCheckbox: true,
          componentNames: [] // 组件更新成功以后连带的需要重新获取数据的组件
        }
      }
    },
    pageData: {
      // 用于组件从页面获取的数据
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      componentNames: ['tree-dynamic'],
      items: [],
      selected: this.pageData[this.config.propName] || []
    }
  },
  computed: {},
  watch: {
    // filterText(val) {
    //   this.$refs.tree.filter(val)
    // }
  },
  activated() {
    // console.log('tree-dynamic activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取tree-dynamic组件数据')
    })
  },
  created() {
    this.componentNames = [...this.componentNames, ...this.config.componentNames]
    // console.log('tree-dynamic created')
    this.init()
  },
  methods: {
    init() {
      if (this.config.treeRequest) {
        this.config
          .treeRequest(this.config.treeRequestParams)
          .then(response => {
            this.items = response
            if (this.config.treeResultRequest) {
              this.treeResultRequest()
            } else {
              this.setChecked()
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Promise.reject('请提供一个返回Promise对象的treeRequest方法')
      }
    },
    // 获取选中结果
    treeResultRequest() {
      const { pageData } = this
      const { treeResultRequest, treeResultRequestParams, treeResultRequestPropParams, treeResultKey } = this.config
      let params = {}
      treeResultRequestPropParams.map(item => {
        if (pageData[item]) {
          params[item] = pageData[item]
        }
      })
      params = { ...treeResultRequestParams, ...params }
      if (Object.keys(params).length) {
        treeResultRequest(params).then(response => {
          this.selected = response[treeResultKey]
          this.setChecked()
        })
      }
    },
    setChecked() {
      const { selected } = this
      selected.map(item => {
        this.$refs['treeDynamic'].setChecked(item, true)
      })
      this.checkHandle()
    },
    checkHandle(auto) {
      const { componentNames } = this
      const selected = [...this.$refs['treeDynamic'].getCheckedKeys(), ...this.$refs['treeDynamic'].getHalfCheckedKeys()]
      const { mergeData } = this.config
      const newData = {}
      newData[mergeData.target] = selected
      console.log(newData)
      this.$formDataMerge(newData)
      if (auto !== undefined) {
        this.$pageUpdateListAdd(Array.from(new Set([...componentNames, ...this.config.componentNames])))
      }
    }
  }
}
</script>
<style lang="scss"></style>
