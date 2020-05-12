<template>
  <div>
    <div ref="editor" class="editor-container"></div>
  </div>
</template>

<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import E from 'wangeditor'
export default {
  name: 'ToolEditor',
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          propName: '', // 初始化用于显示的键名 页面数据键名
          mergeData: { target: '' } // 对应页面的数据的键名
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
  activated() {
    // console.log('popover-icon activated')
    // 检查是否需要重新获取数据
    this.$pageCheckUpdateWhenActivated(() => {
      this.init()
      // console.log('重新获取popover-icon组件数据')
    })
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.onchange = html => {
        const { mergeData } = this.config
        const newData = {}
        newData[mergeData.target || 'content'] = html
        this.editorContent = html
        this.$formDataMerge(newData)
      }
      this.editor.create()
      this.initHtml()
    },
    initHtml() {
      const { propName } = this.config
      const { pageData } = this
      const editorContent = pageData[propName] || ''

      this.editorContent = editorContent
      this.editor.txt.html(editorContent)
    }
  }
}
</script>
<style lang="scss">
.editor-container .w-e-toolbar {
  flex-wrap: wrap !important;
}
</style>
