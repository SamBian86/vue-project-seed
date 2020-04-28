<template>
  <el-button
    :size="config.buttonSize"
    :type="config.buttonType"
    @click="config.clickHandle(columnData)"
  >{{ name }}</el-button>
</template>

<script>
export default {
  name: 'ToolButton',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          prop: '', // 哪个键名用于显示
          buttonSize: '', // button尺寸
          buttonType: '',
          clickHandle: () => {}
        }
      }
    },
    columnData: {
      // 用于该组件的从列表项获取的数据
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      name: ''
    }
  },
  created() {
    const name = this.columnData[this.config.prop]
    this.name = name
  }
}
</script>
