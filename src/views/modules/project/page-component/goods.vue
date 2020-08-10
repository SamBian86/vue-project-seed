<template>
  <div>
    <el-table :data="goodsList" class="level_table">
      <el-table-column :label="$t('project.goodsName')">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.goodsName"
            size="small"
            :disabled="disabled"
            :placeholder="$t('project.goodsNamePlaceholder')"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.save === false"
            size="mini"
            type="success"
            @click="handleSave('goodsList', scope.$index)"
          >{{ $t('project.save') }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete('goodsList', scope.$index)"
          >{{ $t('project.remove') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!disabled" style="text-align: center;">
      <el-button
        type="text"
        icon="el-icon-plus el-icon-arrow-left"
        @click="handleAdd('goodsList')"
      >{{ $t('project.addGoods') }}</el-button>
    </div>
  </div>
</template>
<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import { deleteProjectGoods, addProjectGoods } from '@/api/project/goods'
export default {
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          propName: '' // 初始化用于检查切换的键名
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
      defaultItem: {
        goodsName: '',
        save: false
      },
      pageType: '',
      goodsList: []
    }
  },
  computed: {},
  watch: {
    // 用于检查表单赋值时对应数据修改
    pageData(newVal, oldVal) {
      const { propName } = this.config
      const newData = newVal[propName]
      const oldData = oldVal[propName]
      // 检查prop_data数据是否变动
      if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        this.goodsList = newData
      }

      if (JSON.stringify(newVal['pageType']) !== JSON.stringify(oldVal['pageType'])) {
        this.pageType = newVal['pageType']
      }
    }
  },
  activated() {
    this.init()
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { pageType, goodsList } = this.pageData
      this.pageType = pageType

      goodsList &&
        goodsList.forEach((item) => {
          item.save = true
        })
      this.goodsList = !goodsList ? [] : goodsList
    },
    handleSave(type, index) {
      const { pageType } = this
      const items = Array.from(this[type])
      items[index]['save'] = true
      this.$set(this, type, items)

      if (pageType === 'create') {
        const newData = {}
        const filterItems = items.filter((item) => item.save === true)
        newData[type] = filterItems
        this.$formDataMerge(newData)
      }

      if (pageType === 'edit') {
        const { id } = this.pageData
        addProjectGoods({
          projectId: id,
          ...items[index]
        }).then((response) => {
          this.$set(this, type, items)
        })
      }
    },
    handleDelete(type, index) {
      const { pageType } = this
      const items = Array.from(this[type])
      if (pageType === 'create') {
        items.splice(index, 1)
        this.$set(this, type, items)
      }
      if (pageType === 'edit') {
        deleteProjectGoods({
          id: items[index]['id']
        }).then((response) => {
          items.splice(index, 1)
          this.$set(this, type, items)
        })
      }
    },
    handleAdd(type) {
      let addTag = false
      const items = Array.from(this[type])
      items.map((item) => {
        if (item.goodsName === '') {
          addTag = true
        }
      })

      if (addTag) {
        this.$message({
          message: this.$t('project.addMessage'),
          type: 'warning',
          duration: 2000
        })
        return false
      } else {
        items.push(Object.assign({}, this.defaultItem))
        this.$set(this, type, items)
      }
    }
  }
}
</script>
<style lang="scss">
.level_table {
  th {
    padding: 0 0;
  }
}
</style>
