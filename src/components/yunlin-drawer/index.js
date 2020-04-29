import YunlinDrawer from './src/yunlin-drawer'

YunlinDrawer.install = function(Vue, options = {}) {
  Vue.component(YunlinDrawer.name, YunlinDrawer)
}
export default YunlinDrawer
