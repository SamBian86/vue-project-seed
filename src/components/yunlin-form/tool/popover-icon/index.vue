<template>
  <div>
    <el-input
      type="text"
      :placeholder="`请选择${$t(config.nameDefault)}`"
      :value="pageData[config.nameInit]"
      clearable
      @focus="togglePopoverShow"
      @clear="clearHandle"
    ></el-input>
    <el-popover v-model="popoverStatus" popper-class="popover-icon-container" placement="bottom-start" trigger="click">
      <div class="popover-icon-list">
        <div class="popover-icon-list-inner">
          <el-button
            v-for="(item, index) in list"
            :key="index"
            :class="{ 'is-active': pageData[config.nameInit] === item[config.listKey] }"
            @click="currentChoose(item)"
          >
            <common-svg-icon :config="{ name: item.name }"></common-svg-icon>
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
export default {
  name: 'ToolPopoverIcon',
  mixins: [commonMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          useApi: null, // el-tree 获取数据的方法
          useParams: {}, // 获取数据方法传参
          nameDefault: '', // 默认显示的数据
          nameInit: '', // 初始化用于显示的键名 页面数据键名
          nameChange: '', // 修改后 取选中数据的键名
          mergeData: [
            // 点击el-tree节点数据传递 from节点的键 to传递给父组件用于覆盖数据对应的键名
            // { from: 'name', to: 'parentName' },
            // { from: 'id', to: 'pid' }
          ],
          listKey: '' // 用于设置用于比较的list中的key
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
      name: this.pageData[this.config.nameInit]
        ? this.pageData[this.config.nameInit]
        : '请选择' + this.$t(this.config.nameDefault),
      list: []
    }
  },
  created() {
    this.transformToPromise(this.config.useApi)
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
    // 点击按钮
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
<style lang="scss">
.popover-icon-container {
  width: 370px;
  overflow: hidden;
}

.popover-icon-list {
  max-height: 300px;
  width: 410px;
  overflow-y: auto;
  &-inner {
    .el-button {
      padding: 8px;
      margin: 0 8px 8px 0;
      font-size: 18px;
    }
  }
}
</style>
