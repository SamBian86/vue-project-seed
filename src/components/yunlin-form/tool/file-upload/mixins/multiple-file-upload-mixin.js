import { uploadOssFile } from '@/api/oss/oss'
export default {
  data() {
    return {
      // 上传成功的本地文件list
      multipleFileList: [],
      // 上传文件队列
      uploadQueue: []
    }
  },
  computed: {},
  created() {
    // console.log('file-upload mixin created')
  },
  activated() {
    // console.log('file-upload mixin activated')
  },
  methods: {
    multipleFileUploadInit() {
      console.log('multipleFileUploadInit')
      const { propName } = this.config
      const { pageData } = this
      this.$refs['file-upload-multiple-file'] && this.$refs['file-upload-multiple-file'].clearFiles()
      if (pageData[propName] && pageData[propName].length !== 0) {
        this.resourcesList = [...pageData[propName]]
      } else {
        this.resourcesList = []
      }
      this.uploading = false
      this.multipleFileList = []
      this.uploadQueue = []
    },
    // 覆盖默认提交行为
    multipleFileHttpRequestHandle() {
      const { multipleFileList } = this

      // 锁定为上传状态，保存需要上传的队列
      this.uploading = true
      this.uploadQueue = multipleFileList

      this.timer = setTimeout(() => {
        this.uploadRequest() // 开始进行上传
      }, 200)
    },
    // 文件上传
    uploadRequest() {
      const { uploadQueue } = this

      if (uploadQueue.length === 0) {
        this.uploading = false
        clearTimeout(this.timer)
        return false
      }
      const file = uploadQueue.shift()
      uploadOssFile({
        file: file.raw
      })
        .then(response => {
          const { resourcesList } = this

          this.multipleFileList = []
          this.resourcesList = [...resourcesList, { ...response }]
          this.uploadQueue = uploadQueue

          this.formDataMerge()
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
    // 文件检查
    multipleFileChangeHandle(file, fileList) {
      const checkType = this.beforeUploadHandle(fileList)

      if (checkType) {
        this.multipleFileConstructorData(fileList)
      } else {
        this.$refs['file-upload-multiple-file'] && this.$refs['file-upload-multiple-file'].clearFiles()
      }
    },
    multipleFileConstructorData(fileList) {
      const multipleFileAddList = [] // 新增的图片.
      multipleFileAddList.push(fileList[fileList.length - 1])

      // 用于上传的队列
      this.multipleFileList = [...multipleFileAddList]
      // 开始载入上传队列
      this.multipleFileHttpRequestHandle()
    },
    // 删除前回调
    multipleFileBeforeRemoveHandle(file, fileList) {
      const { disabled } = this
      const items = fileList.filter(item => item.uid === file.uid)

      if (items.length === 0 || disabled) {
        // console.log('删除失败')
        return false
      }
      // console.log('multipleFileBeforeRemoveHandle')
    },
    // 删除回调
    multipleFileRemoveHandle(file, fileList) {
      const resourcesList = fileList.filter(item => item.uid !== file.uid)
      this.resourcesList = resourcesList

      this.$message({
        message: this.$t('prompt.success'),
        type: 'success',
        duration: 2000
      })
      this.formDataMerge()

      console.log('multipleFileRemoveHandle')
    },
    // 预览
    multipleFilePreviewHandle(file) {
      window.open(file.url, '_blank')
    }
  }
}
