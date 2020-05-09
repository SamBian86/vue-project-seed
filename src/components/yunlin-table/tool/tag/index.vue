<template>
  <el-tag :size="config.tagSize" :type="tagItem.type">{{ tagItem.name }}</el-tag>
</template>

<script>
export default {
  name: 'ToolTag',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          prop: '', // 哪个键名用于取数据
          name: '', // 哪个键名用于显示tag名称
          tagSize: 'small', // tag尺寸
          tagConfig: [
            // {
            //   value: 0,
            //   name: '菜单'
            // },
            // {
            //   value: 1,
            //   type: 'info',
            //   name: '按钮'
            // }
          ] // 不同的数据如何显示tag的type
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
    const value = this.columnData[this.config.prop]
    const name = this.columnData[this.config.name]

    tagConfig.map(item => {
      if (item.value === value) {
        this.tagItem.type = item.type
        this.tagItem.name = item.name || name // 默认用tagConfig中的name
      }
    })
  }
}
</script>
