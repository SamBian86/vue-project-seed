<template>
  <div>
    <el-input
      type="text"
      :placeholder="$t(config.i18nDefault)"
      :value="pageData[config.propName]"
      clearable
      @focus="togglePopoverShow"
      @clear="clearHandle"
    ></el-input>
    <el-popover v-model="popoverStatus" placement="bottom-start" trigger="click">
      <el-tree
        :data="list"
        :props="config.treeProps"
        :node-key="config.treeNodeKey"
        :highlight-current="true"
        :expand-on-click-node="false"
        accordion
        @current-change="currentChoose"
      ></el-tree>
    </el-popover>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
export default {
  name: 'ToolPopoverTree',
  mixins: [commonMixin],
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
          ]
        }
      }
    },
    pageData: {
      // 用于组件从页面获取的数据
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      popoverStatus: false,
      name: this.pageData[this.config.propName] ? this.pageData[this.config.propName] : this.$t(this.config.i18nDefault),
      list: []
    }
  },
  activated() {
    console.log('popover-tree activated')
  },
  created() {
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
    // 处理popover组件
    togglePopoverShow() {
      this.popoverStatus = true
    },
    togglePopoverHide() {
      this.popoverStatus = false
    },
    // 点击树节点
    currentChoose(e) {
      const { mergeData, sourceName } = this.config
      const postData = {}
      mergeData.map(item => {
        postData[item.target] = e[item.source]
      })
      this.name = e[sourceName] || '请检查键名'
      this.togglePopoverHide()
      this.$emit('merge-data', postData)
    },
    // 清除方法
    clearHandle() {
      const { mergeData } = this.config
      const postData = {}
      mergeData.map(item => {
        postData[item.target] = item.default || ''
      })
      this.togglePopoverHide()
      this.$emit('merge-data', postData)
    }
  }
}
</script>
<style lang="scss"></style>
