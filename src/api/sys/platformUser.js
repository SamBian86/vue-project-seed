import request from '@/utils/request'

// 账号管理

// 保存
// POST
// /sys/platform/user
export function createPlatformUser(data = {}) {
  return request({
    url: `/sys/platform/user`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/platform/user
export function editPlatformUser(data = {}) {
  return request({
    url: `/sys/platform/user`,
    method: 'put',
    data
  })
}

// 分页
// GET
// /sys/platform/user/page
export function getPlatformUserPageList(params = {}) {
  return request({
    url: `/sys/platform/user/page`,
    method: 'get',
    params
  })
}

// 进入企业后台
// POST
// /sys/platform/user/property/login/{tenantCode}
export function propertyLoginByTenantCode(params = {}) {
  const { tenantCode } = params
  return request({
    url: `/sys/platform/user/property/login/${tenantCode}`,
    method: 'post',
    params
  })
}

// 信息
// GET
// /sys/platform/user/{id}
export function getPlatformUserById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/platform/user/${id}`,
    method: 'get'
  })
}

// 修改状态
// PUT
// /sys/platform/user/{id}/status/{status}
export function setPlatformUserStatus(params = {}) {
  const { id, status } = params
  return request({
    url: `/sys/platform/user/${id}/status/${status}`,
    method: 'put',
    params
  })
}
