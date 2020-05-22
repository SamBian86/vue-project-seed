import { uploadOssFile } from '@/api/oss/oss'
export default {
  data() {
    return {
      // 上传成功的本地文件list
      multipleImageList: [],
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
    multipleImageUploadInit() {
      console.log('multipleImageUploadInit')
      const { propName } = this.config
      const { pageData } = this
      this.$refs['file-upload-multiple-image'] && this.$refs['file-upload-multiple-image'].clearFiles()
      if (pageData[propName] && pageData[propName].length !== 0) {
        this.resourcesList = [...pageData[propName]]
      } else {
        this.resourcesList = []
      }
      this.uploading = false
      this.multipleImageList = []
      this.uploadQueue = []
    },
    // 覆盖默认提交行为
    multipleImageHttpRequestHandle() {
      const { multipleImageList } = this

      // 锁定为上传状态，保存需要上传的队列
      this.uploading = true
      this.uploadQueue = multipleImageList

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

          this.multipleImageList = []
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
    multipleImageChangeHandle(file, fileList) {
      const checkType = this.beforeUploadHandle(fileList)

      if (checkType) {
        this.multipleImageConstructorData(fileList)
      } else {
        this.$refs['file-upload-multiple-image'] && this.$refs['file-upload-multiple-image'].clearFiles()
      }
    },
    multipleImageConstructorData(fileList) {
      const multipleImageAddList = [] // 新增的图片.
      multipleImageAddList.push(fileList[fileList.length - 1])

      // 用于上传的队列
      this.multipleImageList = [...multipleImageAddList]
      // 开始载入上传队列
      this.multipleImageHttpRequestHandle()
    },
    // 删除前回调
    multipleImageBeforeRemoveHandle(file, fileList) {
      const items = fileList.filter(item => item.uid === file.uid)

      if (items.length === 0) {
        // console.log('删除失败')
        return false
      }
      // console.log('multipleImageBeforeRemoveHandle')
    },
    // 删除回调
    multipleImageRemoveHandle(file, fileList) {
      const resourcesList = fileList.filter(item => item.uid !== file.uid)
      this.resourcesList = resourcesList

      this.$message({
        message: this.$t('prompt.success'),
        type: 'success',
        duration: 2000
      })
      this.formDataMerge()

      console.log('multipleImageRemoveHandle')
    },
    // 预览
    multipleImagePreviewHandle(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
