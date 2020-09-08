<template>
  <div id="container" :style="containerStyle" />
</template>
<script>
import commonMixin from '@/mixins/common-mixin'
import pageMixin from '@/mixins/page-mixin'
import formMixin from '@/mixins/form-mixin'
import { initAMapApiLoader } from '@/utils/lib/injected-amap-api-instance'
export default {
  mixins: [commonMixin, pageMixin, formMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
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
    },
    locations: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    address: {
      type: String,
      required: false,
      default: ''
    },
    width: {
      type: String,
      required: false,
      default: '480px'
    },
    height: {
      type: String,
      required: false,
      default: '310px'
    }
  },
  data() {
    return {
      map: null,
      marker: null,
      geolocation: null,
      geocoder: null,
      autoComplete: null,
      // 高德地图key
      key: '4938b87a693b9a714a6e1c4fe08dbf38'
    }
  },
  computed: {
    containerStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    // 用于检查表单赋值时对应数据修改
    pageData(newVal, oldVal) {
      const newData1 = newVal['lng']
      const oldData1 = oldVal['lng']
      const newData2 = newVal['lat']
      const oldData2 = oldVal['lat']
      // 检查prop_data数据是否变动
      if (JSON.stringify(newData1) !== JSON.stringify(oldData1) || JSON.stringify(newData2) !== JSON.stringify(oldData2)) {
        this.$set(this.locations, 'lng', newData1)
        this.$set(this.locations, 'lat', newData2)
        this.init()
      }
    }
  },
  activated() {
    this.init()
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.pageData['lat'] && this.pageData['lng']) {
        this.$set(this.locations, 'lng', this.pageData['lng'])
        this.$set(this.locations, 'lat', this.pageData['lat'])
      }
      if (window.AMap && window.AMapUI && this.map) {
        this.initMap()
        // 未载入高德地图API，则先载入API再初始化
      } else {
        // 载入高德地图和UI组件
        initAMapApiLoader({ key: this.key }).then(() => {
          setTimeout(() => {
            this.initMap()
          }, 100)
        })
      }
    },
    // 初始化地图
    initMap() {
      const { lng, lat } = this.locations
      this.map = new window.AMap.Map('container', {
        resizeEnable: true,
        zoom: 11,
        center: lng && lat ? [lng, lat] : [116.405467, 39.907761]
        // 高德地图自定义style 不用可以去掉
        // mapStyle: 'amap://styles/ef58c0eb692d34c3616db1163054a205'
      })
      this.map.plugin(['AMap.ToolBar'], () => {
        this.map.addControl(new window.AMap.ToolBar())
      })

      this.map.plugin('AMap.Autocomplete', () => {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        var autoComplete = new window.AMap.Autocomplete(autoOptions)
        this.autoComplete = autoComplete
      })

      window.AMap.event.addListener(this.map, 'click', (res) => {
        this.$emit('markerDragend', {
          lng: res.lnglat.lng,
          lat: res.lnglat.lat
        })
      })

      this.addMarker()
      this.updateMap()
    },
    updateMap() {
      if (this.locations && this.locations.lng) {
        this.getAddressByLocation([this.locations.lng, this.locations.lat])
      } else if (!this.address) {
        // 此处需要升级成https才会成功
        // this.getGeolocation()
      } else {
        this.getLocationByAddress(this.address)
      }
    },
    // ip定位 浏览器定位
    getGeolocation() {
      if (this.geolocation == null) {
        this.map.plugin('AMap.Geolocation', () => {
          this.geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
        })
      }

      this.geolocation.getCurrentPosition((status, result) => {
        if (result.type === 'complete') {
          this.$emit('geolocation', result)
        }
      })
    },
    // 地址转经纬度
    getLocationByAddress(address) {
      if (this.geocoder == null) {
        this.map.plugin('AMap.Geocoder', () => {
          this.geocoder = new window.AMap.Geocoder()
          this.address2Location(address)
        })
      } else {
        this.address2Location(address)
      }
    },
    address2Location(address) {
      this.geocoder.getLocation(address, (status, result) => {
        if (result.info === 'OK') {
          this.map.setCenter([result.geocodes[0].location.lng, result.geocodes[0].location.lat])
          this.marker.setPosition([result.geocodes[0].location.lng, result.geocodes[0].location.lat])
          this.$emit('addressToLocation', result)
        }
      })
    },
    // 经纬度转地址
    getAddressByLocation(location) {
      if (this.geocoder == null) {
        this.map.plugin('AMap.Geocoder', () => {
          this.geocoder = new window.AMap.Geocoder()
        })
      }
      return new Promise((reslove, reject) => {
        this.geocoder.getAddress(location, (status, result) => {
          if (result.info === 'OK') {
            this.map.setCenter([location[0], location[1]])
            this.marker.setPosition([location[0], location[1]])
            reslove(result)
          }
          reject()
        })
      })
    },
    // marker
    addMarker() {
      const { lng, lat } = this.locations
      if (this.marker != null) {
        return
      }
      this.map.plugin('AMap.Marker', () => {
        this.marker = new window.AMap.Marker({
          // icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: lng && lat ? [lng, lat] : [116.405467, 39.907761],
          draggable: true
        })
        this.marker.setMap(this.map)
        // marker拖拽完成
        window.AMap.event.addListener(this.marker, 'dragend', (res) => {
          this.$emit('markerDragend', {
            lng: res.lnglat.lng,
            lat: res.lnglat.lat
          })
        })
      })
    },
    searchAddress(keyword) {
      this.autoComplete.search(keyword, (status, result) => {
        // 搜索成功时，result即是对应的匹配数据
        this.$emit('autoComplete', {
          tips: result.tips
        })
      })
    }
  }
}
</script>
