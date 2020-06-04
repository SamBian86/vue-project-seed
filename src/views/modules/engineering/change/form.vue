<template>
  <el-row :gutter="10">
    <el-col
      :span="formConfig.formSpan"
      :lg="formConfig.formSpan"
      :md="formConfig.formSpan"
      :sm="24"
      :xs="24"
    >
      <div
        v-if="formGenerateTitle[$attrs.page_info.data.pageType] !== ''"
        class="form-title"
      >{{ formGenerateTitle[$attrs.page_info.data.pageType] }}</div>
      <yunlin-form
        ref="yunlinForm"
        :config="formConfig"
        :handle="formHandle"
        :data="formData"
        :rules="formRules"
        v-bind="$attrs"
        @form-data-merge="formDataMerge"
        @form-generate-rule-by-props="formGenerateRuleByProps"
        @form-value-listener="formValueListener"
        @form-data-update="formDataUpdate"
        @form-reset-config-item="formResetConfigItem"
        v-on="$listeners"
      >
        <template slot="before-foot">
          <el-row :gutter="10">
            <el-col>
              <div>
                <el-divider content-position="left">{{ $t('contractChange.contractInfo') }}</el-divider>
              </div>
            </el-col>
            <el-col>
              <div class="choose-area">
                <el-button
                  v-if="containsPageType(['create', 'edit'])"
                  class="choose-contract-button"
                  type="primary"
                  :size="formConfig.formSize"
                  @click.stop="chooseContractHandle"
                >{{ $t('contractChange.contractChoose') }}</el-button>
              </div>
            </el-col>
            <el-col>
              <div class="choose-table-area">
                <el-table :data="contractChangeLinks" border>
                  <el-table-column
                    prop="contractCode"
                    :label="$t('contractChange.contractCode')"
                    width="160"
                  ></el-table-column>
                  <el-table-column prop="contractName" :label="$t('contractChange.contractName')"></el-table-column>
                  <el-table-column
                    prop="contractHandleman"
                    :label="$t('contractChange.contractHandleman')"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    prop="contractTotalPrice"
                    :label="$t('contractChange.contractTotalPrice')"
                    width="100"
                  ></el-table-column>
                  <el-table-column :label="$t('contractChange.changeCostInfos')" width="100">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="changeCostHandle(scope.row.contractId, scope.row.changeCostInfos || [])"
                      >{{ $t('contractChange.changeCostInfos') }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="changeAmount"
                    :label="$t('contractChange.changeAmount')"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    v-if="containsPageType(['create', 'edit'])"
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
                        @click="deleteCostHandle(scope.row.contractId)"
                      >{{ $t('delete') }}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="footer">
          <div class="form-submit-container">
            <el-button
              v-if="containsPageType(['create', 'edit', 'detail'])"
              :size="formConfig.formSize"
              @click.stop="cancleHandle"
            >{{ $t('back') }}</el-button>
            <el-button
              v-if="containsPageType(['create']) && filterPermission('engineering:change:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('engineering:change:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('update') }}</el-button>
          </div>
        </template>
      </yunlin-form>
      <yunlin-drawer
        ref="yunlinDrawer"
        :config="drawerConfig"
        v-bind="$attrs"
        @drawer-closed="drawerClosed"
        v-on="$listeners"
      >
        <component
          :is="drawerComponent"
          :drawer-data="drawerData"
          :disabled="containsPageType(['detail'])"
          @drawer-close-by-child="drawerCloseByChild"
          @set-form-data="setFormData"
          @set-change-data="setChangeData"
        ></component>
      </yunlin-drawer>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formDefaultMixin from '@/mixins/form-default-mixin'
import drawerDefaultMixin from '@/mixins/drawer-default-mixin'
import {
  createEngineeringContractChange,
  editEngineeringContractChange,
  getEngineeringContractChangeById
} from '@/api/engineering/contractChange'
import { getEngineeringProjectList } from '@/api/engineering/project'
import { getEngineeringContractChangeTypeList } from '@/api/engineering/contractChangeType'
import { getSysDeptListAll } from '@/api/sys/dept'
import { getUserList } from '@/api/sys/user'
import contractList from './list'
import costList from './cost-list'
// import { validateMobile } from '@/utils/validator'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        list: contractList,
        cost: costList
      },
      // 定义表单名称
      formTitle: {
        create: this.$t('add'),
        edit: this.$t('update'),
        detail: this.$t('detail')
      },
      formGenerateTitle: {},
      formHandle: {
        // 创建抽象方法，用创建接口方法覆盖
        create: {
          api: createEngineeringContractChange
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editEngineeringContractChange
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getEngineeringContractChangeById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: [],
      // 合同信息列表
      contractChangeLinks: []
    }
  },
  computed: {
    ...mapGetters('app', ['filterPermission', 'getDictByType', 'getDictNameByValue'])
  },
  activated() {
    // console.log('form activated')
    this.init()
  },
  created() {
    // console.log(this.$attrs.page_info)
    // console.log('form created')

    // 设置整体表单栅格列数
    this.formConfig.formSpan = 24
  },
  methods: {
    generateTitle() {
      const { formTitle } = this
      this.formGenerateTitle = formTitle
    },
    init() {
      this.contractChangeLinks = []
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 分割线
          span: 24,
          name: 'contractChange.baseInfo',
          type: 'divider'
        },
        {
          // 项目名称
          span: 8,
          prop: 'projectId',
          name: 'contractChange.projectId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringProjectList,
            requestParams: {},
            afterChange: this.afterChange,
            itemProps: {
              label: 'name',
              value: 'id'
            },
            propName: 'projectId',
            placeholder: 'contractChange.projectId',
            className: 'select-block',
            mergeData: { target: 'projectId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 变更类别
          span: 8,
          prop: 'changeId',
          name: 'contractChange.changeId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getEngineeringContractChangeTypeList,
            requestParams: {},
            itemProps: {
              label: 'changeTypeName',
              value: 'id'
            },
            propName: 'changeTypeName',
            placeholder: 'contractChange.changeId',
            className: 'select-block',
            mergeData: { target: 'changeId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 变更专业
          span: 8,
          prop: 'changeSpeciality',
          name: 'contractChange.changeSpeciality',
          type: 'select',
          className: 'select-block',
          placeholder: 'contractChange.changeSpeciality',
          rules: [{ required: true }],
          items: this.getDictByType('change_speciality'),
          itemType: 'dict'
        },
        {
          // 变更名称
          span: 8,
          prop: 'changeName',
          name: 'contractChange.changeName',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 变更编号
          span: 8,
          prop: 'changeCode',
          name: 'contractChange.changeCode',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 变更金额
          span: 8,
          prop: 'changeAmount',
          name: 'contractChange.changeAmount',
          type: 'text',
          disabled: true
        },
        {
          // 变更原因
          span: 16,
          prop: 'changeReason',
          name: 'contractChange.changeReason',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 工程部位
          span: 8,
          prop: 'changePosition',
          name: 'contractChange.changePosition',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 图纸编号
          span: 8,
          prop: 'mapCode',
          name: 'contractChange.mapCode',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 设计单位
          span: 8,
          prop: 'designerUnit',
          name: 'contractChange.designerUnit',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          // 签发日期
          span: 8,
          prop: 'applyDate',
          name: 'contractChange.applyDate',
          type: 'date-picker',
          className: 'select-block',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          rules: [{ required: true }]
        },
        {
          // 申请人
          span: 8,
          prop: 'userId',
          name: 'contractChange.userId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getUserList,
            requestParams: {},
            itemProps: {
              label: 'realName',
              value: 'id'
            },
            propName: 'userId',
            placeholder: 'contractChange.userId',
            className: 'select-block',
            mergeData: { target: 'drawingbudgetUserId' },
            mergeOtherData: [
              { source: 'deptName', target: 'deptName', default: '' },
              { source: 'deptId', target: 'deptId', default: 0 }
            ],
            componentNames: ['select-dynamic']
          }
        },
        {
          // 经办人部门
          span: 8,
          prop: 'deptId',
          name: 'contractChange.deptId',
          type: 'popover-tree',
          rules: [{ required: true }],
          component: 'toolPopoverTree',
          componentConfig: {
            request: getSysDeptListAll,
            requestParams: {},
            // treeDataTranslate,
            // treeDataFilter: true,
            // treeDataFilterKey: '',
            i18nDefault: 'contractChange.defaultDeptName',
            propName: 'deptName',
            sourceName: 'name',
            treeProps: { label: 'name', children: 'children' },
            treeNodeKey: 'id',
            mergeData: [
              { source: 'name', target: 'deptName', default: '' },
              { source: 'id', target: 'deptId', default: 0 }
            ],
            componentNames: ['popover-tree']
          }
        },
        {
          // 变更说明
          span: 24,
          prop: 'remark',
          name: 'contractChange.remark',
          type: 'textarea',
          attrs: { autosize: { minRows: 4, maxRows: 6 } }
        },
        {
          // 附件
          span: 24,
          prop: 'changeOssIds',
          name: 'contractChange.changeOssIds',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'multiple-file',
            propName: 'changeOssIds',
            format: 2,
            limit: 20,
            mergeData: { target: 'changeOssIds' }
          }
        }
      ]

      // 组装表单初始数据
      this.generateFormData()
      // 生成标题
      this.generateTitle()
      // 生成表单及验证规则
      this.generateForm()

      this.drawerConfig.size = '95%'
    },
    // 修改项目以后的操作
    afterChange() {
      // this.cleanForCostInfo()
    },
    // 选择合同
    chooseContractHandle() {
      const { projectId } = this.formData
      if (!projectId) {
        this.$message({
          message: `${this.$t('choose')}${this.$t('contractChange.projectId')}`,
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.setDrawerComponent('list')
      this.setDrawerData({ projectId, contractStatus: 2 })
      this.setDrawerTitle(this.$t('contractChange.contractChoose'))
      this.drawerVisibleHandle()
    },
    // 列表勾选数据处理
    setFormData(ids, items) {
      const { contractChangeLinks } = this
      const contractIds = contractChangeLinks.map(item => item.contractId)
      ids.map(id => {
        if (!contractIds.includes(id)) {
          contractChangeLinks.push(items['contract_' + id])
        }
      })
      this.contractChangeLinks = contractChangeLinks
      this.formDataMerge({
        contractChangeLinks
      })
    },
    // 设置明细数据
    setChangeData(data) {
      const { contractChangeLinks } = this
      const { contractId, changeAmount, changeCostInfos } = data
      contractChangeLinks.forEach(item => {
        if (item.contractId === contractId) {
          item.changeAmount = changeAmount
          item.changeCostInfos = changeCostInfos
        }
      })
      this.contractChangeLinks = contractChangeLinks
      this.formDataMerge({
        contractChangeLinks
      })
    },
    // 变更明细
    changeCostHandle(contractId, changeCostInfos = []) {
      console.log(contractId)
      this.setDrawerComponent('cost')
      this.setDrawerData({ contractId, list: changeCostInfos })
      this.setDrawerTitle(this.$t('contractChange.changeCostInfos'))
      this.drawerVisibleHandle()
    },
    // 删除变更明细
    deleteCostHandle(contractId) {
      const { contractChangeLinks } = this
      const items = contractChangeLinks.filter(item => item.contractId !== contractId)
      this.contractChangeLinks = items
      this.formDataMerge({
        contractChangeLinks: items
      })
    },
    afterFormDataUpdate() {
      const { contractChangeLinks } = this.formData
      this.contractChangeLinks = contractChangeLinks
    }
  }
}
</script>
<style lang="scss">
.choose-area {
  text-align: right;
}

.choose-table-area {
  padding: 20px 0px;
}

.choose-contract-button {
  margin-right: 0px;
}
</style>
