<template>
  <el-tag :size="config.tagSize" :type="tagItem.type">
    {{ tagItem.name }}
  </el-tag>
</template>

<script>
export default {
  name: 'ToolSvg',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          value: '', // 哪个键名用于取数据
          name: '', // 哪个键名用于显示tag名称
          tagSize: '', // tag尺寸
          tagConfig: [] // 不同的数据如何显示tag
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
      tagItem: {
        type: '',
        name: ''
      }
    }
  },
  created() {
    const { tagConfig } = this.config
    const value = this.columnData[this.config.value]
    const name = this.columnData[this.config.name]

    tagConfig.map(item => {
      if (item.value === value) {
        this.tagItem.type = item.type
        this.tagItem.name = item.name || name
      }
    })
  }
}
</script>
