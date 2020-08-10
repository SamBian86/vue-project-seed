import request from '@/utils/request'
import { exportFile } from '@/utils'

// 违章检查管理

// 导出excel
// GET
// /regulations/check/export
export function exportRegulationsCheck(params = {}) {
  exportFile(`/regulations/check/export`, params)
}

// 分页
// GET
// /regulations/check/page
export function getRegulationsCheckPageList(params = {}) {
  return request({
    url: `/regulations/check/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /regulations/check/{id}
export function getRegulationsCheckById(params = {}) {
  const { id } = params
  return request({
    url: `/regulations/check/${id}`,
    method: 'get'
  })
}
