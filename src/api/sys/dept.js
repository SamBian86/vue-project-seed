import request from '@/utils/request'

// 部门管理

// 保存
// POST
// /sys/dept
export function createSysDept(data = {}) {
  return request({
    url: `/sys/dept`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/dept
export function editSysDept(data = {}) {
  return request({
    url: `/sys/dept`,
    method: 'put',
    data
  })
}

// 列表
// GET
// /sys/dept/list
export function getSysDeptListAll(params = {}) {
  return request({
    url: `/sys/dept/list`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/dept/{id}
export function getSysDeptById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/dept/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /sys/dept/{id}
export function deleteSysDept(data = {}) {
  const { id } = data
  return request({
    url: `/sys/dept/${id}`,
    method: 'delete'
  })
}
