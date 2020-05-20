import { uploadOssFile } from '@/api/oss/oss'
export default {
  data() {
    return {
      // 上传成功的本地文件list
      singleList: [],
      // 上传文件队列
      uploadQueue: [],
      // 本地与远程对应仓库
      uploadStore: {},
      // 预览操作
      dialogImageUrl: '',
      dialogVisible: false
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
    singleUploadInit() {
      this.$refs['file-upload-single'] && this.$refs['file-upload-single'].clearFiles()
      this.uploading = false
      this.resourcesList = []
      this.singleList = []
      this.uploadQueue = []
      this.uploadStore = []
    },
    // 覆盖默认提交行为
    singleHttpRequestHandle() {
      const { singleList } = this
      const uploadQueue = singleList.filter(item => !item.success)
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
          const { singleList } = this
          singleList.forEach(item => {
            if (item.uid === file.uid) {
              item.success = true
              // console.log(file.uid + '上传成功')
            }
          })

          this.uploadStore['file_' + file.uid] = response
          this.singleList = singleList
          this.resourcesList = [{ ...response }]
          this.uploadQueue = uploadQueue

          this.formDataMerge()
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
    singleChangeHandle(file, fileList) {
      const checkType = this.beforeUploadHandle(fileList)

      if (checkType) {
        this.singleConstructorData(fileList)
      } else {
        this.$refs['file-upload-single'] && this.$refs['file-upload-single'].clearFiles()
      }
    },
    singleConstructorData(fileList) {
      const { singleList } = this
      // 过滤出已有的文件uids，包含上传成功和未上传的文件
      const singleUids = singleList.map(item => item.uid)
      // 新添加的图片uid
      const addUids = fileList.map(item => item.uid).filter(item => !singleUids.includes(item))

      const singleAddList = [] // 新增的图片
      fileList.map(item => {
        if (addUids.includes(item.uid)) {
          item.success = false
          singleAddList.push(item)
        }
      })
      this.singleList = [...singleAddList]
      // 开始载入上传队列
      this.singleHttpRequestHandle()
    },
    // 删除前回调
    singleBeforeRemoveHandle(file, fileList) {
      const { singleList } = this
      const items = singleList.filter(
        item => (item.uid === file.uid && item.success) || (item.uid === file.uid && item.status === 'success')
      )
      if (items.length === 0) {
        // console.log('删除失败')
        return false
      }
      // console.log('singleBeforeRemoveHandle')
    },
    // 删除回调
    singleRemoveHandle(file, fileList) {
      this.singleUploadInit()
      this.formDataMerge()
    },
    // 预览功能
    singlePreviewHandle(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
