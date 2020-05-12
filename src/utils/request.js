import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '../store'
import { getToken, getLanguage } from '@/utils/cookie'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // api 的 base_url
  timeout: 1000 * 180, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    const transformRequest = [
      function(data, headers) {
        headers = { 'content-type': 'application/x-www-form-urlencoded' }
        const formData = new FormData()
        Object.keys(data).map(item => {
          formData.set(item, data[item])
        })
        return formData
      }
    ]

    if (store.getters.app_token) {
      config.headers['Accept-Language'] = getLanguage()
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    if (config.dataType === 'formData') {
      config.transformRequest = transformRequest
    }

    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() }
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const { code, data, msg } = response.data

    if (code === 0) {
      return data
    } else {
      // 直接在此处处理 token过期
      if (code === 401 || code === 10001) {
        Message({
          message: msg,
          type: 'error',
          duration: 2000
        })
        router.replace({ name: 'login' })
      } else {
        // 调用方在页面处理
        if (code === 10004 || code === 10007 || code === 10008 || code === 10018) {
          return Promise.reject(msg)
        }

        // 服务器内部错误
        if (code === 500) {
          return Promise.reject(msg)
        }
        return Promise.reject(msg)
      }
    }
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

export default service
