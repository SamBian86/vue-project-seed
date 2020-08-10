import request from '@/utils/request'

// 企业管理

// 保存
// POST
// /sys/tenant
export function createTenant(data = {}) {
  return request({
    url: `/sys/tenant`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/tenant
export function editTenant(data = {}) {
  return request({
    url: `/sys/tenant`,
    method: 'put',
    data
  })
}

// 分页
// GET
// /sys/tenant/page
export function getTenantPageList(params = {}) {
  return request({
    url: `/sys/tenant/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/tenant/{id}
export function getTenantById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/tenant/${id}`,
    method: 'get'
  })
}

// 修改状态
// PUT
// /sys/tenant/{id}/status/{status}
export function setTenantStatus(params = {}) {
  const { id, status } = params
  return request({
    url: `/sys/tenant/${id}/status/${status}`,
    method: 'put',
    params
  })
}
