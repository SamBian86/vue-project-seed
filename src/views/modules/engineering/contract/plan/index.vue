<template>
  <div class="draw-table-container">
    <div class="table-no-padding">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-table :data="list" border>
            <el-table-column
              min-width="180"
              prop="costPayName"
              :label="$t('contractPayplan.costPayName')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.costPayName"
                  size="small"
                  :placeholder="$t('contractCost.amountPlaceholder')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="pcostTypeName"
              :label="$t('contractCost.pcostTypeName')"
              width="180"
            ></el-table-column>-->
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="!disabled" class="draw-table-submit">
      <el-button size="small" @click="cancelAll">{{ $t('contractCost.cancel') }}</el-button>
      <el-button type="primary" size="small" @click="saveAll">{{ $t('contractCost.save') }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import formMixin from '@/mixins/form-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import { getEngineeringContractPayplanListById } from '@/api/engineering/contractPayplan'
export default {
  components: {},
  mixins: [commonMixin, formMixin, drawerMixin],
  props: {
    drawerData: {
      type: Object,
      default: function() {
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
      contractId: '',
      list: [],
      defaultItem: {
        costPayName: '',
        amount: '',
        acceptancelAmount: '',
        cashAmount: '',
        paymentNode: '',
        estimatedPayTime: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
  },
  watch: {
    drawerData(newVal, oldVal) {
      // if (newVal.projectId !== '' && newVal.projectId !== oldVal.projectId) {
      //   this.init()
      // }
    }
  },
  activated() {
    // console.log('activated cost-info-list')
  },
  created() {
    this.init()
    // console.log('created cost-info-list')
  },
  methods: {
    init() {
      const { contractId } = this.drawerData
      this.contractId = contractId
      this.getEngineeringContractPayplanListById()
    },
    getEngineeringContractPayplanListById() {
      const { contractId, defaultItem } = this
      const list = []
      getEngineeringContractPayplanListById({
        contractId
      }).then(response => {
        if (response.length === 0) {
          list.push(defaultItem)
          this.list = list
        } else {
          this.list = response
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 容器样式
.draw-table-container {
  padding: 0px 10px 80px;
  height: calc(100vh - 47px) !important;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
}

.draw-table-submit {
  position: fixed;
  height: 80px;
  line-height: 80px;
  padding: 0px 10px;
  background: #fff;
  z-index: 999;
  width: 90%;
  right: 0;
  bottom: 0;
  text-align: right;
}
// 容器样式
</style>
