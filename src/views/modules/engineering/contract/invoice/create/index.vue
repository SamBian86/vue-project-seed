<template>
  <div class="draw-table-container">
    <div class="draw-table-count">
      <span class="invoiceAdded">
        {{ $t('contractCreateInvoice.addedAmountTitle') }}
        <b>{{ addedAmount }}</b>
      </span>
      <span class="invoiceTotal">
        {{ $t('contractCreateInvoice.totalAmountTitle') }}
        <b>{{ addedAmount }}</b>
      </span>
      <el-button
        :disabled="disabled"
        class="invoiceAddedBtn"
        type="success"
        size="small"
        @click="addHandle"
      >{{ $t('contractCreateInvoice.add') }}</el-button>
    </div>
    <div class="table-no-padding">
      <el-row :gutter="10">
        <el-col :span="24" :lg="24" :md="24" :sm="24" :xs="24">
          <el-table :data="list" border>
            <!-- 对应款项 -->
            <el-table-column width="160" prop="planId" :label="$t('contractCreateInvoice.planId')">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.planId')"
                >
                  <el-option
                    v-for="(item, index) in planList"
                    :key="index"
                    :label="item.costPayName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 开票单位 -->
            <el-table-column
              width="160"
              prop="invoiceUnit"
              :label="$t('contractCreateInvoice.invoiceUnit')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.invoiceUnit')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 票据编码 -->
            <el-table-column
              width="160"
              prop="invoiceCode"
              :label="$t('contractCreateInvoice.invoiceCode')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.invoiceCode')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 票据代码 -->
            <el-table-column
              width="160"
              prop="invoiceSymbol"
              :label="$t('contractCreateInvoice.invoiceSymbol')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.invoiceSymbol')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 开票日期 -->
            <el-table-column
              width="160"
              prop="invoiceDate"
              :label="$t('contractCreateInvoice.invoiceDate')"
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
                  :placeholder="$t('contractCreateInvoice.invoiceDate')"
                ></el-date-picker>
              </template>
            </el-table-column>
            <!-- 票据类型 -->
            <el-table-column
              width="160"
              prop="invoiceType"
              :label="$t('contractCreateInvoice.invoiceType')"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.invoiceType')"
                >
                  <el-option
                    v-for="(item, index) in getDictByType('contract_receipt_type')"
                    :key="index"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 税额 -->
            <el-table-column
              width="160"
              prop="invoiceAmount"
              :label="$t('contractCreateInvoice.invoiceAmount')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.invoiceAmount')"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 含税金额 -->
            <el-table-column
              width="160"
              prop="contractTaxAmount"
              :label="$t('contractCreateInvoice.contractTaxAmount')"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  type="number"
                  :placeholder="$t('contractCreateInvoice.contractTaxAmount')"
                  @input="contractTaxAmountHandle"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 附件 -->
            <el-table-column
              prop="ossList"
              :label="$t('contractCreateInvoice.ossList')"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div>
                  <el-upload
                    class="upload-demo"
                    :action="uploadOssFileUrl"
                    :auto-upload="false"
                    :http-request="requestHandle"
                    :on-change="requestHandle"
                    :show-file-list="false"
                    :file-list="scope.row[scope.column.property]"
                  >
                    <el-button
                      size="small"
                      type="text"
                      @click="requestClick(scope.$index)"
                    >{{ $t('upload.button') }}</el-button>
                  </el-upload>
                  <div class="file-upload-list">
                    <div
                      v-for="(ite, index) in scope.row[scope.column.property]"
                      :key="index"
                      class="file-upload-item"
                    >
                      <el-link :underline="false" :href="ite.url" target="_blank">{{ ite.name }}</el-link>
                      <i class="el-icon-close" @click="removeImage(scope.$index, index)"></i>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <!-- 备注 -->
            <el-table-column width="200" prop="remark" :label="$t('contractCreateInvoice.remark')">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[scope.column.property]"
                  :disabled="disabled"
                  size="small"
                  :placeholder="$t('contractCreateInvoice.remark')"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="!disabled" class="draw-table-submit">
      <el-button size="small" @click="cancelAll">{{ $t('contractCreateInvoice.cancel') }}</el-button>
      <el-button type="primary" size="small" @click="saveAll">{{ $t('contractCreateInvoice.save') }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import formMixin from '@/mixins/form-mixin'
import drawerMixin from '@/mixins/drawer-mixin'
import { getEngineeringContractInvoiceList, batchEngineeringContractInvoiceById } from '@/api/engineering/contractInvoice'
import { getEngineeringContractPayplanListById } from '@/api/engineering/contractPayplan'
import { uploadOssFile } from '@/api/oss/oss'
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
      uploadOssFileUrl: '',
      contractId: '',
      planList: [],
      list: [],
      uploadIndex: 0,
      defaultItem: {
        contractId: '',
        contractTaxAmount: '',
        invoiceAmount: '',
        invoiceCode: '',
        invoiceDate: '',
        invoiceSymbol: '',
        invoiceType: '',
        invoiceUnit: '',
        ossList: [],
        planId: '',
        remark: '',
        new: true
      },
      addedAmount: 0, // 新增票据金额
      totalAmount: 0 // 合计票据金额
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
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
      const { defaultItem } = this
      const { contractId } = this.drawerData
      defaultItem.contractId = contractId
      this.contractId = contractId
      this.defaultItem = defaultItem

      this.getEngineeringContractPayplanListById()
      this.getEngineeringContractInvoiceList()
    },
    // 获取对应项列表
    getEngineeringContractPayplanListById() {
      const { contractId } = this
      getEngineeringContractPayplanListById({ contractId }).then(response => {
        this.planList = response
      })
    },
    // 票据列表
    getEngineeringContractInvoiceList() {
      const { contractId } = this
      getEngineeringContractInvoiceList({ contractId }).then(response => {
        this.list = response
      })
    },
    // 添加
    addHandle() {
      const { list, defaultItem } = this
      defaultItem.ossList = []
      list.push({ ...defaultItem })
      console.log(list)
      this.$set(this, 'list', list)
    },
    // 上传点击
    requestClick(index) {
      console.log(index)
      this.uploadIndex = index
    },
    // 上传文件
    requestHandle(file) {
      uploadOssFile({
        file: file.raw
      })
        .then(response => {
          const { list, uploadIndex } = this
          const ossList = list[uploadIndex]['ossList']
          ossList.push(response)
          list[uploadIndex]['ossList'] = ossList
          this.$set(this, 'list', list)

          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 2000
          })
        })
        .catch(message => {
          this.$message({
            message,
            type: 'error',
            duration: 2000
          })
        })
    },
    // 删除
    removeImage(scopeIndex, index) {
      const { list } = this
      const ossList = list[scopeIndex]['ossList']
      ossList.splice(index, 1)
      list[scopeIndex]['ossList'] = ossList
      this.$set(this, 'list', list)
    },
    // 保存所有
    saveAll() {
      const { list, contractId } = this
      batchEngineeringContractInvoiceById({ contractId, list })
        .then(response => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 2000
          })
          this.$drawerCloseByChild()
        })
        .catch(message => {
          this.$message({
            message,
            type: 'error',
            duration: 2000
          })
        })
    },
    // 取消
    cancelAll() {
      this.$drawerCloseByChild()
    },
    // 计算金额
    countTotalPrice() {
      const { list } = this
      let addedAmount = 0
      let totalAmount = 0
      list.map(item => {
        if (item.new) {
          addedAmount += item.contractTaxAmount - 0
        }
        totalAmount += item.contractTaxAmount - 0
      })
      this.addedAmount = addedAmount
      this.totalAmount = totalAmount
    },
    // 输入金额
    contractTaxAmountHandle(value) {
      this.countTotalPrice()
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

.invoiceAdded,
.invoiceTotal {
  font-size: 18px;
  margin-right: 10px;
}

.invoiceAdded b,
.invoiceTotal b {
  color: #67c23a;
}

.invoiceAddedBtn {
  float: right;
  margin-right: 0px;
}

.file-upload-item {
  display: flex;
  align-items: center;
}

.file-upload-item:hover .el-icon-close {
  display: inline;
}

.el-icon-close {
  cursor: pointer;
  display: none;
}
</style>
