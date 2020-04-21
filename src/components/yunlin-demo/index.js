import YunlinDemo from './src/yunlin-demo'
YunlinDemo.install = function(Vue, options = {}) {
  Vue.component(YunlinDemo.name, YunlinDemo)
}
export default YunlinDemo
