<template>
  <div class="draw-table-container">
    <div class="draw-table-count">
      <span class="changeAmount">
        {{ $t('contractChange.changeAmount') }}
        <b>{{ changeAmount }}</b>
      </span>
    </div>
    <div class="table-no-padding">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-table :data="list" border>
            <el-table-column
              prop="costTypeName"
              :label="$t('contractChange.costTypeName')"
              width="180"
            ></el-table-column>
            <el-table-column prop="pcostTypeName" :label="$t('contractChange.pcostTypeName')"></el-table-column>
            <el-table-column
              prop="costPrimitiveTarget"
              :label="$t('contractChange.costPrimitiveTarget')"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="costControlRate"
              :label="$t('contractChange.costControlRate')"
              :formatter="costControlRateFormatter"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="drawingbudgetTotalCost"
              :label="$t('contractChange.drawingbudgetTotalCost')"
              min-width="140"
            ></el-table-column>
            <el-table-column
              prop="contractGeneratedAmount"
              :label="$t('contractChange.contractGeneratedAmount')"
              min-width="140"
            ></el-table-column>
            <el-table-column
              prop="changeGeneratedAmount"
              :label="$t('contractChange.changeGeneratedAmount')"
              min-width="140"
            ></el-table-column>
            <el-table-column
              prop="thisChangeAmount"
              :label="$t('contractChange.thisChangeAmount')"
              min-width="140"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.load === false && scope.row.save === false"
                  type="text"
                  size="small"
                  @click="setThisChangeAmount(scope.row.id)"
                >{{ $t('contractChange.load') }}</el-button>
                <div v-else-if="scope.row.load === true && scope.row.save === false">
                  <el-row :gutter="10">
                    <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <el-input
                        v-model="scope.row.thisChangeAmount"
                        size="small"
                        :placeholder="$t('contractChange.thisChangeAmountPlaceholder')"
                        @keyup.enter.native="save(scope.row.id)"
                      ></el-input>
                    </el-col>
                    <el-col :span="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <el-button
                        type="text"
                        size="small"
                        @click="save(scope.row.id)"
                      >{{ $t('contractChange.save') }}</el-button>
                    </el-col>
                    <el-col :span="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <el-button
                        type="text"
                        size="small"
                        @click="cancel(scope.row.id)"
                      >{{ $t('contractChange.cancel') }}</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div v-else-if="scope.row.load === true && scope.row.save === true">
                  {{ scope.row.thisChangeAmount }}
                  <el-button
                    type="text"
                    size="small"
                    @click="cancel(scope.row.id)"
                  >{{ $t('contractCost.cancel') }}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="!disabled" class="draw-table-submit">
      <el-button size="small" @click="cancelAll">{{ $t('contractChange.cancel') }}</el-button>
      <el-button type="primary" size="small" @click="saveAll">{{ $t('contractChange.save') }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import formMixin from '@/mixins/form-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import { getEngineeringContractChangeContractCostById } from '@/api/engineering/contractChange'
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
      changeAmount: 0 // 变更金额
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
      const { list, contractId } = this.drawerData
      this.contractId = contractId

      if (list.length === 0) {
        this.getEngineeringContractChangeContractCostById()
      } else {
        list.forEach(item => {
          if (item.thisChangeAmount === 0) {
            item.load = false
            item.warning = false
            item.save = false
          } else {
            item.load = true
            item.drawingbudgetTotalCostRange = item.drawingbudgetTotalCost * (1 + parseFloat(item.costControlRate))
            item.warning =
              item.drawingbudgetTotalCost * (1 + parseFloat(item.costControlRate)) <
                item.thisChangeAmount + item.contractGeneratedAmount + item.changeGeneratedAmount || false
            item.save = true
          }
        })
        this.list = list
      }
      this.countTotalPrice()
    },
    getEngineeringContractChangeContractCostById() {
      const { contractId } = this
      getEngineeringContractChangeContractCostById({ id: contractId }).then(response => {
        const list = []
        response.forEach(item => {
          list.push({ ...item, load: false, warning: false, save: false })
        })
        this.$set(this, 'list', list)
        this.$nextTick(() => {
          this.countTotalPrice()
        })
        // console.log(list)
      })
    },
    setThisChangeAmount(id) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        item.thisChangeAmount = item.thisChangeAmount !== '' || item.thisChangeAmount !== null ? item.thisChangeAmount - 0 : 0
        if (item.costControlRate !== '') {
          item.drawingbudgetTotalCostRange = item.drawingbudgetTotalCost * (1 + parseFloat(item.costControlRate))
        }
        if (item.id === id) {
          newList.push({ ...item, load: true, warning: false, save: false })
        } else {
          newList.push(item)
        }
      })
      // console.log(newList)
      this.$set(this, 'list', newList)
    },
    // // 强控比例格式化
    costControlRateFormatter(row, column) {
      if (row.costControlRate === '' || row.costControlRate === 0) {
        return ''
      } else {
        return `${row.costControlRate * 100}%`
      }
    },
    // 保存
    save(id) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        item.thisChangeAmount =
          !isNaN(item.thisChangeAmount) && item.thisChangeAmount !== '' && item.thisChangeAmount !== null
            ? item.thisChangeAmount - 0
            : 0
        if (item.id === id) {
          let warning = false
          if (item.drawingbudgetTotalCostRange) {
            warning =
              item.drawingbudgetTotalCostRange <
                item.thisChangeAmount + item.contractGeneratedAmount + item.changeGeneratedAmount || false
          }
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
    cancel(id) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        if (item.id === id) {
          item.thisChangeAmount = 0
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
      let changeAmount = 0
      list.map(item => {
        if (item.save) {
          changeAmount += item.thisChangeAmount
        }
      })
      this.changeAmount = changeAmount
    },
    // 保存所有
    saveAll() {
      const { list, changeAmount, contractId } = this
      const newData = {
        contractId,
        changeAmount,
        changeCostInfos: list
      }
      this.$emit('set-change-data', newData)
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
  width: 95%;
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
  width: 95%;
  right: 0;
  bottom: 0;
  text-align: right;
}
// 容器样式
// .range-warning {
//   color: red;
//   float: right;
// }

// .range-success {
//   color: #67c23a;
//   float: right;
// }

// .table-column-line-through {
//   text-decoration: line-through;
//   background: #dcdcdc;
//   color: red;
// }

// .table-column-save {
//   color: #67c23a;
// }

.changeAmount {
  font-size: 18px;
}

.changeAmount b {
  color: #67c23a;
}
</style>
