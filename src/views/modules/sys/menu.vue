<template>
  <el-card shadow="never" class="layout_container aui-card--fill">
    <el-form :inline="true" :model="tableConfig.searchParams" @keyup.enter.native="handleSearch">
      <el-form-item>
        <el-button v-if="filterPermission('sys:menu:save')" type="primary" size="small" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        <el-button v-if="filterPermission('sys:menu:save')" type="primary" size="small" @click="handleSearch">{{ $t('add') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="tableConfig.loading" :data="tableData" border style="width: 100%;">
      <el-table-column prop="name" :label="$t('menu.name')" header-align="center" min-width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="icon" :label="$t('menu.icon')" header-align="center" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <svg class="icon-svg" aria-hidden="true"><use :xlink:href="`#${scope.row.icon}`"></use></svg>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="$t('menu.type')" header-align="center" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">{{ $t('menu.type0') }}</el-tag>
          <el-tag v-else size="small" type="info">{{ $t('menu.type1') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" :label="$t('menu.sort')" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" :label="$t('menu.url')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="permissions" :label="$t('menu.permissions')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="filterPermission('sys:menu:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button v-if="filterPermission('sys:menu:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import normalTableMixin from '@/mixins/normal-table-mixin'
import { getMenuList } from '@/api/sys/menu'
export default {
  components: {},
  mixins: [normalTableMixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
  },
  created() {
    this.tableAction.getList = getMenuList
    console.log('table page created')
  },
  methods: {
    addOrUpdateHandle() {},
    deleteHandle() {}
  }
}
</script>
