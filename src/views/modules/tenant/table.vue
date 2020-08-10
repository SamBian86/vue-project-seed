<template>
  <div>
    <el-card class="box-card">
      <h3 class="tenantLabel">企业信息</h3>
      <div class="tenantInfo">
        <div
          v-if="tenantInfo && tenantInfo.tenantName"
          class="tenantName"
        >{{ tenantInfo.tenantName }}</div>
        <div v-if="tenantInfo && tenantInfo.address" class="tenantAddress">{{ tenantInfo.address }}</div>
        <div
          v-if="tenantInfo && tenantInfo.realName"
          class="tenantRealName"
        >{{ tenantInfo.realName }}</div>
        <div
          v-if="tenantInfo && tenantInfo.username"
          class="tenantUsername"
        >{{ tenantInfo.username }}</div>
        <div v-if="tenantInfo && tenantInfo.id" class="tenantEdit">
          <el-button
            v-if="filterPermission('tenant:update')"
            type="text"
            :size="tableConfig.tableSearchSize"
            @click="editHandle(tenantInfo)"
          >{{ $t('update') }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageMixin from '@/mixins/page-mixin'
import tableDefaultMixin from '@/mixins/table-default-mixin'
import { getTenantInfo } from '@/api/tenant'

export default {
  name: 'Tabel',
  components: {},
  mixins: [pageMixin, tableDefaultMixin],
  data() {
    return {
      tenantInfo: null
      // limit: 0
    }
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
  },
  activated() {
    // console.log('table activated')
    this.init()
  },
  created() {
    this.init()
  },
  methods: {
    // listCallback() {
    //   const list = this.getTableData()
    //   this.limit = list.length
    // },
    init() {
      // 配置查询区域i18n相关select数据
      this.genrateI18nSearchItems()
      // console.log('table created')
      // 是否显示树形数据
      this.tableConfig.rowKey = 'id'
      // this.tableConfig.hasPagination = false
      // this.tableConfig.highlightCurrentRow = true
      // this.tableConfig.defaultExpandAll = true
      // this.tableConfig.lazy = true
      // this.tableConfig.tableType = 'selection'
      // console.log(this.$attrs)

      // 设置获取列表信息
      this.tableConfig.tableHeadReadOnly = []
      // 是否填充查询条件为空
      // this.tableConfig.searchFillEmpty = true
      // this.tableSearchParams = {}
      // 配置列表请求
      // this.tableHandle.list.api = getXXXList
      // this.tableHandle.list.callback = this.listCallback
      // 配置导出功能
      // this.tableHandle.export.api = exportXXX
      // 配置删除功能
      // this.tableHandle.delete.api = deleteXXX
      // this.tableHandle.delete.callback = this.deleteCallback
      // 配置节点懒加载功能
      // this.tableHandle.lazy.api = lazyXXX
      // 配置section删除功能
      // this.tableHandle.deleteSection.api = deleteXXX
      // console.log('table page created')
      // this.generateTable()
    },
    genrateI18nSearchItems() {
      // XXX
      this.getTenantInfo()
    },
    getTenantInfo() {
      getTenantInfo().then((response) => {
        this.tenantInfo = response
      })
    },
    // 创建
    // createHandle(options = { componentNames: ['yunlin-table'] }) {
    //   this.$pageSwitch('form', { pageType: 'create', ...options })
    // },
    // 编辑
    editHandle(item, options = { componentNames: ['yunlin-table'] }) {
      this.$pageSwitch('form', { ...item, pageType: 'edit', formDataUpdate: true })
    }
    // 显示次序更替
    // exchangeHandle() {
    // return XXX
    // }
    // 上下架
    // displayHandle() {
    // return XXX
    // }
  }
}
</script>
<style lang="scss">
.tenantLabel {
  font-size: 20px;
  margin: 0;
}

.tenantInfo {
  padding: 20px 0px;
  text-align: center;
}

.tenantName {
  font-size: 20px;
  font-weight: bold;
}

.tenantAddress {
  padding-top: 10px;
}

.tenantRealName {
  padding-top: 10px;
}

.tenantUsername {
  padding-top: 10px;
}
</style>
