import request from '@/utils/request'

// 报修记录

// 导出
// GET
// /maintenance/application/export
export function exportMaintenanceApplication(params = {}) {
  return request({
    url: `/maintenance/application/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /maintenance/application/page
export function getMaintenanceApplicationPageList(params = {}) {
  return request({
    url: `/maintenance/application/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /maintenance/application/{id}
export function getMaintenanceApplicationById(params = {}) {
  const { id } = params
  return request({
    url: `/maintenance/application/${id}`,
    method: 'get'
  })
}
