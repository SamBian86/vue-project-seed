export default {
  data() {
    return {
      // 上传成功的本地文件list
      dragList: [],
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
    dragUploadInit() {
      console.log('dragUploadInit')
      this.$refs['file-upload-drag'] && this.$refs['file-upload-drag'].clearFiles()
      this.uploading = false
      this.resourcesList = []
      this.dragList = []
      this.uploadQueue = []
      this.uploadStore = {}
    },
    // 覆盖默认提交行为
    dragHttpRequestHandle() {
      const { dragList } = this
      const uploadQueue = dragList.filter(item => !item.success)
      // 锁定为上传状态，保存需要上传的队列
      this.uploading = true
      this.uploadQueue = uploadQueue

      this.timer = setTimeout(() => {
        this.uploadRequest() // 开始进行上传
      }, 200)
    },
    // 文件上传
    uploadRequest() {
      const { uploadQueue, componentNames } = this
      const { requestParams } = this.config
      if (uploadQueue.length === 0) {
        this.uploading = false
        clearTimeout(this.timer)
        return false
      }
      const file = uploadQueue.shift()
      this.config
        .uploadRequest({
          file: file.raw,
          ...requestParams
        })
        .then(response => {
          const { dragList, resourcesList } = this
          resourcesList.push(response)
          dragList.forEach(item => {
            if (item.uid === file.uid) {
              item.success = true
              // console.log(file.uid + '上传成功')
            }
          })
          this.uploadStore['file_' + file.uid] = response
          this.dragList = dragList
          this.resourcesList = resourcesList
          this.uploadQueue = uploadQueue

          if (!this.$attrs.page_drawer_data.data) {
            this.$pageUpdateListAdd(Array.from(new Set([...componentNames, ...this.config.componentNames])))
          }

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
    // 拖拽文件检查
    dragChangeHandle(file, fileList) {
      const checkType = this.beforeUploadHandle(fileList)

      if (checkType) {
        this.dragConstructorData(fileList)
      } else {
        this.$refs['file-upload-drag'] && this.$refs['file-upload-drag'].clearFiles()
      }
    },
    dragConstructorData(fileList) {
      const { dragList } = this
      // 过滤出已有的文件uids，包含上传成功和未上传的文件
      const dragUids = dragList.map(item => item.uid)
      // 新添加的图片uid
      const addUids = fileList.map(item => item.uid).filter(item => !dragUids.includes(item))

      const dragAddList = [] // 新增的图片
      fileList.map(item => {
        if (addUids.includes(item.uid)) {
          item.success = false
          dragAddList.push(item)
        }
      })
      this.dragList = [...dragList, ...dragAddList]
      // 开始载入上传队列
      this.dragHttpRequestHandle()
    },
    // 删除前回调
    dragBeforeRemoveHandle(file, fileList) {
      const { dragList, disabled } = this
      const items = dragList.filter(item => item.uid === file.uid && item.success)

      if (items.length === 0 || disabled) {
        // console.log('删除失败')
        return false
      }
      // console.log('dragBeforeRemoveHandle')
    },
    // 删除回调
    dragRemoveHandle(file, fileList) {
      let { dragList, resourcesList } = this
      const { uploadStore, componentNames } = this
      const resource = uploadStore['file_' + file.uid]

      if (resource) {
        this.config
          .deleteRequest([resource.id])
          .then(response => {
            delete uploadStore['file_' + file.uid]
            dragList = dragList.filter(item => item.uid !== file.uid)
            resourcesList = resourcesList.filter(item => item.id !== resource.id)

            this.uploadStore = uploadStore
            this.dragList = dragList
            this.resourcesList = resourcesList

            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 2000
            })
            if (!this.$attrs.page_drawer_data.data) {
              this.$pageUpdateListAdd(Array.from(new Set([...componentNames, ...this.config.componentNames])))
            }
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
      console.log('dragRemoveHandle')
    }
  }
}
