<template>
  <div class="draw-table-container">
    <div class="draw-table-count">
      <span class="contractTotalPrice">
        {{ $t('contractCost.amountAll') }}
        <b>{{ contractTotalPrice }}</b>
      </span>
    </div>
    <div class="table-no-padding">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-table :data="list" border>
            <el-table-column min-width="180" :label="$t('contractCost.costTypeName')">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.save === false"
                  class="table-column-line-through"
                >{{ scope.row.costTypeName }}</span>
                <span
                  v-if="scope.row.save === true"
                  class="table-column-save"
                >{{ scope.row.costTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="pcostTypeName"
              :label="$t('contractCost.pcostTypeName')"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="costPrimitiveTarget"
              :label="$t('contractCost.costPrimitiveTarget')"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="costControlRate"
              :label="$t('contractCost.costControlRate')"
              :formatter="costControlRateFormatter"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="drawingbudgetTotalCost"
              :label="$t('contractCost.drawingbudgetTotalCost')"
              min-width="140"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.save === false && scope.row.warning === false"
                >{{ scope.row.drawingbudgetTotalCost }}</div>
                <div v-else-if="scope.row.save === true && scope.row.warning === true">
                  {{ scope.row.drawingbudgetTotalCost }}
                  <el-tooltip
                    class="range-warning"
                    effect="dark"
                    :content="`${$t('contractCost.drawingbudgetTotalCostRange')}${scope.row.drawingbudgetTotalCostRange}`"
                    placement="top"
                  >
                    <span>
                      <i class="el-icon-warning-outline"></i>
                      ({{ scope.row.drawingbudgetTotalCostRange }})
                    </span>
                  </el-tooltip>
                </div>
                <div v-else-if="scope.row.save === true && scope.row.warning === false">
                  {{ scope.row.drawingbudgetTotalCost }}
                  <el-tooltip
                    class="range-success"
                    effect="dark"
                    :content="`${$t('contractCost.drawingbudgetTotalCostRange')}${scope.row.drawingbudgetTotalCostRange}`"
                    placement="top"
                  >
                    <span>
                      <i class="el-icon-circle-check"></i>
                      ({{ scope.row.drawingbudgetTotalCostRange }})
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="contractGeneratedAmount"
              :label="$t('contractCost.contractGeneratedAmount')"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="changeGeneratedAmount"
              :label="$t('contractCost.changeGeneratedAmount')"
              width="140"
            ></el-table-column>
            <el-table-column
              v-if="!disabled"
              :label="$t('contractCost.amount')"
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
                  @click="getEngineeringCost(scope.row.costTypeId)"
                >{{ $t('contractCost.load') }}</el-button>
                <div v-else-if="scope.row.load === true && scope.row.save === false">
                  <el-row :gutter="10">
                    <el-col :span="16" :lg="16" :md="16" :sm="24" :xs="24">
                      <el-input
                        v-model="scope.row.amount"
                        size="small"
                        :placeholder="$t('contractCost.amountPlaceholder')"
                        @keyup.enter.native="save(scope.row.costTypeId)"
                      ></el-input>
                    </el-col>
                    <el-col :span="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <el-button
                        type="text"
                        size="small"
                        @click="save(scope.row.costTypeId)"
                      >{{ $t('contractCost.save') }}</el-button>
                    </el-col>
                    <el-col :span="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <el-button
                        type="text"
                        size="small"
                        @click="cancel(scope.row.costTypeId)"
                      >{{ $t('contractCost.cancel') }}</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div v-else-if="scope.row.load === true && scope.row.save === true">
                  {{ scope.row.amount }}
                  <el-button
                    type="text"
                    size="small"
                    @click="cancel(scope.row.costTypeId)"
                  >{{ $t('contractCost.cancel') }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              prop="amount"
              :label="$t('contractCost.amount')"
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
import { getEngineeringCostSelect, getEngineeringCost } from '@/api/engineering/contractCost'
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
      projectId: '',
      list: [],
      contractTotalPrice: 0 // 合同金额
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission'])
  },
  watch: {
    drawerData(newVal, oldVal) {
      if (newVal.projectId !== '' && newVal.projectId !== oldVal.projectId) {
        // console.log('watch cost-info-list')
        this.$set(this.drawerData, 'list', [])
        this.$set(this, 'list', [])
        this.$set(this, 'contractTotalPrice', 0)
        this.init()
      }
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
      const { list, projectId } = this.drawerData
      this.projectId = projectId

      if (list.length === 0) {
        // 获取详情预算科目列表
        this.getEngineeringCostSelect()
      } else {
        list.forEach(item => {
          if (item.amount === 0) {
            item.load = false
            item.warning = false
            item.save = false
          } else {
            item.load = true
            item.drawingbudgetTotalCostRange = item.drawingbudgetTotalCost * (1 + parseFloat(item.costControlRate))
            item.warning = item.drawingbudgetTotalCost * (1 + parseFloat(item.costControlRate)) < item.amount || false
            item.save = true
          }
        })
        this.list = list
      }
      this.countTotalPrice()
    },
    getEngineeringCostSelect() {
      const { projectId } = this
      getEngineeringCostSelect({ projectId }).then(response => {
        const list = []
        const defaultData = {
          amount: 0,
          changeGeneratedAmount: '',
          contractGeneratedAmount: '',
          contractId: '',
          costControlRate: '',
          costPrimitiveTarget: '',
          costTypeCode: '',
          costTypeId: '',
          costTypeName: '',
          drawingbudgetTotalCost: '',
          pcostTypeName: '',
          pid: '',
          projectId,
          remark: ''
        }
        response.forEach(item => {
          list.push({ ...defaultData, ...item, load: false, warning: false, save: false })
        })
        this.list = list
        // console.log(list)
      })
    },
    getEngineeringCost(costTypeId) {
      const { projectId, list } = this
      getEngineeringCost({
        projectId,
        costTypeId
      }).then(response => {
        const newList = []
        list.forEach(item => {
          response.amount = response.amount !== '' || response.amount !== null ? response.amount - 0 : 0
          if (response.costControlRate !== '') {
            response.drawingbudgetTotalCostRange = response.drawingbudgetTotalCost * (1 + parseFloat(response.costControlRate))
          }
          if (item.costTypeId === costTypeId) {
            newList.push({ ...item, ...response, load: true, warning: false, save: false })
          } else {
            newList.push(item)
          }
        })
        // console.log(newList)
        this.$set(this, 'list', newList)
      })
    },
    // 强控比例格式化
    costControlRateFormatter(row, column) {
      if (row.costControlRate === '' || row.costControlRate === 0) {
        return ''
      } else {
        return `${row.costControlRate * 100}%`
      }
    },
    // 保存
    save(costTypeId) {
      const { list } = this
      const newList = []
      list.forEach(item => {
        item.amount = item.amount !== '' || item.amount !== null ? item.amount - 0 : 0
        if (item.costTypeId === costTypeId) {
          let warning = false
          if (item.drawingbudgetTotalCostRange) {
            warning = item.drawingbudgetTotalCostRange < item.amount || false
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
    cancel(costTypeId) {
      const { list } = this
      const newList = []
      const defaultData = {
        amount: 0,
        changeGeneratedAmount: '',
        contractGeneratedAmount: '',
        costControlRate: '',
        costPrimitiveTarget: '',
        drawingbudgetTotalCost: '',
        drawingbudgetTotalCostRange: '',
        pcostTypeName: '',
        pid: '',
        remark: ''
      }
      list.forEach(item => {
        if (item.costTypeId === costTypeId) {
          item.amount = 0
          newList.push({ ...item, ...defaultData, load: false, warning: false, save: false })
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
      let contractTotalPrice = 0
      list.map(item => {
        if (item.save) {
          contractTotalPrice += item.amount
        }
      })
      this.contractTotalPrice = contractTotalPrice
    },
    // 保存所有
    saveAll() {
      const { list, contractTotalPrice } = this
      const newData = {
        contractTotalPrice,
        costInfoList: list
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

.contractTotalPrice {
  font-size: 18px;
}

.contractTotalPrice b {
  color: #67c23a;
}
</style>
