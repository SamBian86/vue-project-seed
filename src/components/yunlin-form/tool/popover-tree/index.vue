<template>
  <div>
    <el-input
      type="text"
      :placeholder="$t(config.nameDefault)"
      :value="pageData[config.nameInit]"
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
      >
      </el-tree>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'ToolPopoverTree',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          useApi: null, // el-tree 获取数据的方法
          useParams: {}, // 获取数据方法传参
          nameDefault: '', // 默认显示的数据
          nameInit: '', // 初始化用于显示的键名
          nameChange: '', // 修改后用于取选中数据的键名
          treeProps: {}, // el-tree的props配置 { label: 'name', children: 'children' }
          treeNodeKey: '', // el-tree的node-key配置 'id'
          mergeData: [
            // 点击el-tree节点数据传递 from节点的键 to传递给父组件用于覆盖数据对应的键名
            // { from: 'name', to: 'parentName' },
            // { from: 'id', to: 'pid' }
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
      name: this.pageData[this.config.nameInit] ? this.pageData[this.config.nameInit] : this.$t(this.config.nameDefault),
      list: []
    }
  },
  created() {
    this.config
      .useApi(this.config.useParams)
      .then(response => {
        this.list = response
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    // 处理popover组件
    togglePopoverShow() {
      this.popoverStatus = true
    },
    togglePopoverHide() {
      this.popoverStatus = false
    },
    // 点击树节点
    currentChoose(e) {
      const { mergeData, nameChange } = this.config
      const postData = {}
      mergeData.map(item => {
        postData[item.to] = e[item.from]
      })
      this.name = e[nameChange] || '请检查键名'
      this.togglePopoverHide()
      this.$emit('merge-data', postData)
    },
    // 清除方法
    clearHandle() {
      const { mergeData } = this.config
      const postData = {}
      mergeData.map(item => {
        postData[item.to] = ''
      })
      this.togglePopoverHide()
      this.$emit('merge-data', postData)
    }
  }
}
</script>
<style lang="scss"></style>
