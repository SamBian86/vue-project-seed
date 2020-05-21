import request from '@/utils/request'

// 项目管理

// 保存
// POST
// /engineering/project
export function createEngineeringProject(data = {}) {
  return request({
    url: `/engineering/project`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/project
export function editEngineeringProject(data = {}) {
  return request({
    url: `/engineering/project`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/project
export function deleteEngineeringProject(data = []) {
  return request({
    url: `/engineering/project`,
    method: 'delete',
    data
  })
}

// 列表
// GET
// /engineering/project/list
export function getEngineeringProjectList() {
  return request({
    url: `/engineering/project/list`,
    method: 'get'
  })
}

// 分页,部门权限过滤
// GET
// /engineering/project/page
export function getEngineeringProjectPageList(params = {}) {
  return request({
    url: `/engineering/project/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/project/{id}
export function getEngineeringProjectById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/project/${id}`,
    method: 'get'
  })
}
