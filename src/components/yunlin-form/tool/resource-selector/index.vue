<template>
  <div>
    <el-row v-if="resources.length !== 0">
      <div v-for="(item, index) in resources" :key="index" class="resource-selector-item">
        <el-col :span="22" :lg="22" :md="22" :sm="24" :xs="24">
          <el-input v-model="item.resourceUrl" :placeholder="$t('menu.resourceUrl')">
            <el-select
              slot="prepend"
              v-model="item.resourceMethod"
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
        <el-col :span="2" :lg="2" :md="2" :sm="24" :xs="24" class="resource-selector-button">
          <el-button size="small" type="text" @click="deleteHandle(index)">{{ $t('delete') }}</el-button>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button style="width: 100%;" @click="addHandle()">{{ $t('menu.resourceAddItem') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
export default {
  // 资源选择器
  name: 'ToolResourceSelector',
  mixins: [commonMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          request: null,
          requestParams: {},
          propName: '', // 初始化用于显示的键名 页面数据键名
          defaultItem: {}, // 单条数据的数据结构
          mergeData: { target: '' } // 对应页面的数据的键名
        }
      }
    },
    pageData: {
      // 用于组件从页面获取的数据
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      resources: []
    }
  },
  created() {
    this.resources = this.pageData[this.config.propName] || []

    if (this.isPromise(this.config.request())) {
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
  methods: {
    // 点击按钮
    currentChoose(e) {
      // const { mergeData, nameChange } = this.config
      // const postData = {}
      // mergeData.map(item => {
      //   postData[item.target] = e[item.from]
      // })
      // this.name = e[nameChange] || '请检查键名'
      // this.togglePopoverHide()
      // this.$emit('merge-data', postData)
    },
    // 清除方法
    clearHandle() {
      const { mergeData } = this.config
      const postData = {}
      mergeData.map(item => {
        postData[item.target] = ''
      })
      this.togglePopoverHide()
      this.$emit('merge-data', postData)
    },
    // 添加方法
    addHandle() {
      const { defaultItem, mergeData } = this.config
      const { resources } = this
      const postData = {}
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
      postData[mergeData.target] = resources
      this.$emit('merge-data', postData)
      this.$emit('generate-rule-by-prop', [this.config.propName])
    },
    // 删除方法
    deleteHandle(index) {
      const { mergeData } = this.config
      const { resources } = this
      const postData = {}
      resources.splice(index, 1)
      postData[mergeData.target] = Array.from(resources)
      this.$emit('merge-data', postData)
      this.$emit('generate-rule-by-prop', [this.config.propName])
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
