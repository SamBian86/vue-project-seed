<template>
  <div class="draw-table-container">
    <div class="draw-table-count">
      <span class="currentTotalPrice">
        {{ $t('applycostlist.currentTotalPrice') }}
        <b>{{ currentTotalPrice }}</b>
      </span>
    </div>
    <div class="table-no-padding">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-table :data="list" border>
            <el-table-column min-width="180" :label="$t('applycostlist.costTypeName')">
              <template slot-scope="scope">
                <span>{{ scope.row.costTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="pcostTypeName"
              :label="$t('applycostlist.pcostTypeName')"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="costPrimitiveTarget"
              :label="$t('applycostlist.costPrimitiveTarget')"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="contractTotalCost"
              :label="$t('applycostlist.contractTotalCost')"
              width="100"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.save === false && scope.row.warning === false"
                >{{ scope.row.contractTotalCost }}</div>
                <div v-else-if="scope.row.save === true && scope.row.warning === true">
                  {{ scope.row.contractTotalCost }}
                  <el-tooltip
                    class="range-warning"
                    effect="dark"
                    :content="`${$t('applycostlist.applyAmountRange')}${scope.row.remain > 0 ? scope.row.remain : 0}`"
                    placement="top"
                  >
                    <span>
                      <i class="el-icon-warning-outline"></i>
                      ({{ scope.row.remain > 0 ? scope.row.remain : 0 }})
                    </span>
                  </el-tooltip>
                </div>
                <div v-else-if="scope.row.save === true && scope.row.warning === false">
                  {{ scope.row.contractTotalCost }}
                  <el-tooltip
                    class="range-success"
                    effect="dark"
                    :content="`${$t('applycostlist.applyAmountRange')}${scope.row.remain > 0 ? scope.row.remain : 0}`"
                    placement="top"
                  >
                    <span>
                      <i class="el-icon-circle-check"></i>
                      ({{ scope.row.remain > 0 ? scope.row.remain : 0 }})
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="contractGeneratedAmount"
              :label="$t('applycostlist.contractGeneratedAmount')"
              width="100"
            ></el-table-column>
            <el-table-column
              v-if="!disabled"
              :label="$t('applycostlist.applyAmount')"
              width="200"
              align="center"
              header-align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.load === false && scope.row.save === false"
                  type="text"
                  size="small"
                  @click="applyCost(scope.row.costTypeId)"
                >{{ $t('applycostlist.apply') }}</el-button>
                <div v-else-if="scope.row.load === true && scope.row.save === false">
                  <el-row :gutter="10">
                    <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <el-input
                        v-model="scope.row.applyAmount"
                        size="small"
                        :placeholder="$t('applycostlist.amountPlaceholder')"
                        @keyup.enter.native="save(scope.row.costTypeId)"
                      ></el-input>
                    </el-col>
                    <el-col :span="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <el-button
                        type="text"
                        size="small"
                        @click="save(scope.row.costTypeId)"
                      >{{ $t('applycostlist.save') }}</el-button>
                    </el-col>
                    <el-col :span="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <el-button
                        type="text"
                        size="small"
                        @click="cancel(scope.row.costTypeId)"
                      >{{ $t('applycostlist.cancel') }}</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div v-else-if="scope.row.load === true && scope.row.save === true">
                  {{ scope.row.applyAmount }}
                  <el-button
                    type="text"
                    size="small"
                    @click="cancel(scope.row.costTypeId)"
                  >{{ $t('applycostlist.cancel') }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              prop="applyAmount"
              :label="$t('applycostlist.applyAmount')"
              width="200"
              align="center"
              header-align="center"
              fixed="right"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="!disabled" class="draw-table-submit">
      <el-button size="small" @click="cancelAll">{{ $t('applycostlist.cancel') }}</el-button>
      <el-button type="primary" size="small" @click="saveAll">{{ $t('applycostlist.save') }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import formMixin from '@/mixins/form-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import {
  getEngineeringContractApplycostListByApplyId,
  getEngineeringContractApplycostListByContractId
} from '@/api/engineering/contractApplycostList'
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
      id: '',
      list: [],
      pageType: '',
      currentTotalPrice: 0
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
  },
  watch: {
    drawerData(newVal, oldVal) {
      // console.log('watch cost-info-list')
      this.init()
    }
  },
  activated() {
    // console.log('activated cost-info-list')
    this.init()
  },
  created() {
    // console.log('created cost-info-list')
    this.init()
  },
  methods: {
    init() {
      const { id, list, contractId, pageType } = this.drawerData
      this.id = id
      this.contractId = contractId
      this.pageType = pageType

      if (list.length === 0) {
        if (pageType === 'create') {
          this.getEngineeringContractApplycostListByContractId()
        }

        if (pageType === 'edit') {
          this.getEngineeringContractApplycostListByApplyId()
        }
      } else {
        list.forEach(item => {
          if (item.applyAmount === 0) {
            item.load = false
            item.warning = false
            item.save = false
          } else {
            item.load = true
            item.remain = item.contractTotalCost - item.contractGeneratedAmount
            item.warning = item.remain < item.applyAmount || false
            item.save = true
          }
        })
        this.list = list
        this.countTotalPrice()
      }
    },
    getEngineeringContractApplycostListByContractId() {
      const { contractId } = this
      getEngineeringContractApplycostListByContractId({ contractId }).then(response => {
        const list = []
        const defaultData = {
          applyAmount: 0,
          applyPaymentId: '',
          contractGeneratedAmount: 0,
          contractId,
          contractTotalCost: 0,
          costControlRate: 0,
          costPrimitiveTarget: '',
          costTypeCode: '',
          costTypeId: '',
          costTypeName: '',
          pcostTypeName: '',
          pid: '',
          remark: ''
        }
        response.forEach(item => {
          const remain = item.contractTotalCost - item.contractGeneratedAmount
          list.push({ ...defaultData, ...item, remain, load: false, warning: false, save: false })
        })
        this.$set(this, 'list', list)
        this.$nextTick(() => {
          this.countTotalPrice()
        })
      })
    },
    getEngineeringContractApplycostListByApplyId() {
      const { contractId, id } = this
      getEngineeringContractApplycostListByApplyId({ applyPaymentId: id }).then(response => {
        const list = []
        const defaultData = {
          applyAmount: 0,
          applyPaymentId: id,
          contractGeneratedAmount: 0,
          contractId,
          contractTotalCost: 0,
          costControlRate: 0,
          costPrimitiveTarget: '',
          costTypeCode: '',
          costTypeId: '',
          costTypeName: '',
          pcostTypeName: '',
          pid: '',
          remark: ''
        }
        response.forEach(item => {
          const remain = item.contractTotalCost - item.contractGeneratedAmount
          list.push({
            ...defaultData,
            ...item,
            remain,
            load: item.applyAmount !== 0 || false,
            warning: remain < item.applyAmount || false,
            save: item.applyAmount !== 0 || false
          })
        })
        this.$set(this, 'list', list)
        this.$nextTick(() => {
          this.countTotalPrice()
        })
      })
    },
    applyCost(costTypeId) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        if (item.costTypeId === costTypeId) {
          newList.push({ ...item, load: true, warning: false, save: false })
        } else {
          newList.push(item)
        }
      })
      this.$set(this, 'list', newList)
    },
    // 保存
    save(costTypeId) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        item.applyAmount =
          !isNaN(item.applyAmount) && item.applyAmount !== '' && item.applyAmount !== null ? item.applyAmount - 0 : 0
        if (item.costTypeId === costTypeId) {
          const warning = item.remain < item.applyAmount || item.remain < 0 || false
          newList.push({ ...item, warning, save: true })
        } else {
          newList.push(item)
        }
      })
      // console.log(newList)
      this.$set(this, 'list', newList)
      this.$nextTick(() => {
        this.countTotalPrice()
      })
    },
    // 取消
    cancel(costTypeId) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        if (item.costTypeId === costTypeId) {
          newList.push({ ...item, load: false, warning: false, save: false })
        } else {
          newList.push(item)
        }
      })
      // console.log(newList)
      this.$set(this, 'list', newList)
      this.$nextTick(() => {
        this.countTotalPrice()
      })
    },
    countTotalPrice() {
      const { list } = this
      let currentTotalPrice = 0
      list.map(item => {
        if (item.save) {
          currentTotalPrice += item.applyAmount
        }
      })
      this.currentTotalPrice = currentTotalPrice
    },
    // 保存所有
    saveAll() {
      const { list, currentTotalPrice } = this
      const newData = {
        thisAmount: currentTotalPrice,
        applyCostinfoDto: list
      }
      this.$formDataMerge(newData)
      this.$drawerCloseByChild()
    },
    // 取消
    cancelAll() {
      this.$drawerCloseByChild()
    }
  }
}
</script>
<style lang="scss" scoped>
// 容器样式
.draw-table-container {
  padding: 40px 10px 80px;
  height: calc(100vh - 47px) !important;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
}

.draw-table-count {
  position: fixed;
  height: 40px;
  line-height: 40px;
  padding: 0px 10px;
  background: #fff;
  z-index: 999;
  width: 90%;
  right: 0;
  top: 47px;
  text-align: left;
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
.range-warning {
  color: red;
  float: right;
}

.range-success {
  color: #67c23a;
  float: right;
}

.table-column-line-through {
  text-decoration: line-through;
  background: #dcdcdc;
  color: red;
}

.table-column-save {
  color: #67c23a;
}

.currentTotalPrice {
  font-size: 18px;
}

.currentTotalPrice b {
  color: #67c23a;
}
</style>
