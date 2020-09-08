import request from '@/utils/request'

// 登录日志

// 导出
// GET
// /sys/log/login/export
export function exportLogLogin(params = {}) {
  return request({
    url: `/sys/log/login/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /sys/log/login/page
export function getLogLoginList(params = {}) {
  return request({
    url: `/sys/log/login/page`,
    method: 'get',
    params
  })
}
