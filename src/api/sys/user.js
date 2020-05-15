import request from '@/utils/request'
import { exportFile } from '@/utils'

// POST
// /sys/user
// 保存
export function createUser(data = {}) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// PUT
// /sys/user
// 修改
export function editUser(data = {}) {
  return request({
    url: '/sys/user',
    method: 'put',
    data
  })
}

// DELETE
// /sys/user
// 删除
export function deleteUser(data = {}) {
  return request({
    url: '/sys/user',
    method: 'delete',
    data
  })
}

// GET
// /sys/user/{id}
// 信息
export function getUserById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

// GET
// /sys/user/export
// 导出
export function exportUser(params = {}) {
  exportFile(`/sys/user/export`, params)
}

// GET
// /sys/user/info
// 登录用户信息
export function getUserInfo(params = {}) {
  return request({
    url: `/sys/user/info`,
    method: 'get',
    params
  })
}

// GET
// /sys/user/page
// 分页
export function getUserAll(params = {}) {
  return request({
    url: `/sys/user/page`,
    method: 'get',
    params
  })
}

// PUT
// /sys/user/password
// 修改密码
export function modifyUserPassword(data = {}) {
  return request({
    url: '/sys/user/password',
    method: 'put',
    data
  })
}
