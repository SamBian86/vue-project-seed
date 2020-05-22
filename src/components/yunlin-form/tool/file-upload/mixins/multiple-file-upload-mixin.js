import { uploadOssFile } from '@/api/oss/oss'
export default {
  data() {
    return {
      // 上传成功的本地文件list
      multipleFileList: [],
      // 上传文件队列
      uploadQueue: [],
      // 本地与远程对应仓库
      uploadStore: {}
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
      this.uploadStore = {}
    },
    // 覆盖默认提交行为
    multipleFileHttpRequestHandle() {
      const { multipleFileList } = this
      const uploadQueue = multipleFileList.filter(item => !item.success)
      // 锁定为上传状态，保存需要上传的队列
      this.uploading = true
      this.uploadQueue = uploadQueue

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
          const { multipleFileList, resourcesList } = this
          multipleFileList.forEach(item => {
            if (item.uid === file.uid) {
              item.success = true
              // console.log(file.uid + '上传成功')
            }
          })

          this.uploadStore['file_' + file.uid] = response
          this.multipleFileList = multipleFileList
          this.resourcesList = [...resourcesList, { ...response }]
          this.uploadQueue = uploadQueue

          this.formDataMerge()
          // console.log('远程文件列表---')
          // console.log(this.resourcesList)
          // console.log('本地剩余列表---')
          // console.log(this.uploadQueue)
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
      const { multipleFileList } = this
      // 过滤出已有的文件uids，包含上传成功和未上传的文件
      const multipleFileUids = multipleFileList.map(item => item.uid)
      // 新添加的图片uid
      const addUids = fileList.map(item => item.uid).filter(item => !multipleFileUids.includes(item))

      const multipleFileAddList = [] // 新增的图片
      fileList.map(item => {
        if (addUids.includes(item.uid)) {
          item.success = false
          multipleFileAddList.push(item)
        }
      })

      // 用于上传的队列
      this.multipleFileList = [...multipleFileAddList]
      // 开始载入上传队列
      this.multipleFileHttpRequestHandle()
    },
    // 删除前回调
    multipleFileBeforeRemoveHandle(file, fileList) {
      const { multipleFileList } = this
      const items = multipleFileList.filter(item => item.uid === file.uid)

      if (items.length === 0) {
        // console.log('删除失败')
        return false
      }
      // console.log('multipleFileBeforeRemoveHandle')
    },
    // 删除回调
    multipleFileRemoveHandle(file, fileList) {
      let { multipleFileList, resourcesList } = this
      const { uploadStore } = this
      const resource = uploadStore['file_' + file.uid]

      if (resource) {
        this.config
          .deleteRequest([resource.id])
          .then(response => {
            delete uploadStore['file_' + file.uid]
            multipleFileList = multipleFileList.filter(item => item.uid !== file.uid)
            resourcesList = resourcesList.filter(item => item.id !== resource.id)

            this.uploadStore = uploadStore
            this.multipleFileList = multipleFileList
            this.resourcesList = resourcesList

            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 2000
            })
            this.formDataMerge()
          })
          .catch(message => {
            this.$message({
              message,
              type: 'error',
              duration: 2000
            })
          })
      } else {
        console.log('删除的资源不存在')
      }
      console.log('multipleFileRemoveHandle')
    }
    // 预览
    // multipleFilePreviewHandle(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // }
  }
}
