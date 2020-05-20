<template>
  <div>
    <el-row v-if="resources.length !== 0">
      <div v-for="(item, index) in resources" :key="index" class="resource-selector-item">
        <el-col
          :span="disabled ? 24 : 22"
          :lg="disabled ? 24 : 22"
          :md="disabled ? 24 : 22"
          :sm="24"
          :xs="24"
        >
          <el-input
            v-model="item.resourceUrl"
            :disabled="disabled"
            :placeholder="$t('menu.resourceUrl')"
          >
            <el-select
              slot="prepend"
              v-model="item.resourceMethod"
              :disabled="disabled"
              class="resource-selector"
              :placeholder="$t('menu.resourceMethod')"
            >
              <el-option
                v-for="(ite, idx) in list"
                :key="idx"
                :label="ite.label"
                :value="ite.value"
              ></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col
          v-if="!disabled"
          :span="2"
          :lg="2"
          :md="2"
          :sm="24"
          :xs="24"
          class="resource-selector-button"
        >
          <el-button size="small" type="text" @click="deleteHandle(index)">{{ $t('delete') }}</el-button>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button
          style="width: 100%;"
          :disabled="disabled"
          @click="addHandle()"
        >{{ $t('menu.resourceAddItem') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
export default {
  // 资源选择器
  name: 'ToolResourceSelector',
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          request: null,
          requestParams: {},
          propName: '', // 初始化用于显示的键名 页面数据键名
          defaultItem: {}, // 单条数据的数据结构
          mergeData: { target: '' }, // 对应页面的数据的键名
          componentNames: [] // 组件更新成功以后连带的需要重新获取数据的组件
        }
      }
    },
    pageData: {
      // 用于组件从页面获取的数据
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      resources: []
    }
  },
  watch: {
    // 用于检查表单赋值时对应数据修改
    pageData(newVal, oldVal) {
      const { propName } = this.config
      const newData = newVal[propName] || ''
      const oldData = oldVal[propName] || ''

      // 检查prop_data数据是否变动
      if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        this.resources = newData || []
      }
    }
  },
  activated() {
    // console.log('resource-selector activated')
  },
  created() {
    // console.log('resource-selector created')
  },
  methods: {
    init() {
      if (this.config.request) {
        this.config
          .request(this.config.requestParams)
          .then(response => {
            this.list = response
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Promise.reject('请提供一个返回Promise对象的request方法')
      }
    },
    // 清除方法
    clearHandle() {
      const { mergeData } = this.config
      const newData = {}
      mergeData.map(item => {
        newData[item.target] = ''
      })
      this.togglePopoverHide()
      this.$formDataMerge(newData)
    },
    // 添加方法
    addHandle() {
      const { defaultItem, mergeData } = this.config
      const { resources } = this
      const newData = {}
      let hasEmpty = false
      Object.keys(defaultItem).map(item => {
        resources.map(ite => {
          if (ite[item] === '') {
            hasEmpty = true
          }
        })
      })

      if (hasEmpty) {
        return
      }
      resources.push(Object.assign({}, defaultItem))
      newData[mergeData.target] = resources
      this.$formDataMerge(newData)
      this.$formGenerateRuleByProps([this.config.propName])
    },
    // 删除方法
    deleteHandle(index) {
      const { mergeData } = this.config
      const { resources } = this
      const newData = {}
      resources.splice(index, 1)
      newData[mergeData.target] = Array.from(resources)
      this.$formDataMerge(newData)
      this.$formGenerateRuleByProps([this.config.propName])
    }
  }
}
</script>
<style lang="scss">
.resource-selector-item {
  margin-bottom: 10px;
  overflow: hidden;
}

.resource-selector {
  min-width: 80px;
}

.resource-selector-button {
  text-align: center;
}

.resource-selector-button .el-button {
  margin: 0;
}
</style>
