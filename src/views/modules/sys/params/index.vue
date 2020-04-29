<template>
  <el-card shadow="never" class="layout-container aui-card--fill">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component
          :is="pageInfo.component"
          :page_info="pageInfo"
          :page_update_list="pageUpdateList"
          v-bind="attrs"
          @page-switch="pageSwitch"
          @page-update-list-add="pageUpdateListAdd"
          @page-update-list-delete="pageUpdateListDelete"
          v-on="listeners"
        ></component>
      </keep-alive>
    </transition>
  </el-card>
</template>

<script>
import pageDefaultMixin from '@/mixins/page-default-mixin'
import pageTable from './table'
import pageForm from './form'

// 页面根组件
export default {
  components: { pageTable, pageForm },
  mixins: [pageDefaultMixin],
  data() {
    return {
      pageComponents: [
        {
          name: 'table',
          component: pageTable
        },
        {
          name: 'form',
          component: pageForm
        }
      ],
      pageInfo: {},
      pageUpdateList: []
    }
  },
  computed: {},
  created() {
    // 初始化include
    this.generateInclude()
    const { pageComponents } = this
    // 初始化显示列表页面
    this.pageInfo = pageComponents[0]
  },
  methods: {}
}
</script>
