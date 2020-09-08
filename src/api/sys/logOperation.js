import request from '@/utils/request'

// 操作日志

// 导出
// GET
// /sys/log/operation/export
export function exportLogOperation(params = {}) {
  return request({
    url: `/sys/log/operation/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /sys/log/operation/page
export function getLogOperationList(params = {}) {
  return request({
    url: `/sys/log/operation/page`,
    method: 'get',
    params
  })
}
