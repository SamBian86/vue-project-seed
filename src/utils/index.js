/* eslint-disable no-undef */
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
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(content, arguments)
    }, time)
  }
}

// 自动生成查询字符
export const generateOrderField = field => {
  const m = field.match(/([A-Z])/g)
  let _field
  if (m !== null) {
    m.map(item => {
      _field = _field.replace(item, '_' + item.toLowerCase())
    })
  }
  return m === null ? field : _field
}
