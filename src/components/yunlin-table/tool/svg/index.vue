<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="`#${columnData[config.svgName]}`" />
  </svg>
</template>

<script>
export default {
  name: 'ToolTag',
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
