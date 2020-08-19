import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '../store'
import { getToken, getLanguage, getProjectId, getSystemType } from '@/utils/cookie'

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

    const transformUploadRequest = [
      function(data, headers) {
        headers = { 'content-type': 'multipart/form-data' }
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

    if (store.getters.app_projectId) {
      config.headers['project_id'] = getProjectId()
    }

    if (config.dataType === 'formData') {
      config.transformRequest = transformRequest
    }

    if (config.dataType === 'uploadData') {
      config.transformRequest = transformUploadRequest
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
    const routerName = getSystemType() === 'platform' ? 'platform' : 'login'
    if (code === 0) {
      return data
    } else if (response.data instanceof Blob) {
      const filename = decodeURI(response['headers']['content-disposition'].toLowerCase().split('filename=')[1])
      const reader = new FileReader()
      reader.onload = function(e) {
        const url = e.target.result
        // 转换完成，创建一个a标签用于下载
        const filelink = document.createElement('a')
        filelink.download = filename
        filelink.href = url
        document.body.appendChild(filelink)
        filelink.click()
        // 释放url
        window.URL.revokeObjectURL(url)
        document.body.removeChild(filelink)
      }
      reader.readAsDataURL(response.data) // 转换为base64
      return response.data
    } else {
      // 直接在此处处理 token过期
      if (code === 401 || code === 10001) {
        Message({
          message: msg,
          type: 'error',
          duration: 2000
        })
        store.commit('app/logout')
        router.replace({ name: routerName })
      } else {
        // 调用方在页面处理
        if (code === 10004 || code === 10007 || code === 10008 || code === 10018 || code === 100006025) {
          return Promise.reject(msg)
        }

        // 文件导入处理
        if (code === 10023) {
          return Promise.reject(data)
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
