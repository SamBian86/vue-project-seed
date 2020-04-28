<template>
  <common-svg-icon :config="{ name: columnData[config.svgName] }"></common-svg-icon>
</template>

<script>
export default {
  name: 'ToolSvg',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          svgName: '' // 哪个键名用于渲染svg
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
  }
}
</script>
