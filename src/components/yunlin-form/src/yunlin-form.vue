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
            <!-- input -->
            <template v-if="item.type === 'text'">
              <el-input
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}`"
                clearable
              ></el-input>
            </template>
            <!-- textarea -->
            <template v-if="item.type === 'textarea'">
              <el-input
                v-model="$attrs.data[item.prop]"
                :type="item.type"
                :disabled="item.disabled"
                :autosize="item.attrs.autosize"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}`"
                clearable
              ></el-input>
            </template>
            <!-- radio-group -->
            <template v-if="item.type === 'radio-group'">
              <el-radio-group
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled"
                @change="formValueListener(item.prop, $event)"
              >
                <el-radio v-for="(ite, idx) in item.items" :key="idx" :label="ite.label">{{ $t(ite.name) }}</el-radio>
              </el-radio-group>
            </template>
            <!-- input-number -->
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
            <!-- 自定义组件 popover-tree popover-icon -->
            <template v-if="item.component">
              <component
                :is="ToolComponents[item.component]"
                :disabled="item.disabled"
                :config="item.componentConfig"
                :page-data="{ ...$attrs.data }"
                v-bind="$attrs"
                v-on="$listeners"
              ></component>
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
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import ToolComponents from '@/components/yunlin-form/tool'
export default {
  name: 'YunlinForm',
  components: {},
  mixins: [pageMixin, formMixin],
  props: {},
  data() {
    return {
      componentNames: ['yunlin-form'],
      ToolComponents
    }
  },
  computed: {
    // 从父组件的form-mixin的formHandle中获取方法
    createBridge() {
      const { api } = this.$attrs.handle.create
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖创建方法')
        })
      )
    },
    editBridge() {
      const { api } = this.$attrs.handle.edit
      return (
        api ||
        (() => {
          return Promise.reject('请覆盖编辑方法')
        })
      )
    },
    detailBridge() {
      const { api } = this.$attrs.handle.detail
      return (
        api ||
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
  activated() {
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      console.log('重新获取数据')
    })
  },
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {
    formMethordHandle() {
      return Promise.reject('请检查接口配置')
    },
    // 清除校验信息
    clearValidate() {
      const { formName } = this.$attrs.config
      this.$refs[formName].clearValidate()
    },
    // 表单校验
    submitHandle() {
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
    cancleHandle() {
      this.$pageSwitch('table')
    },
    // 表单提交
    formSubmitHandle() {
      const { pageType } = this.$attrs.data
      const { handle, data } = this.$attrs
      switch (pageType) {
        case 'create':
          this.formMethordHandle = this.createBridge
          break
        case 'edit':
          this.formMethordHandle = this.editBridge
          break
        default:
          if (handle[pageType] && handle[pageType]['api']) {
            this.formMethordHandle = handle[pageType]['api']
          }
          break
      }
      const callback = handle[pageType]['callback'] || null
      this.formMethordHandle({ ...data })
        .then(response => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 2000
          })
          if (callback) {
            callback()
          } else {
            // 将需要下次重新获取数据的组件加入page组件的page_update_list中
            this.$pageUpdateListAdd(data.componentNames)
            this.$pageSwitch('table')
          }
        })
        .catch(message => {
          this.$message({
            message,
            type: 'error',
            duration: 2000
          })
        })
    },
    // 更新数据
    formDataUpdate(formData) {
      this.detailBridge({ ...formData }).then(response => {
        this.$formDataUpdate(response)
      })
    },
    // 表单元素处理,控制隐藏显示
    formValueListener(prop) {
      this.$formValueListener(prop)
    }
  }
}
</script>
