<template>
  <div class="sub-container">
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'YunlinMaskView',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  breforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {}
}
</script>

<style lang="scss">
.sub-container {
  height: calc(100vh);
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  width: calc(100vw - 68px);
  top: 0px;
  left: 0px;
  z-index: 100;
}
</style>
