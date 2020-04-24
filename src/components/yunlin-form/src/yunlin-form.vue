<template>
  <div>
    <el-form
      :ref="$attrs.config.formName"
      :model="$attrs.data"
      :rules="$attrs.rules"
      :label-width="$attrs.config.labelWidth"
      :size="$attrs.config.formSize"
      :label-position="$attrs.config.labelPosition"
      @keyup.enter.native="handleSubmit()"
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
              <el-radio-group
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled"
                @change="handleFormItem(item.prop, $event)"
              >
                <el-radio
                  v-for="(ite, idx) in item.items"
                  :key="idx"
                  :label="ite.label"
                >{{ $t(ite.name) }}</el-radio>
              </el-radio-group>
            </template>
            <!-- input -->
            <template v-if="item.type === 'text'">
              <el-input
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled"
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
                :disabled="item.disabled"
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
      <el-row :gutter="10">
        <el-col>
          <el-form-item>
            <slot name="footer" />
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
      return (
        this.$attrs.handle.create.api ||
        (() => {
          return Promise.reject('请覆盖创建方法')
        })
      )
    },
    editBridge() {
      return (
        this.$attrs.handle.edit.api ||
        (() => {
          return Promise.reject('请覆盖编辑方法')
        })
      )
    },
    detailBridge() {
      return (
        this.$attrs.handle.detail.api ||
        (() => {
          return Promise.reject('请覆盖详情方法')
        })
      )
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
    formMethordHandle() {
      return Promise.reject('请检查接口配置')
    },
    // 表单校验
    handleSubmit() {
      const { formName } = this.$attrs.config
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formSubmitHandle()
        } else {
          return false
        }
      })
    },
    // 取消按钮
    handleCancle() {
      this.$emit('page-change', 'table')
    },
    // 表单提交
    formSubmitHandle() {
      const { pageType } = this.$attrs.data
      switch (pageType) {
        case 'create':
          this.formMethordHandle = this.createBridge
          break
        case 'edit':
          this.formMethordHandle = this.editBridge
          break
        default:
          if (this.$attrs.handle[pageType] && this.$attrs.handle[pageType]['api']) {
            this.formMethordHandle = this.$attrs.handle[pageType]['api']
          }
          break
      }
      const fn = this.$attrs.handle[pageType]['fn'] || null
      this.formMethordHandle({ ...this.$attrs.data }).then(response => {
        if (fn) {
          fn()
        } else {
          this.$emit('page-change', 'table')
          this.$emit('page-update', 'table')
        }
      })
    },
    // 清除校验信息
    clearValidate() {
      const { formName } = this.$attrs.config
      this.$refs[formName].clearValidate()
    },
    // 表单元素处理,控制隐藏显示
    handleFormItem(prop) {
      this.$emit('check-action', prop)
    }
  }
}
</script>
