import request from '@/utils/request'
import { exportFile } from '@/utils'

// 就寝检查管理

// 导出excel
// GET
// /bedtime/check/export
export function exportBedtimeCheck(params = {}) {
  exportFile(`/bedtime/check/export`, params)
}

// 分页
// GET
// /bedtime/check/page
export function getBedtimeCheckPageList(params = {}) {
  return request({
    url: `/bedtime/check/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /bedtime/check/{id}
export function getBedtimeCheckById(params = {}) {
  const { id } = params
  return request({
    url: `/bedtime/check/${id}`,
    method: 'get'
  })
}
