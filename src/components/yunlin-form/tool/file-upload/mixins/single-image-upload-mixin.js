import { uploadOssFile } from '@/api/oss/oss'
export default {
  data() {
    return {
      // 上传成功的本地文件list
      singleImageList: [],
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
    singleImageUploadInit() {
      console.log('singleImageUploadInit')
      const { propName } = this.config
      const { pageData } = this
      this.$refs['file-upload-single-image'] && this.$refs['file-upload-single-image'].clearFiles()
      if (pageData[propName] === '' || pageData[propName] === undefined) {
        this.resourcesList = []
      } else {
        this.resourcesList = [
          {
            url: pageData[propName]
          }
        ]
      }
      this.uploading = false
      this.singleImageList = []
      this.uploadQueue = []
      this.uploadStore = {}
    },
    // 覆盖默认提交行为
    singleImageHttpRequestHandle() {
      const { singleImageList } = this
      const uploadQueue = singleImageList.filter(item => !item.success)
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
          const { singleImageList } = this
          singleImageList.forEach(item => {
            if (item.uid === file.uid) {
              item.success = true
              // console.log(file.uid + '上传成功')
            }
          })

          this.uploadStore['file_' + file.uid] = response
          this.singleImageList = singleImageList
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
    singleImageChangeHandle(file, fileList) {
      const checkType = this.beforeUploadHandle(fileList)

      if (checkType) {
        this.singleImageConstructorData(fileList)
      } else {
        this.$refs['file-upload-single-image'] && this.$refs['file-upload-single-image'].clearFiles()
      }
    },
    singleImageConstructorData(fileList) {
      const { singleImageList } = this
      // 过滤出已有的文件uids，包含上传成功和未上传的文件
      const singleImageUids = singleImageList.map(item => item.uid)
      // 新添加的图片uid
      const addUids = fileList.map(item => item.uid).filter(item => !singleImageUids.includes(item))

      const singleImageAddList = [] // 新增的图片
      fileList.map(item => {
        if (addUids.includes(item.uid)) {
          item.success = false
          singleImageAddList.push(item)
        }
      })
      this.singleImageList = [...singleImageAddList]
      // 开始载入上传队列
      this.singleImageHttpRequestHandle()
    },
    // 删除前回调
    singleImageBeforeRemoveHandle(file, fileList) {
      const { singleImageList, disabled } = this
      // const items = singleImageList.filter(
      //   item => (item.uid === file.uid && item.success) || (item.uid === file.uid && item.status === 'singleImageList')
      // )
      const items = singleImageList
      if ((fileList.length === 0 && items.length === 0) || disabled) {
        // console.log('删除失败')
        return false
      }
      // console.log('singleImageBeforeRemoveHandle')
    },
    // 删除回调
    singleImageRemoveHandle(file, fileList) {
      this.resourcesList = []
      this.formDataMerge()
    },
    // 预览功能
    singleImagePreviewHandle(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
