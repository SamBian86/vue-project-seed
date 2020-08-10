<template>
  <div>
    <el-table :data="list" class="level_table">
      <el-table-column :label="$t('bedtimeCheck.studentName')">
        <template slot-scope="scope">
          <span>{{ scope.row.studentName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('bedtimeCheck.studentPhone')">
        <template slot-scope="scope">
          <span>{{ scope.row.studentPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('bedtimeCheck.reason')">
        <template slot-scope="scope">
          <span>{{ scope.row.reason }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
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
      list: []
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
        this.list = newData || []
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
      const { propName } = this.config
      this.list = this.pageData[propName] || []
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
