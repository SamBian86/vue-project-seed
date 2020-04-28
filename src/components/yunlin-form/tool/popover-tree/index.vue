<template>
  <div>
    <el-input
      v-popover:popover-tree
      class="popover-tree-input"
      type="text"
      :placeholder="$t(config.i18nDefault)"
      :value="pageData[config.propName]"
      :disabled="disabled"
      clearable
      @clear="clearHandle"
    ></el-input>
    <el-popover ref="popover-tree" v-model="popoverStatus" placement="bottom-start" trigger="click">
      <el-tree
        ref="tree"
        :data="list"
        :props="config.treeProps"
        :node-key="config.treeNodeKey"
        :expand-on-click-node="false"
        accordion
        @current-change="changeHandle"
      ></el-tree>
    </el-popover>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'ToolPopoverTree',
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          request: null, // el-tree 获取数据的方法
          requestParams: {}, // 获取数据方法传参
          i18nDefault: '', // 默认显示的placeholder内容
          propName: '', // 初始化用于显示的键名
          sourceName: '', // 修改后用于在本组件中显示文字的键名
          treeProps: {}, // el-tree的props配置 { label: 'name', children: 'children' }
          treeNodeKey: '', // el-tree的node-key配置 'id'
          mergeData: [
            // 点击el-tree节点数据传递 source 被选中节点数据中用于取数据的键 target传递给父组件用于覆盖表单数据对应的键名
            // { source: 'name', target: 'parentName' },
            // { source: 'id', target: 'pid' }
          ],
          componentNames: []
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
      componentNames: ['popover-tree'],
      popoverStatus: false,
      name: this.pageData[this.config.propName] ? this.pageData[this.config.propName] : this.$t(this.config.i18nDefault),
      list: []
    }
  },
  computed: {},
  activated() {
    // console.log('popover-tree activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取popover-tree组件数据')
    })
  },
  created() {
    // console.log('popover-tree created')
    this.init()
  },
  methods: {
    init() {
      if (this.isPromise(this.config.request())) {
        this.config
          .request(this.config.requestParams)
          .then(response => {
            this.list = response
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Promise.reject('请提供一个返回Promise对象的request方法')
      }
    },
    togglePopoverHide() {
      this.popoverStatus = false
    },
    // 点击树节点
    changeHandle(e) {
      const { mergeData, sourceName } = this.config
      const newData = {}
      mergeData.map(item => {
        newData[item.target] = e[item.source]
      })
      this.name = e[sourceName] || '请检查键名'
      this.togglePopoverHide()
      this.$formDataMerge(newData)
    },
    // 清除方法
    clearHandle() {
      const { mergeData } = this.config
      const newData = {}
      mergeData.map(item => {
        newData[item.target] = '' || item.default
      })
      this.togglePopoverHide()
      this.$formDataMerge(newData)
    }
  }
}
</script>
<style lang="scss">
.popover-tree-input input {
  cursor: pointer;
}
</style>
