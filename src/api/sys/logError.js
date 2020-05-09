import request from '@/utils/request'
import { exportFile } from '@/utils'

// 异常日志

// 导出
// GET
// /sys/log/error/export
export function exportLogError(params = {}) {
  exportFile(`/sys/log/error/export`, params)
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
