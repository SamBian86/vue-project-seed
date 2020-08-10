<template>
  <div>
    <el-form
      :ref="$attrs.config.formName"
      :model="$attrs.data"
      :rules="$attrs.rules"
      :label-width="$attrs.config.labelWidth"
      :size="$attrs.config.formSize"
      :label-position="$attrs.config.labelPosition"
      :validate-on-rule-change="$attrs.config.validateOnRuleChange"
    >
      <slot name="content" />
      <el-row v-if="$attrs.config.formItems.length !== 0" :gutter="10">
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
            <template v-if="item.type === 'text' && item.clearHandle === undefined && item.inputHandle === undefined">
              <el-input
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled || false"
                :maxlength="item.attrs && item.attrs.maxlength ? item.attrs.maxlength : 200"
                :readonly="item.readonly || false"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}`"
                clearable
              >
                <el-button
                  v-if="item.append && item.append.type === 'button'"
                  slot="append"
                  :icon="item.append && item.append.icon"
                  @click="item.append && item.append.clickHandle()"
                >
                  {{ $t(item.append.text) || item.append.placeholderText }}
                </el-button>
              </el-input>
            </template>
            <template v-if="item.type === 'text' && item.clearHandle !== undefined && item.inputHandle === undefined">
              <el-input
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled || false"
                :maxlength="item.attrs && item.attrs.maxlength ? item.attrs.maxlength : 200"
                :readonly="item.readonly || false"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}`"
                clearable
                @clear="item.clearHandle"
              ></el-input>
            </template>
            <template v-if="item.type === 'text' && item.inputHandle !== undefined && item.clearHandle === undefined">
              <el-input
                v-model="$attrs.data[item.prop]"
                :disabled="item.disabled || false"
                :maxlength="item.attrs && item.attrs.maxlength ? item.attrs.maxlength : 200"
                :readonly="item.readonly || false"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}`"
                clearable
                @input="item.inputHandle"
              ></el-input>
            </template>
            <!-- textarea -->
            <template v-if="item.type === 'textarea'">
              <el-input
                v-model="$attrs.data[item.prop]"
                :type="item.type"
                :disabled="item.disabled"
                :maxlength="item.attrs.maxlength || 200"
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
                @change="formValueListener(item.prop, $event, item.afterChange)"
              >
                <el-radio v-for="(ite, idx) in item.items" :key="idx" :label="ite.label">
                  {{ ite.i18n === false ? ite.name : $t(ite.name) }}
                </el-radio>
              </el-radio-group>
            </template>
            <!-- select -->
            <template v-if="item.type === 'select'">
              <el-select
                v-model="$attrs.data[item.prop]"
                :class="item.className || ''"
                :disabled="item.disabled"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请选择${$t(item.name)}`"
                :multiple="item.multiple || false"
                clearable
                filterable
                @change="formValueListener(item.prop, $event, item.afterChange)"
              >
                <template v-if="item.itemType === 'dict'">
                  <el-option
                    v-for="(ite, idx) in item.items"
                    :key="idx"
                    :label="ite.dictLabel"
                    :value="ite.dictValue"
                  ></el-option>
                </template>
                <template v-else>
                  <el-option
                    v-for="(ite, idx) in item.items"
                    :key="idx"
                    :label="ite.placeholderText || $t(ite.label)"
                    :value="ite.value"
                  ></el-option>
                </template>
              </el-select>
            </template>
            <!-- button -->
            <template v-if="item.type === 'button'">
              <el-button :type="item.buttonType" :disabled="item.disabled" @click.stop.prevent="item.clickHandle">
                {{ $attrs.data[item.prop] || $t(item.placeholder) || item.placeholderText || `请输入${$t(item.name)}` }}
              </el-button>
            </template>
            <!-- date-picker -->
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="$attrs.data[item.prop]"
                :class="item.className || ''"
                type="date"
                :disabled="item.disabled"
                :format="item.format"
                :value-format="item.valueFormat"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请选择${$t(item.name)}`"
                :picker-options="item.pickerOptions"
                @change="formValueListener(item.prop, $event, item.afterChange)"
              ></el-date-picker>
            </template>
            <!-- date-time-picker -->
            <template v-if="item.type === 'date-time-picker'">
              <el-date-picker
                v-model="$attrs.data[item.prop]"
                :class="item.className || ''"
                type="datetime"
                :disabled="item.disabled"
                :format="item.format"
                :value-format="item.valueFormat"
                :placeholder="$t(item.placeholder) || item.placeholderText || `请选择${$t(item.name)}`"
                :picker-options="item.pickerOptions"
                @change="formValueListener(item.prop, $event, item.afterChange)"
              ></el-date-picker>
            </template>
            <!-- input-number -->
            <template v-if="item.type === 'input-number'">
              <el-input-number
                v-model="$attrs.data[item.prop]"
                :class="item.className || ''"
                :disabled="item.disabled"
                :controls-position="item.attrs.controlsPosition"
                :min="item.attrs.min"
                :max="item.attrs.max"
                :step="item.attrs.step"
                :placeholder="`请输入${$t(item.name)}`"
              ></el-input-number>
            </template>
            <!-- 自定义页面组件 -->
            <template v-if="item.type === 'page-component'">
              <component
                :is="item.component"
                :disabled="item.disabled"
                :config="item.componentConfig"
                :page-data="{ ...$attrs.data }"
                v-bind="$attrs"
                v-on="$listeners"
              ></component>
            </template>
            <!-- 自定义组件 popover-tree popover-icon resource-selector editor file-upload -->
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
          <el-form-item v-else-if="item.type === 'empty'"></el-form-item>
          <div v-else-if="item.type === 'divider'">
            <el-divider :content-position="item.contentPosition || 'left'">{{ $t(item.name) }}</el-divider>
          </div>
        </el-col>
      </el-row>
      <slot name="before-foot" />
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
      submitTag: true,
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
  created() {
    // console.log('yunlin-form created')
    // console.log(ToolComponents)
    // console.log(this)
  },
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
      const { submitTag } = this
      const { formName } = this.$attrs.config
      // console.log(this.$attrs.data)
      if (!submitTag) {
        console.log('不要重复提交')
        return false
      } else {
        this.submitTag = false
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formSubmitHandle()
        } else {
          setTimeout(() => {
            this.submitTag = true
          }, 1000)
          return false
        }
      })
    },
    // 取消按钮
    cancleHandle() {
      setTimeout(() => {
        this.submitTag = true
      }, 1000)
      this.$pageSwitch('table')
    },
    // 重置填充的数据
    resetHandle(filters = []) {
      const _defaultFilters = ['pageType']
      const _filters = Array.from(new Set([..._defaultFilters, ...filters]))
      const { data } = this.$attrs
      const dataTemp = Object.keys(data).filter(item => !_filters.includes(item))
      Object.keys(data).forEach(item => {
        if (dataTemp.includes(item)) {
          data[item] = ''
        }
      })
      this.$formDataMerge(data)
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
      const failCallBack = handle[pageType]['failCallBack'] || null
      this.formMethordHandle({ ...data })
        .then(response => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 2000
          })
          setTimeout(() => {
            this.submitTag = true
          }, 1000)
          // 此处回调用于不返回table组件的逻辑
          if (callback) {
            callback()
          } else {
            // 将需要下次重新获取数据的组件加入page组件的page_update_list中
            this.$pageUpdateListAdd(data.componentNames)
            this.$pageSwitch('table')
          }
        })
        .catch(message => {
          if (failCallBack) {
            failCallBack()
          }
          this.$message({
            message,
            type: 'error',
            duration: 2000
          })
          setTimeout(() => {
            this.submitTag = true
          }, 1000)
        })
    },
    // 更新数据
    formDataUpdate(formData) {
      this.detailBridge({ ...formData }).then(response => {
        this.$formDataUpdate(response)
      })
    },
    // 表单元素处理,控制隐藏显示
    formValueListener(prop, $event, afterChange) {
      if (afterChange) {
        this.$formResetConfigItem(afterChange())
      }
      this.$formValueListener(prop)
    }
  }
}
</script>
