<template>
  <el-button
    :size="config.buttonSize"
    :type="config.buttonType"
    :disabled="disabled"
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
          buttonConfig: [
            // {
            //   value: 0,
            //   type: 'text',
            //   name: '文字'
            // },
            // {
            //   value: 1,
            //   type: 'text',
            //   name: '文字'
            // }
          ],
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
      name: '',
      disabled: false
    }
  },
  created() {
    const { buttonConfig } = this.config
    const value = this.columnData[this.config.prop]

    if (buttonConfig) {
      buttonConfig.map(item => {
        if (item.value === value) {
          this.name = item.name || value // 默认用buttonConfig中的name
          this.disabled = item.disabled ? item.disabled : false
        }
      })
    } else {
      this.name = value
    }
  }
}
</script>
