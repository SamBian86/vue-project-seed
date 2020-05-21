<template>
  <div>
    <el-tree
      ref="searchTree"
      :data="list"
      :props="config.treeProps"
      :node-key="config.treeNodeKey"
      :highlight-current="true"
      :expand-on-click-node="false"
      default-expand-all
      @current-change="changeHandle"
    ></el-tree>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import tableMixin from '@/mixins/table-mixin'
export default {
  name: 'SearchTree',
  mixins: [commonMixin, pageMixin, tableMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          request: null, // el-tree 获取数据的方法
          requestParams: {}, // 获取数据方法传参
          treeDataTranslate: null, // 获取数据以后是否要进行数据处理
          treeProps: {}, // el-tree的props配置 { label: 'name', children: 'children' }
          treeNodeKey: '', // el-tree的node-key配置 'id'
          mergeData: [
            // 点击el-tree节点数据传递 source 被选中节点数据中用于取数据的键 target传递给父组件用于覆盖表单数据对应的键名
            // { source: 'pid', target: 'depId' }
          ],
          componentNames: []
        }
      }
    }
  },
  data() {
    return {
      componentNames: ['component-tree'],
      list: []
    }
  },
  computed: {},
  watch: {},
  activated() {
    // console.log('component-tree activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取component-tree组件数据')
    })
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { treeDataTranslate } = this.config
      if (this.config.request) {
        this.config
          .request(this.config.requestParams)
          .then(response => {
            if (treeDataTranslate !== null && treeDataTranslate !== undefined) {
              this.list = treeDataTranslate(response)
            } else {
              this.list = response
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Promise.reject('请提供一个返回Promise对象的request方法')
      }
    },
    // // 点击树节点
    changeHandle(e) {
      const { mergeData } = this.config
      const newData = {}
      mergeData.map(item => {
        newData[item.target] = e[item.source]
        this.name = e[item.name]
      })
      this.$tableParamsMerge(newData)
    }
    // // 清除方法
    // clearHandle() {
    //   const { mergeData } = this.config
    //   const newData = {}
    //   mergeData.map(item => {
    //     newData[item.target] = '' || item.default
    //   })
    //   this.name = ''
    //   this.togglePopoverHide()
    //   this.$tableParamsMerge(newData)
    // }
  }
}
</script>
<style lang="scss"></style>
