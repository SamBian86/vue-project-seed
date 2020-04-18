import request from '@/utils/request'

// POST
// /sys/menu
// 保存
export function createMenu(data = {}) {
  return request({
    url: '/sys/menu',
    method: 'post',
    data
  })
}

// PUT
// /sys/menu
// 修改
export function editMenu(data = {}) {
  return request({
    url: '/sys/menu',
    method: 'put',
    data
  })
}

// GET
// /sys/menu/{id}
// 信息
export function getMenuById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/menu/${id}`,
    method: 'get',
    params
  })
}

// DELETE
// /sys/menu/{id}
// 删除
export function deleteMenu(params = {}) {
  const { id } = params
  return request({
    url: `/sys/menu/${id}`,
    method: 'delete'
  })
}

// GET
// /sys/menu/list
// 列表
export function getMenuList(params = {}) {
  return request({
    url: `/sys/menu/list`,
    method: 'get',
    params
  })
}

// GET
// /sys/menu/nav
// 导航
export function getMenuNavList(params = {}) {
  return request({
    url: `/sys/menu/nav`,
    method: 'get',
    params
  })
}

// GET
// /sys/menu/permissions
// 权限标识
export function getMenuPermissionsList(params = {}) {
  return request({
    url: `/sys/menu/permissions`,
    method: 'get',
    params
  })
}

// GET
// /sys/menu/select
// 角色菜单权限
export function getMenuSelectList(params = {}) {
  return request({
    url: `/sys/menu/select`,
    method: 'get',
    params
  })
}
