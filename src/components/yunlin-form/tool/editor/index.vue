<template>
  <div class="editor-box">
    <div ref="editor" class="editor-container"></div>
    <editor-upload @successHandle="successHandle"></editor-upload>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import editorUpload from './upload'
import E from 'wangeditor'
export default {
  name: 'ToolEditor',
  components: { editorUpload },
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          propName: '', // 初始化用于显示的键名 页面数据键名
          mergeData: { target: '' }, // 对应页面的数据的键名
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
      editor: null,
      editorContent: '',
      componentNames: ['editor']
    }
  },
  computed: {},
  watch: {
    // 用于检查表单赋值时对应数据修改
    pageData(newVal, oldVal) {
      const { propName } = this.config
      const newData = newVal[propName] || ''
      const oldData = oldVal[propName] || ''
      // 检查prop_data数据是否变动
      if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        this.init()
      }
    }
  },
  activated() {
    // console.log('editor activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取editor组件数据')
    })
  },
  created() {
    // this.init()
  },
  mounted() {
    // console.log('editor mounted')
    this.init()
  },
  methods: {
    init() {
      const { editor } = this
      if (!editor) {
        let _editor = null
        _editor = new E(this.$refs.editor)
        _editor.customConfig.onchange = html => {
          const { mergeData } = this.config
          const newData = {}
          newData[mergeData.target || 'content'] = html
          this.editorContent = html
          this.$formDataMerge(newData)
        }
        _editor.create()
        this.editor = _editor
      }
      setTimeout(() => {
        this.initHtml()
      }, 100)
    },
    initHtml() {
      const { editor } = this
      const { propName } = this.config
      const { pageData } = this
      const editorContent = pageData[propName] || ''
      this.editorContent = editorContent
      editor.txt.html(editorContent)
    },
    successHandle(item) {
      const { editor, editorContent } = this
      const { mergeData } = this.config
      const newData = {}
      const _editorContent = `${editorContent}<img src='${item.url}' />`
      this.editorContent = _editorContent
      newData[mergeData.target || 'content'] = _editorContent
      editor.txt.append(`<img src='${item.url}' />`)
      this.$formDataMerge(newData)
    }
  }
}
</script>
<style lang="scss">
.editor-box {
  position: relative;
  z-index: 999;
}

.editor-container .w-e-toolbar {
  flex-wrap: wrap !important;
}
</style>
