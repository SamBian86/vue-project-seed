import request from '@/utils/request'

// 异常日志

// 导出
// GET
// /sys/log/error/export
export function exportLogError(params = {}) {
  return request({
    url: `/sys/log/error/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /sys/log/error/page
export function getLogErrorList(params = {}) {
  return request({
    url: `/sys/log/error/page`,
    method: 'get',
    params
  })
}
