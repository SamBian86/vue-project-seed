/* eslint-disable no-undef */
import { getToken, getProjectId } from '@/utils/cookie'

export function getProjectName() {
  return `${process.env.VUE_APP_PROJECT_NAME}_`
}

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

/**
 * 获取svg图标(id)列表
 */
export function getIconList() {
  const res = []
  document.querySelectorAll('svg symbol').forEach(item => {
    res.push({ name: item.id })
  })
  return res
}

export function getResourceSelector() {
  const rescourse = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'DELETE', value: 'DELETE' }
  ]
  return rescourse
}

// 对象转字符串
export function stringify(obj) {
  return JSON.stringify(obj)
}

// 字符串转对象
export function parse(string) {
  return JSON.parse(string)
}

// 检查窗口大小
export function windowResizeListen() {
  return document.documentElement['clientWidth'] <= 992 || false
}

// debounce 防抖实现
export const debounce = (fn, time) => {
  let timer = null
  const content = this
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(content, args)
    }, time)
  }
}

// 在线设计
export const openNewTab = (url, params = {}) => {
  params._t = new Date().getTime()
  params.token = getToken()
  params.project_id = getProjectId()
  const _params = '?'.concat(
    Object.entries(params)
      .map(item => item.join('='))
      .join('&')
  )
  window.open(process.env.VUE_APP_API_URL + url + _params, '_blank')
}

// 生成url
export const generateUrl = (url, params = {}) => {
  params._t = new Date().getTime()
  params.token = getToken()
  params.project_id = getProjectId()
  const _params = '?'.concat(
    Object.entries(params)
      .map(item => item.join('='))
      .join('&')
  )
  return process.env.VUE_APP_API_URL + url + _params
}

// 树形数据转换 用于行政区域
export function treeDataTranslate(data, id = 'id', pid = 'pid') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (!temp[data[k][pid]] || data[k][id] === data[k][pid]) {
      res.push(data[k])
      continue
    }
    if (!temp[data[k][pid]]['children']) {
      temp[data[k][pid]]['children'] = []
    }
    temp[data[k][pid]]['children'].push(data[k])
    data[k]['_level'] = (temp[data[k][pid]]._level || 0) + 1
  }
  return res
}

// 树形数据处理
export function treeMergeData(trees, data) {
  const newTrees = []
  trees.map(item => {
    item = { ...item, ...data }
    if (item.children && item.children.length !== 0) {
      item.children = treeMergeData(item.children, { ...data })
    }
    newTrees.push(item)
  })
  return newTrees
}
