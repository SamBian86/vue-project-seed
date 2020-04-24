<template>
  <el-card shadow="never" class="layout-container aui-card--fill">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component
          :is="pageInfo.component"
          :pageinfo="pageInfo"
          :pageupdate="pageUpdateList"
          v-bind="$attrs"
          @page-change="pageChange"
          @page-update="pageUpdate"
          v-on="$listeners"
        ></component>
      </keep-alive>
    </transition>
  </el-card>
</template>

<script>
import pageMixin from '@/mixins/page-mixin'
import pageTable from './table'
import pageForm from './form'
export default {
  components: { pageTable, pageForm },
  mixins: [pageMixin],
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
