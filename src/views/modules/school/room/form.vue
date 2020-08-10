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
              v-if="containsPageType(['create']) && filterPermission('school:room:save')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('add') }}</el-button>
            <el-button
              v-if="containsPageType(['edit']) && filterPermission('school:room:update')"
              type="primary"
              :size="formConfig.formSize"
              @click.stop="submitHandle"
            >{{ $t('update') }}</el-button>
          </div>
        </template>
      </yunlin-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formDefaultMixin from '@/mixins/form-default-mixin'
import { createSchoolRoom, editSchoolRoom, getSchoolRoomById } from '@/api/school/room'
import { getSchoolFloorListByBuildingId } from '@/api/school/floor'
import { getSchoolBuildingList } from '@/api/school/building'
// import { validateMobile } from '@/utils/validator'

export default {
  name: 'Form',
  components: {},
  mixins: [commonMixin, pageMixin, formDefaultMixin],
  data() {
    return {
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
          api: createSchoolRoom
        },
        // 修改抽象方法，用修改接口方法覆盖
        edit: {
          api: editSchoolRoom
        },
        // 详情抽象方法，用详情接口方法覆盖
        detail: {
          api: getSchoolRoomById
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
          // 房间名称
          span: 24,
          prop: 'roomName',
          name: 'schoolRoom.roomName',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 20 }
        },
        {
          // 床位数
          span: 24,
          prop: 'roomBedNum',
          name: 'schoolRoom.roomBedNum',
          type: 'text',
          rules: [{ required: true }],
          attrs: { maxlength: 10 }
        },
        {
          // 所属楼栋
          span: 24,
          prop: 'buildingId',
          name: 'schoolRoom.buildingId',
          type: 'select-dynamic',
          rules: [{ required: true }],
          component: 'toolSelectDynamic',
          componentConfig: {
            request: getSchoolBuildingList,
            requestParams: {},
            afterChange: this.afterBuildingChange,
            itemProps: {
              label: 'buildingName',
              value: 'id'
            },
            propName: 'buildingId',
            placeholder: 'schoolRoom.buildingId',
            className: 'select-block',
            mergeData: { target: 'buildingId' },
            componentNames: ['select-dynamic']
          }
        },
        {
          // 所属楼层 floorId
          span: 24,
          prop: 'floorId',
          name: 'schoolRoom.floorId',
          type: 'select',
          className: 'select-block',
          rules: [{ required: true }],
          placeholder: 'schoolRoom.floorId',
          items: []
        },
        {
          // 备注
          span: 24,
          prop: 'remark',
          name: 'schoolRoom.remark',
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
    afterFormDataUpdate() {
      this.getSchoolFloorListByBuildingId()
    },
    afterBuildingChange() {
      const { buildingId } = this.formData
      this.$set(this.formData, 'floorId', '')
      if (buildingId) {
        this.getSchoolFloorListByBuildingId()
      } else {
        this.formResetConfigItem([{ prop: 'floorId', items: [] }])
      }
    },
    getSchoolFloorListByBuildingId() {
      const { buildingId } = this.formData
      getSchoolFloorListByBuildingId({ buildingId }).then((response) => {
        response.forEach((item) => {
          item.placeholderText = item.floorName
          item.value = item.id
        })
        this.formResetConfigItem([{ prop: 'floorId', items: response }])
      })
    }
  }
}
</script>
