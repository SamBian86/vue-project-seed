import YunlinCommon from './common'

const common = {}
common.install = function(Vue, options = {}) {
  Object.keys(YunlinCommon).map(component => {
    Vue.component(YunlinCommon[component]['name'], YunlinCommon[component])
  })
}
export default common
