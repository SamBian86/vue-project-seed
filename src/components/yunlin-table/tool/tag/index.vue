<template>
  <div>
    <span v-if="config.type === 'text'">{{ tagItem.name }}</span>
    <el-tag
      v-if="config.type !== 'text' && tagItem.name !== ''"
      :size="config.tagSize"
      :type="tagItem.type"
    >{{ tagItem.name }}</el-tag>
  </div>
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
          type: '', // 用于直接显示文本 text
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
  watch: {
    // 用于检查列表对应column数据修改，重新初始化
    columnData(newVal, oldVal) {
      const { prop } = this.config
      if (newVal[prop] !== oldVal[prop]) {
        this.init()
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { tagConfig } = this.config
      const value = this.columnData[this.config.prop]
      const name = this.columnData[this.config.name]

      tagConfig.map(item => {
        if (typeof item.value === typeof value && typeof item.value === 'boolean') {
          if (item.value === value) {
            this.tagItem.type = item.type
            this.tagItem.name = item.name || name // 默认用tagConfig中的name
          }
        } else {
          if (parseInt(item.value) === parseInt(value)) {
            this.tagItem.type = item.type
            this.tagItem.name = item.name || name // 默认用tagConfig中的name
          }
        }
      })
    }
  }
}
</script>
