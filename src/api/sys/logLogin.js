import request from '@/utils/request'
import { exportFile } from '@/utils'

// 登录日志

// 导出
// GET
// /sys/log/login/export
export function exportLogLogin(params = {}) {
  exportFile(`/sys/log/login/export`, params)
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
