<template>
  <el-image
    :src="columnData[config.propName]"
    :lazy="config.lazy"
    :fit="config.fit"
    :alt="columnData[config.altName]"
  ></el-image>
</template>

<script>
export default {
  name: 'ToolImage',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          lazy: false, // 是否开启懒加载
          fit: 'contain',
          altName: '',
          propName: '' // 哪个键名用于渲染
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
