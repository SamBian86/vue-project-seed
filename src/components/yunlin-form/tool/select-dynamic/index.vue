<template>
  <div>
    <el-select
      v-model="selected"
      :class="config.className || ''"
      :placeholder="config.placeholderText || `请选择${$t(config.placeholder)}`"
      :disabled="disabled"
      :multiple="config.multiple"
      clearable
      filterable
      @change="changeHandle"
    >
      <el-option
        v-for="(item, index) in items"
        :key="index"
        :label="item[config.itemProps.label]"
        :value="item[config.itemProps.value]"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'ToolSelectDynamic',
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          multiple: false, // 是否多选
          request: null, // el-tree 获取数据的方法
          requestParams: {}, // 获取数据方法传参
          itemProps: {
            label: '', // list中键名称
            value: '' // list中值名称
          },
          placeholder: '', // 默认显示的placeholder内容从国际化中取
          placeholderText: '', // 直接使用父组件传过来的值
          propName: '', // 初始化用于显示的键名
          className: '', // select控件class
          mergeData: { target: '' },
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
      componentNames: ['select-dynamic'],
      selected: '',
      items: []
    }
  },
  computed: {},
  watch: {
    pageData(newVal, oldVal) {
      const { propName } = this.config
      const newData = newVal[propName] || ''
      const oldData = oldVal[propName] || ''

      // 检查prop_data数据是否变动
      if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        this.selected = newData
      }
    }
  },
  activated() {
    // console.log('select-dynamic activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取select-dynamic组件数据')
    })
  },
  created() {
    // console.log('select-dynamic created')
    this.init()
  },
  methods: {
    init() {
      if (this.config.request) {
        this.config
          .request(this.config.requestParams)
          .then(response => {
            this.items = response
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Promise.reject('请提供一个返回Promise对象的request方法')
      }
    },
    changeHandle(value) {
      const { mergeData } = this.config
      const newData = {}
      newData[mergeData.target] = value
      console.log(newData)
      this.$formDataMerge(newData)
    }
  }
}
</script>
<style lang="scss"></style>
