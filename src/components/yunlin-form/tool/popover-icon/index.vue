<template>
  <div>
    <el-input
      v-popover:popover-icon
      class="popover-icon-input"
      type="text"
      :placeholder="`请选择${$t(config.i18nName)}`"
      :value="pageData[config.propName]"
      :disabled="disabled"
      clearable
      @clear="clearHandle"
    ></el-input>
    <el-popover
      ref="popover-icon"
      v-model="popoverStatus"
      popper-class="popover-icon-container"
      placement="bottom-start"
      trigger="hover"
    >
      <div class="popover-icon-list">
        <div class="popover-icon-list-inner">
          <el-button
            v-for="(item, index) in list"
            :key="index"
            :class="{ 'is-active': pageData[config.propName] === item[config.compareKey] }"
            @click="changeHandle(item)"
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
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'ToolPopoverIcon',
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          request: null, // 获取数据的方法
          requestParams: {}, // 获取数据方法传参
          i18nName: '', // 默认显示的数据
          propName: '', // 初始化用于显示的键名 页面数据键名
          sourceName: '', // 修改后 取选中数据的键名
          mergeData: [
            // 点击el-tree节点数据传递 source 被选中节点数据中用于取数据的键 target传递给父组件用于覆盖表单数据对应的键名
            // { source: 'name', target: 'parentName' },
            // { source: 'id', target: 'pid' }
          ],
          compareKey: '' // 用于设置用于比较的list中的key
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
      componentNames: ['popover-icon'],
      popoverStatus: false,
      name: this.pageData[this.config.propName] ? this.pageData[this.config.propName] : '请选择' + this.$t(this.config.i18nName),
      list: []
    }
  },
  activated() {
    // console.log('popover-icon activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取popover-icon组件数据')
    })
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
    togglePopoverHide() {
      this.popoverStatus = false
    },
    // 点击按钮
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
.popover-icon-input input {
  cursor: pointer;
}

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
