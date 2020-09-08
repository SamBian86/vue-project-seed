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
        <template slot="footer">
          <div class="form-submit-container">
            <el-button
              v-if="containsPageType(['create', 'edit', 'detail'])"
              :size="formConfig.formSize"
              @click.stop="cancleHandle"
            >{{ $t('back') }}</el-button>
            <el-button
              v-if="containsPageType(['create']) && filterPermission('building:worker:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('building:worker:update')"
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
          @drawer-close-by-child="drawerCloseByChild"
          v-on="$listeners"
        ></component>
        <!-- <xxx :drawer-data="drawerData" @drawer-close-by-child="drawerCloseByChild" v-on="$listeners"></xxx> -->
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
import { createBuildingWorker, editBuildingWorker, getBuildingWorkerById } from '@/api/building/worker'
import { getSchoolBuildingList } from '@/api/school/building'
// import { validateMobile } from '@/utils/validator'
import employeeComponent from '../employee'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin, drawerDefaultMixin],
  data() {
    return {
      drawerComponents: {
        employee: employeeComponent
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
          api: createBuildingWorker
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editBuildingWorker
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getBuildingWorkerById
        }
      },
      // 初始化数据定义
      formDefaultData: {},
      // 用于处理表单的隐藏与显示禁用行为
      formAction: []
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
    this.formConfig.formSpan = 12
  },
  methods: {
    generateTitle() {
      const { formTitle } = this
      this.formGenerateTitle = formTitle
    },
    init() {
      // 设置表单内容
      this.formConfig.formItemsReadOnly = [
        {
          // 照片
          span: 24,
          prop: 'headPhoto',
          name: 'buildingWorker.headPhoto',
          type: 'file-upload',
          component: 'toolFileUpload',
          componentConfig: {
            type: 'single-image',
            propName: 'headPhoto',
            format: 0,
            mergeData: { target: 'headPhoto' }
          }
        },
        {
          // 宿管
          span: 24,
          prop: 'userName',
          name: 'buildingWorker.userName',
          placeholder: 'buildingWorker.userNamePlaceholder',
          type: 'button',
          buttonType: 'text',
          clickHandle: this.employeeChooseHandle,
          rules: [{ required: true }]
        },
        {
          // 服务楼栋
          span: 24,
          prop: 'buildingList',
          name: 'buildingWorker.buildingList',
          type: 'tree-dynamic',
          component: 'toolTreeDynamic',
          componentConfig: {
            treeRequest: getSchoolBuildingList,
            treeRequestParams: {
              buildingType: 0
            },
            // treeResultRequest: null,
            // treeResultRequestParams: {},
            // treeResultRequestPropParams: ['id'],
            // treeResultKey: '',
            propName: 'buildingList',
            nodeKey: 'id',
            valueType: 'node',
            treeProps: { label: 'buildingName', children: 'children' },
            mergeData: { target: 'buildingList' },
            accordion: true,
            showCheckbox: true,
            componentNames: ['tree-dynamic']
          }
        },
        {
          // 备注
          span: 24,
          prop: 'introduce',
          name: 'buildingWorker.introduce',
          type: 'textarea',
          attrs: { autosize: { minRows: 6, maxRows: 10 }, maxlength: 30 }
        }
      ]

      // 组装表单初始数据
      this.generateFormData()
      // 生成标题
      this.generateTitle()
      // 生成表单及验证规则
      this.generateForm()
    },
    employeeChooseHandle() {
      const { userId } = this.formData
      this.setDrawerComponent('employee')
      this.setDrawerData({ t: new Date(), userId })
      this.setDrawerTitle(this.$t('buildingWorker.userNamePage'))
      this.drawerVisibleHandle()
    },
    // 用于子组件关闭drawer
    drawerCloseByChild(data) {
      this.drawerVisibleHandle(false)
      this.formDataMerge(data)
    }
  }
}
</script>
