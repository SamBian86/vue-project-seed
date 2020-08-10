import request from '@/utils/request'

// 角色管理

// 保存
// POST
// /sys/tenant/role
export function createTenantRole(data = {}) {
  return request({
    url: `/sys/tenant/role`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/tenant/role
export function editTenantRole(data = {}) {
  return request({
    url: `/sys/tenant/role`,
    method: 'put',
    data
  })
}

// 列表
// GET
// /sys/tenant/role/list
export function getTenantRoleList(params = {}) {
  return request({
    url: `/sys/tenant/role/list`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /sys/tenant/role/page
export function getTenantRolePageList(params = {}) {
  return request({
    url: `/sys/tenant/role/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/tenant/role/{id}
export function getTenantRoleById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/tenant/role/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /sys/tenant/role/{id}
export function deleteTenantRole(params = {}) {
  const { id } = params
  return request({
    url: `/sys/tenant/role/${id}`,
    method: 'delete',
    params
  })
}
