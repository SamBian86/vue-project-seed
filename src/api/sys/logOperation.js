import request from '@/utils/request'
import { exportFile } from '@/utils'

// 操作日志

// 导出
// GET
// /sys/log/operation/export
export function exportLogOperation(params = {}) {
  exportFile(`/sys/log/operation/export`, params)
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
