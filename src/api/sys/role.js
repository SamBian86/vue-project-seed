import request from '@/utils/request'

// 角色管理

// 保存
// POST
// /sys/role
export function createSysRole(data = {}) {
  return request({
    url: `/sys/role`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/role
export function editSysRole(data = {}) {
  return request({
    url: `/sys/role`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /sys/role
export function deleteSysRole(data = []) {
  return request({
    url: `/sys/role`,
    method: 'delete',
    data
  })
}

// 列表
// GET
// /sys/role/list
export function getSysRoleList() {
  return request({
    url: `/sys/role/list`,
    method: 'get'
  })
}

// 分页
// GET
// /sys/role/page
export function getSysRolePageList(params = {}) {
  return request({
    url: `/sys/role/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/role/{id}
export function getSysRoleById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}
