import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '../store'
import { getToken, getLanguage, getProjectId, getSystemType } from '@/utils/cookie'
// import requestMessage from '@/utils/requestMessage'

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
    // const message = requestMessage.get(code)
    // 需要重新登录的报错
    const loginAgain = [100005001, 100005002, 401]

    if (code !== 0) {
      if (response.data instanceof Blob) {
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
      }
      // 需要重新登录的报错
      if (loginAgain.includes(code)) {
        Message({
          message: msg,
          type: 'error',
          duration: 2000
        })
        store.commit('app/logout')
        router.replace({ name: routerName })
        return false
      }

      if (code === 10023) {
        return Promise.reject(response.data.data)
      }
      return Promise.reject(msg)
    } else {
      return data
    }
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

export default service
