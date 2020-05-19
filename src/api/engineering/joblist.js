import request from '@/utils/request'

// 岗位管理

// 保存
// POST
// /engineering/joblist
export function createEngineeringJoblist(data = {}) {
  return request({
    url: `/engineering/joblist`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/joblist
export function editEngineeringJoblist(data = {}) {
  return request({
    url: `/engineering/joblist`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/joblist
export function deleteEngineeringJoblist(data = []) {
  return request({
    url: `/engineering/joblist`,
    method: 'delete',
    data
  })
}

// 列表
// GET
// /engineering/joblist/list
export function getEngineeringJoblist(params = {}) {
  return request({
    url: `/engineering/joblist/list`,
    method: 'get',
    params
  })
}

// 分页，子部门权限
// GET
// /engineering/joblist/page
export function getEngineeringJoblistPageList(params = {}) {
  return request({
    url: `/engineering/joblist/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/joblist/{id}
export function getEngineeringJoblistById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/joblist/${id}`,
    method: 'get'
  })
}
