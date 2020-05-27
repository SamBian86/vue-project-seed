<template>
  <div>
    <!-- 拖拽型上传控件 -->
    <div v-if="config.type === 'drag'" class="file-upload-drag">
      <el-upload
        ref="file-upload-drag"
        drag
        list-type="text"
        :action="uploadUrl"
        :auto-upload="false"
        multiple
        :http-request="dragHttpRequestHandle"
        :on-change="dragChangeHandle"
        :before-upload="beforeUploadHandle"
        :before-remove="dragBeforeRemoveHandle"
        :on-remove="dragRemoveHandle"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" v-html="$t('upload.text')"></div>
        <div
          slot="tip"
          class="el-upload__tip"
        >{{ $t('upload.tip', { format: formats[config.format].join('、') }) }}</div>
      </el-upload>
    </div>
    <!-- 单张上传控件 -->
    <div v-if="config.type === 'single-image'" class="file-upload-single-image">
      <el-upload
        ref="file-upload-single-image"
        list-type="picture-card"
        :class="resourcesList.length === 1 ? 'hide-upload-file' : ''"
        :file-list="resourcesList"
        :action="uploadUrl"
        :auto-upload="false"
        :http-request="singleImageHttpRequestHandle"
        :on-change="singleImageChangeHandle"
        :before-upload="beforeUploadHandle"
        :before-remove="singleImageBeforeRemoveHandle"
        :on-preview="singleImagePreviewHandle"
        :on-remove="singleImageRemoveHandle"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <!-- 多张图片上传 -->
    <div v-if="config.type === 'multiple-image'" class="file-upload-multiple-image">
      <el-upload
        ref="file-upload-multiple-image"
        list-type="picture-card"
        :class="resourcesList.length === config.limit ? 'hide-upload-file' : ''"
        :file-list="resourcesList"
        :action="uploadUrl"
        :auto-upload="false"
        :http-request="multipleImageHttpRequestHandle"
        :on-change="multipleImageChangeHandle"
        :before-upload="beforeUploadHandle"
        :before-remove="multipleImageBeforeRemoveHandle"
        :on-preview="multipleImagePreviewHandle"
        :on-remove="multipleImageRemoveHandle"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <!-- 多个文件上传 multiple-file -->
    <div v-if="config.type === 'multiple-file'" class="file-upload-multiple">
      <el-upload
        ref="file-upload-multiple-image"
        :file-list="resourcesList"
        :action="uploadUrl"
        :auto-upload="false"
        :http-request="multipleFileHttpRequestHandle"
        :on-change="multipleFileChangeHandle"
        :before-upload="beforeUploadHandle"
        :before-remove="multipleFileBeforeRemoveHandle"
        :on-preview="multipleFilePreviewHandle"
        :on-remove="multipleFileRemoveHandle"
      >
        <el-button v-if="!disabled" size="small" type="primary">{{ $t('upload.button') }}</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import dragUploadMixin from './mixins/drag-upload-mixin'
import singleImageUploadMixin from './mixins/single-image-upload-mixin'
import multipleImageUploadMixin from './mixins/multiple-image-upload-mixin'
import multipleFileUploadMixin from './mixins/multiple-file-upload-mixin'

export default {
  name: 'ToolFileUpload',
  mixins: [
    commonMixin,
    pageMixin,
    formMixin,
    dragUploadMixin,
    singleImageUploadMixin,
    multipleImageUploadMixin,
    multipleFileUploadMixin
  ],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          type: '', // 上传组件类型 drag single-image multiple-image multiple-file
          format: 0, // 校验规则查看下面formats
          uploadRequest: null,
          deleteRequest: null,
          propName: '', // 初始化用于显示的键名 页面数据键名
          limit: 2, // 用于multiple-image组件
          mergeData: { target: '' },
          // mergeData: [
          // { source: 'name', target: 'parentName' },
          // { source: 'id', target: 'pid' }
          // ]
          componentNames: [] // 组件更新成功以后连带的需要重新获取数据的组件
        }
      }
    },
    pageData: {
      // 用于组件从页面获取的数据
      type: Object,
      default: () => {
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
      formats: [
        ['jpeg', 'jpg', 'png', 'gif'],
        ['zip', 'xml', 'bar', 'bpmn'],
        ['jpeg', 'jpg', 'png', 'gif', 'zip', 'rar', 'pdf', 'xlsx', 'xls']
      ],
      timer: null,
      componentNames: ['file-upload'],
      uploadUrl: '',
      uploading: false, // 上传队列被开启
      resourcesList: [] // 上传成功的远程文件list
    }
  },
  watch: {
    pageData(newVal, oldVal) {
      const { propName, type } = this.config
      const newData = newVal[propName] || ''
      const oldData = oldVal[propName] || ''
      // 检查prop_data数据是否变动
      if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        // 单个上传组件
        if (type === 'single-image') {
          if (newData === '') {
            this.resourcesList = []
          } else {
            this.resourcesList = [
              {
                url: newData
              }
            ]
          }
        }
        // 多个图片上传
        if (type === 'multiple-image') {
          if (newData && newData.length !== 0) {
            this.resourcesList = [...newData]
          } else {
            this.resourcesList = []
          }
        }
        // 多个文件上传
        if (type === 'multiple-file') {
          if (newData && newData.length !== 0) {
            this.resourcesList = [...newData]
          } else {
            this.resourcesList = []
          }
        }
      }
      // this.dragUploadInit()
    },
    $attrs(newVal, oldVal) {
      // 检查drawer打开时drawerData数据是否改变，如果改变就重新初始化控件
      const newPageDrawerData = (newVal.page_drawer_data && newVal.page_drawer_data.data) || ''
      const oldPageDrawerData = (oldVal.page_drawer_data && oldVal.page_drawer_data.data) || ''
      // 检查page_drawer_data
      if (JSON.stringify(newPageDrawerData) !== JSON.stringify(oldPageDrawerData)) {
        this.dragUploadInit()
      }
    }
  },
  activated() {
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取file-upload组件数据')
    })
    // console.log('file-upload activated')
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { type } = this.config
      // drag single-image multiple-image multiple-file
      if (type === 'drag') {
        this.dragUploadInit()
      }
      if (type === 'single-image') {
        this.singleImageUploadInit()
      }
      if (type === 'multiple-image') {
        this.multipleImageUploadInit()
      }
      if (type === 'multiple-file') {
        this.multipleFileUploadInit()
      }

      // if (this.config.request) {
      //   this.config
      //     .request(this.config.requestParams)
      //     .then(response => {
      //       this.list = response
      //     })
      //     .catch(error => {
      //       console.log(error)
      //     })
      // } else {
      //   Promise.reject('请提供一个返回Promise对象的request方法')
      // }
    },
    // 上传前校验
    beforeUploadHandle(fileList) {
      let checkType = true // 默认校验可以通过
      const { formats } = this
      const { format } = this.config
      const reg = new RegExp('(' + formats[format].join('|') + ')')
      fileList.map(item => {
        if (item.raw) {
          const fileSuffix = item.raw.type === '' ? item.raw.name.replace(/\.(\w+)/, '$1') : item.raw.type
          if (!reg.test(item.raw.type || fileSuffix)) {
            checkType = reg.test(item.raw.type)
          }
        }
      })

      if (!checkType) {
        this.$message.error(this.$t('upload.tip', { format: formats[format].join('、') }))
      }

      return checkType
    },
    formDataMerge() {
      const { resourcesList } = this
      const { mergeData, type } = this.config
      const newData = {}
      if (type === 'drag') {
        newData[mergeData.target] = resourcesList
      }
      if (type === 'multiple-image') {
        newData[mergeData.target] = resourcesList
      }
      if (type === 'multiple-file') {
        newData[mergeData.target] = resourcesList
      }
      if (type === 'single-image') {
        newData[mergeData.target] = resourcesList.length !== 0 ? resourcesList[0]['url'] : ''
      }
      console.log(newData)
      this.$formDataMerge(newData)
    }
  }
}
</script>
<style lang="scss">
.file-upload-drag {
  width: fit-content;
}

.hide-upload-file .el-upload {
  display: none;
}

.el-upload-list__item {
  transition: none;
}
</style>
