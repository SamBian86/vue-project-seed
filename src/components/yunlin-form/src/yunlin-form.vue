/* eslint-disable vue/html-closing-bracket-spacing */
<template>
  <div>
    <el-form
      :model="$attrs.data"
      :rules="$attrs.rules"
      :label-width="$attrs.config.labelWidth"
      :size="$attrs.config.formSize"
      :label-position="$attrs.config.labelPosition"
      @keyup.enter.native="formSubmitHandle()"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in $attrs.config.formItems"
          :key="index"
          :span="item.span"
          :lg="item.span"
          :md="item.span"
          :sm="24"
          :xs="24"
        >
          <el-form-item v-if="item.prop" :prop="item.prop" :label="$t(item.name)">
            <!-- radio-group -->
            <template v-if="item.type === 'radio-group'">
              <el-radio-group v-model="$attrs.data[item.prop]" :disabled="item.disabled">
                <el-radio v-for="(ite, idx) in item.items" :key="idx" :label="ite.label">{{ $t(ite.name) }}</el-radio>
              </el-radio-group>
            </template>
            <!-- input -->
            <template v-if="item.type === 'text'">
              <el-input v-model="$attrs.data[item.prop]" :placeholder="`请输入${$t(item.name)}`"></el-input>
            </template>
            <!-- popover-tree -->
            <template v-if="item.type === 'popover-tree'">
              <div class="popover-tree-input" @click="togglePopoverTree">
                {{ $attrs.pageinfo.data[item.prop] === undefined ? `${$t(item.nameDefault)}` : $attrs.pageinfo.data[item.prop] }}
              </div>
              <el-popover v-model="popoverStatus" placement="bottom-start" trigger="click">
                <el-tree
                  :data="item.items"
                  :props="item.treeProps"
                  :node-key="item.treeNodeKey"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  accordion
                  @current-change="item.currentChange"
                >
                </el-tree>
              </el-popover>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'YunlinForm',
  props: {},
  data() {
    return {
      popoverStatus: false // 用于 popover-tree
    }
  },
  computed: {
    // 从父组件的form-mixin的formHandle中获取方法
    createBridge() {
      return this.$attrs.handle.create || null
    },
    editBridge() {
      return this.$attrs.handle.edit || null
    },
    detailBridge() {
      return this.$attrs.handle.detail || null
    }
  },
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
  methods: {
    // 处理popover组件
    togglePopoverTree() {
      this.popoverStatus = !this.popoverStatus
    },
    // 表单提交
    formSubmitHandle() {
      console.log(this.$attrs.data)
    }
  }
}
</script>
