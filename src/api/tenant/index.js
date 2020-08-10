import request from '@/utils/request'

// 企业管理

// 信息
// GET
// /tenant
export function getTenantInfo() {
  return request({
    url: `/tenant`,
    method: 'get'
  })
}

// 修改
// PUT
// /tenant
export function editTenantInfo(data = {}) {
  return request({
    url: `/tenant`,
    method: 'put',
    data
  })
}

// 列表
// GET
// /tenant/list
export function getTenantList(params = {}) {
  return request({
    url: `/tenant/list`,
    method: 'get',
    params
  })
}
