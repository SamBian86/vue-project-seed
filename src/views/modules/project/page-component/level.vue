<template>
  <div>
    <div v-show="interiorCheckType === 0">
      <el-table :data="levelList" class="level_table">
        <el-table-column :label="$t('project.name')">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              size="small"
              :disabled="disabled"
              :placeholder="$t('project.namePlaceholder')"
            ></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('project.markPoint')">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.markPoint"
              size="small"
              :disabled="disabled"
              :placeholder="$t('project.markPointPlaceholder')"
            ></el-input>
          </template>
        </el-table-column>-->
        <el-table-column v-if="!disabled" label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.save === false"
              size="mini"
              type="success"
              @click="handleSave('levelList', scope.$index)"
            >{{ $t('project.save') }}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete('levelList', scope.$index)"
            >{{ $t('project.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!disabled" style="text-align: center;">
        <el-button
          type="text"
          icon="el-icon-plus el-icon-arrow-left"
          @click="handleAdd('levelList')"
        >{{ $t('project.addLevel') }}</el-button>
      </div>
    </div>
    <div v-show="interiorCheckType === 1">
      <el-table :data="scoreList" class="level_table">
        <el-table-column :label="$t('project.name')">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              size="small"
              :disabled="disabled"
              :placeholder="$t('project.namePlaceholder')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('project.markPoint')">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.markPoint"
              size="small"
              :disabled="disabled"
              :placeholder="$t('project.markPointPlaceholder')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column v-if="!disabled" label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.save === false"
              size="mini"
              type="success"
              @click="handleSave('scoreList', scope.$index)"
            >{{ $t('project.save') }}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete('scoreList', scope.$index)"
            >{{ $t('project.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!disabled" style="text-align: center;">
        <el-button
          type="text"
          icon="el-icon-plus el-icon-arrow-left"
          @click="handleAdd('scoreList')"
        >{{ $t('project.addLevel') }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import { deleteProjectInteriorTypeById, createProjectInteriorType } from '@/api/project/interiorType'
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
        name: '',
        markPoint: '',
        save: false
      },
      interiorCheckType: 0,
      pageType: '',
      levelList: [],
      scoreList: []
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
        this.interiorCheckType = newData
      }

      if (JSON.stringify(newVal['levelList']) !== JSON.stringify(oldVal['levelList'])) {
        this.levelList = newVal['levelList']
      }

      if (JSON.stringify(newVal['scoreList']) !== JSON.stringify(oldVal['scoreList'])) {
        this.scoreList = newVal['scoreList']
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
      const { pageType, interiorCheckType, levelList, scoreList } = this.pageData
      this.pageType = pageType
      this.interiorCheckType = !interiorCheckType ? 0 : interiorCheckType

      levelList &&
        levelList.forEach((item) => {
          item.save = true
        })
      scoreList &&
        scoreList.forEach((item) => {
          item.save = true
        })
      this.levelList = !levelList ? [] : levelList
      this.scoreList = !scoreList ? [] : scoreList
    },
    handleSave(type, index) {
      const { pageType, interiorCheckType } = this
      const items = Array.from(this[type])
      items[index]['save'] = true

      if (pageType === 'create') {
        const newData = {}
        const filterItems = items.filter((item) => item.save === true)
        newData[type] = filterItems
        newData['level'] = filterItems
        this.$formDataMerge(newData)
        this.$set(this, type, items)
      }

      if (pageType === 'edit') {
        const { id } = this.pageData
        createProjectInteriorType({
          projectId: id,
          interiorCheckType,
          ...items[index]
        }).then((response) => {
          items[index]['id'] = response.id
          this.$set(this, type, items)
        })
      }
    },
    handleDelete(type, index) {
      const { pageType } = this
      const items = Array.from(this[type])
      const id = items[index]['id']
      if (pageType === 'create' || id === undefined) {
        items.splice(index, 1)
        this.$set(this, type, items)
        return false
      }
      if (pageType === 'edit') {
        deleteProjectInteriorTypeById({
          id: items[index]['id']
        }).then((response) => {
          items.splice(index, 1)
          this.$set(this, type, items)
        })
      }
    },
    handleAdd(type) {
      const { interiorCheckType } = this
      let addTag = false
      const items = Array.from(this[type] || [])
      if (interiorCheckType === 0) {
        items.map((item) => {
          if (item.name === '') {
            addTag = true
          }
        })
      }
      if (interiorCheckType === 1) {
        items.map((item) => {
          if (item.name === '' || item.markPoint === '') {
            addTag = true
          }
        })
      }

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
    // inputHandle(type, index) {
    //   const { pageType } = this
    //   if (pageType === 'edit') {
    //     const items = Array.from(this[type])
    //     items[index]['save'] = false
    //     this.$set(this, type, items)
    //   }
    // }
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
