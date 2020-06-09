<template>
  <div>
    <el-upload
      ref="button-import"
      :action="uploadUrl"
      :auto-upload="false"
      :http-request="httpRequestHandle"
      :on-change="fileChangeHandle"
      :before-upload="beforeUploadHandle"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">{{ $t('import') }}</el-button>
    </el-upload>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import tableMixin from '@/mixins/table-mixin'
export default {
  name: 'ButtonImport',
  mixins: [commonMixin, pageMixin, tableMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          format: 0,
          uploadRequest: null, // 上传的方法
          componentNames: []
        }
      }
    }
  },
  data() {
    return {
      formats: [['xlsx', 'xls']],
      timer: null,
      componentNames: ['button-import'],
      uploadUrl: '',
      uploading: false,
      // 上传成功的本地文件list
      uploadFileList: [],
      // 上传文件队列
      uploadQueue: []
    }
  },
  computed: {},
  watch: {},
  activated() {
    // console.log('component-tree activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      // this.init()
      // console.log('重新获取component-tree组件数据')
    })
  },
  created() {
    // this.init()
  },
  methods: {
    // init() {
    //   const { treeDataTranslate } = this.config
    //   if (this.config.request) {
    //     this.config
    //       .request(this.config.requestParams)
    //       .then(response => {
    //         if (treeDataTranslate !== null && treeDataTranslate !== undefined) {
    //           this.list = treeDataTranslate(response)
    //         } else {
    //           this.list = response
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //   } else {
    //     Promise.reject('请提供一个返回Promise对象的request方法')
    //   }
    // }
    // 覆盖默认提交行为
    httpRequestHandle() {
      const { uploadFileList } = this

      // 锁定为上传状态，保存需要上传的队列
      this.uploading = true
      this.uploadQueue = uploadFileList

      this.timer = setTimeout(() => {
        this.uploadRequest() // 开始进行上传
      }, 200)
    },
    // 文件检查
    fileChangeHandle(file, fileList) {
      const checkType = this.beforeUploadHandle(fileList)

      if (checkType) {
        this.fileConstructorData(fileList)
      } else {
        this.$refs['button-import'] && this.$refs['button-import'].clearFiles()
      }
    },
    fileConstructorData(fileList) {
      const uploadFileAddList = [] // 新增的图片.
      uploadFileAddList.push(fileList[fileList.length - 1])

      // 用于上传的队列
      this.uploadFileList = [...uploadFileAddList]
      // 开始载入上传队列
      this.httpRequestHandle()
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

      // return checkType
      return true
    },
    // 文件上传
    uploadRequest() {
      const { uploadQueue } = this
      const { uploadRequest, uploadRequestCallBack, uploadParams } = this.config
      const extraParams = uploadParams || {}
      if (uploadQueue.length === 0) {
        this.uploading = false
        clearTimeout(this.timer)
        return false
      }
      const file = uploadQueue.shift()
      uploadRequest({
        file: file.raw,
        ...extraParams
      })
        .then(response => {
          this.uploadFileList = []
          this.uploadQueue = uploadQueue

          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 2000
          })
          if (uploadRequestCallBack) {
            uploadRequestCallBack()
          }
        })
        .catch(message => {
          this.$notify({
            message,
            type: 'warning',
            dangerouslyUseHTMLString: true,
            duration: 0
          })
        })
    }
  }
}
</script>
<style lang="scss"></style>
