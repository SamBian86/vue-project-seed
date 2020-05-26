<template>
  <div>123</div>
</template>
<script>
import { mapGetters } from 'vuex'
import drawerMixin from '@/mixins/drawer-mixin'
import commonMixin from '@/mixins/common-mixin'
export default {
  components: {},
  mixins: [commonMixin, drawerMixin],
  props: {
    drawerData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      projectId: '',
      list: []
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
  },
  activated() {},
  created() {
    const { list, projectId } = this.drawerData
    this.list = list
    this.projectId = projectId
  },
  methods: {}
}
</script>
