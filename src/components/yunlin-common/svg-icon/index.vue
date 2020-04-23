<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="`#${config.name}`" />
  </svg>
</template>

<script>
export default {
  name: 'CommonSvgIcon',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          name: '' // 哪个键名用于渲染svg
        }
      }
    }
  }
}
</script>
