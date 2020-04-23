<template>
  <div>
    <el-form
      :ref="$attrs.config.formName"
      :model="$attrs.data"
      :rules="$attrs.rules"
      :label-width="$attrs.config.labelWidth"
      :size="$attrs.config.formSize"
      :label-position="$attrs.config.labelPosition"
      @keyup.enter.native="submitHandle()"
    >
      <el-row :gutter="10">
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
              <el-input
                v-model="$attrs.data[item.prop]"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}`"
                clearable
              ></el-input>
            </template>
            <!-- popover-tree -->
            <template v-if="item.component">
              <component
                :is="ToolComponents[item.component]"
                :config="item.componentConfig"
                :page-data="{ ...$attrs.data }"
                v-on="$listeners"
              ></component>
            </template>
            <!-- input -->
            <template v-if="item.type === 'input-number'">
              <el-input-number
                v-model="$attrs.data[item.prop]"
                :controls-position="item.attrs.controlsPosition"
                :min="item.attrs.min"
                :max="item.attrs.max"
                :step="item.attrs.step"
                :placeholder="`请输入${$t(item.name)}`"
              ></el-input-number>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ToolComponents from '@/components/yunlin-form/tool'
export default {
  name: 'YunlinForm',
  props: {},
  data() {
    return {
      ToolComponents
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
    // 表单校验
    submitHandle() {
      const { formName } = this.$attrs.config
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].formSubmitHandle()
        } else {
          console.log('校验未通过')
          return false
        }
      })
    },
    // 表单提交
    formSubmitHandle() {
      console.log(this.$attrs.data)
    }
  }
}
</script>
