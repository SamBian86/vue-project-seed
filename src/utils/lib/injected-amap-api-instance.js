import AMapAPILoader from './lazy-amap-api-loader'
import Vue from 'vue'
let lazyAMapApiLoaderInstance = null
export const initAMapApiLoader = (config) => {
  return new Promise((resolve, reject) => {
    if (Vue.prototype.$isServer) return resolve()
    // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
    if (lazyAMapApiLoaderInstance) return resolve()
    if (!lazyAMapApiLoaderInstance) {
      lazyAMapApiLoaderInstance = new AMapAPILoader(config)
    }
    lazyAMapApiLoaderInstance.load().then(() => {
      return resolve()
    })
  })
}
export { lazyAMapApiLoaderInstance }
