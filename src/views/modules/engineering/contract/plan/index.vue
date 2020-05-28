<template>
  <div class="draw-table-container">
    <div class="draw-table-count">
      <el-button
        :disabled="disabled"
        type="success"
        size="small"
        @click="addHandle"
      >{{ $t('contractPayplan.add') }}</el-button>
    </div>
    <div class="table-no-padding">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-table :data="list" border>
            <!-- 款项名称 -->
            <el-table-column
              width="160"
              prop="costPayName"
              :label="$t('contractPayplan.costPayName')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractPayplan.costPayName')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 付款金额 -->
            <el-table-column width="160" prop="amount" :label="$t('contractPayplan.amount')">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractPayplan.amount')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 承兑金额 -->
            <el-table-column
              width="160"
              prop="acceptancelAmount"
              :label="$t('contractPayplan.acceptancelAmount')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractPayplan.acceptancelAmount')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 现金金额 -->
            <el-table-column
              width="160"
              prop="cashAmount"
              :label="$t('contractPayplan.cashAmount')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractPayplan.cashAmount')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 付款节点 -->
            <el-table-column
              width="160"
              prop="paymentNode"
              :label="$t('contractPayplan.paymentNode')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractPayplan.paymentNode')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 预计付款时间 -->
            <el-table-column
              width="160"
              prop="estimatedPayTime"
              :label="$t('contractPayplan.estimatedPayTime')"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  class="select-block"
                  type="date"
                  size="small"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :placeholder="$t('contractPayplan.estimatedPayTime')"
                ></el-date-picker>
              </template>
            </el-table-column>
            <!-- 备注 -->
            <el-table-column prop="remark" :label="$t('contractPayplan.remark')">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractPayplan.remark')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              v-if="!disabled"
              :label="$t('handle')"
              width="60"
              align="center"
              header-align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="deleteHandle(scope.$index)"
                >{{ $t('contractPayplan.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="draw-table-submit">
      <el-button size="small" @click="cancelAll">{{ $t('contractPayplan.cancel') }}</el-button>
      <el-button
        :disabled="disabled"
        type="primary"
        size="small"
        @click="saveAll"
      >{{ $t('contractPayplan.save') }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import formMixin from '@/mixins/form-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import { getEngineeringContractPayplanListById, batchEngineeringContractPayplan } from '@/api/engineering/contractPayplan'
export default {
  components: {},
  mixins: [commonMixin, formMixin, drawerMixin],
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
      disabled: false,
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
      this.init()
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
      const { defaultItem } = this
      const { contractId, disabled } = this.drawerData
      defaultItem.contractId = contractId
      this.disabled = disabled
      this.contractId = contractId
      this.defaultItem = defaultItem
      this.getEngineeringContractPayplanListById()
    },
    getEngineeringContractPayplanListById() {
      const { contractId, defaultItem } = this
      const list = []
      getEngineeringContractPayplanListById({
        contractId
      }).then(response => {
        if (response.length === 0) {
          list.push({ ...defaultItem })
          this.list = list
        } else {
          this.list = response
        }
      })
    },
    // 添加
    addHandle() {
      const { list, defaultItem } = this
      list.push({ ...defaultItem })
      console.log(list)
      this.list = list
    },
    // 删除
    deleteHandle(index) {
      const { list } = this
      list.splice(index, 1)
      this.list = list
    },
    // 保存所有
    saveAll() {
      const { list, contractId } = this
      batchEngineeringContractPayplan({ list, contractId }).then(response => {
        this.$message({
          message: this.$t('prompt.success'),
          type: 'success',
          duration: 2000
        })
        this.$drawerCloseByChild()
      })
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
  text-align: right;
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
