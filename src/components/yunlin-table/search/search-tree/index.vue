<template>
  <div>
    <el-input
      v-model="name"
      v-popover:popover-tree
      class="popover-tree-input"
      type="text"
      size="small"
      :placeholder="$t(config.i18nDefault)"
      clearable
      @clear="clearHandle"
    ></el-input>
    <el-popover
      ref="popover-tree"
      v-model="popoverStatus"
      popper-class="popover-search-tree"
      placement="bottom-start"
      trigger="click"
    >
      <div class="popover-tree-out">
        <el-input
          v-if="config.treeDataFilter"
          v-model="filterText"
          size="small"
          :placeholder="$t('keywordFilterSearch')"
        ></el-input>
        <div class="popover-tree-in">
          <el-tree
            ref="searchTree"
            :data="list"
            :props="config.treeProps"
            :node-key="config.treeNodeKey"
            :expand-on-click-node="false"
            :filter-node-method="filterNodeMethod"
            accordion
            @current-change="changeHandle"
          ></el-tree>
        </div>
      </div>
    </el-popover>
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
          treeDataFilter: false, // 是否开启过滤功能
          treeDataFilterKey: '', // 根据那个key进行过滤
          i18nDefault: '', // 默认显示的placeholder内容
          treeProps: {}, // el-tree的props配置 { label: 'name', children: 'children' }
          treeNodeKey: '', // el-tree的node-key配置 'id'
          mergeData: [
            // 点击el-tree节点数据传递 source 被选中节点数据中用于取数据的键 target传递给父组件用于覆盖表单数据对应的键名 name用于当前组件显示
            // { source: 'pid', target: 'depId', name: 'name' }
          ]
        }
      }
    }
  },
  data() {
    return {
      name: '',
      filterText: '',
      componentNames: ['search-tree'],
      popoverStatus: false,
      list: []
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.searchTree.filter(val)
    }
  },
  activated() {
    // console.log('popover-tree activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取popover-tree组件数据')
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
    togglePopoverHide() {
      this.popoverStatus = false
    },
    // 点击树节点
    changeHandle(e) {
      const { mergeData } = this.config
      const newData = {}
      mergeData.map(item => {
        newData[item.target] = e[item.source]
        this.name = e[item.name]
      })
      this.togglePopoverHide()
      this.$tableParamsMerge(newData)
    },
    // 清除方法
    clearHandle() {
      const { mergeData } = this.config
      const newData = {}
      mergeData.map(item => {
        newData[item.target] = '' || item.default
      })
      this.name = ''
      this.togglePopoverHide()
      this.$tableParamsMerge(newData)
    },
    // 过滤方法
    filterNodeMethod(value, data) {
      const { treeDataFilterKey } = this.config
      if (!value) return true
      return data[treeDataFilterKey].indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss">
.popover-search-tree {
  margin-top: 0 !important;
}

.popover-tree-input input {
  cursor: pointer;
}

.popover-tree-out {
  width: 200px;
  max-height: 300px;
  overflow: hidden;
}

.popover-tree-in {
  width: 250px;
  max-height: 300px;
  overflow: auto;
  padding-top: 10px;
}
</style>
