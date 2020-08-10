import YunlinCommon from './common'
import YunlinChart from './chart'

const common = {}
common.install = function(Vue, options = {}) {
  Object.keys(YunlinCommon).map(component => {
    Vue.component(YunlinCommon[component]['name'], YunlinCommon[component])
  })
  Object.keys(YunlinChart).map(component => {
    Vue.component(YunlinChart[component]['name'], YunlinChart[component])
  })
}
export default common
