<template>
  <div>
    <!-- 拖拽型上传空间 -->
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
        <div slot="tip" class="el-upload__tip">{{ $t('upload.tip', { format: formats[config.format].join('、') }) }}</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import dragUploadMixin from './mixins/drag-upload-mixin'
export default {
  name: 'ToolFileUpload',
  mixins: [commonMixin, pageMixin, formMixin, dragUploadMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          type: '', // 上传组件类型
          format: 0, // 校验规则查看下面formats
          uploadRequest: null,
          deleteRequest: null,
          propName: '', // 初始化用于显示的键名 页面数据键名
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
        ['jpge', 'jpg', 'png', 'gif'],
        ['zip', 'xml', 'bar', 'bpmn']
      ],
      timer: null,
      componentNames: ['file-upload'],
      uploadUrl: '',
      uploading: false, // 上传队列被开启
      resourcesList: [] // 上传成功的远程文件list
    }
  },
  watch: {
    pageData() {
      // this.dragUploadInit()
    },
    $attrs(newVal, oldVal) {
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
    console.log('file-upload activated')
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.dragUploadInit()
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
      const reg = new RegExp('\(' + formats[format].join('|') + '\)')
      fileList.map(item => {
        if (!reg.test(item.raw.type)) {
          checkType = reg.test(item.raw.type)
        }
      })

      if (!checkType) {
        this.$message.error(this.$t('upload.tip', { format: formats[format].join('、') }))
      }

      return checkType
    },
    formDataMerge() {
      const { resourcesList } = this
      const { mergeData } = this.config
      const newData = {}
      newData[mergeData.target] = resourcesList
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
</style>
