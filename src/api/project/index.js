import request from '@/utils/request'

// 物业项目管理

// 保存
// POST
// /project
export function createProject(data = {}) {
  return request({
    url: `/project`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /project
export function editProject(data = {}) {
  return request({
    url: `/project`,
    method: 'put',
    data
  })
}

// 列表
// GET
// /project/list
export function getProjectList(params = {}) {
  return request({
    url: `/project/list`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /project/page
export function getProjectPageList(params = {}) {
  return request({
    url: `/project/page`,
    method: 'get',
    params
  })
}

// 列表-用户权限
// GET
// /project/permission/list
export function getProjectPermissionList(params = {}) {
  return request({
    url: `/project/permission/list`,
    method: 'get',
    params
  })
}

// 学校列表-绑定项目
// GET
// /project/school/list
export function getProjectSchoolList(params = {}) {
  return request({
    url: `/project/school/list`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /project/{id}
export function getProjectById(params = {}) {
  const { id } = params
  return request({
    url: `/project/${id}`,
    method: 'get'
  })
}

// 修改状态
// PUT
// /project/{id}/status/{status}
export function setProjectStatus(params = {}) {
  const { id, status } = params
  return request({
    url: `/project/${id}/status/${status}`,
    method: 'put',
    params
  })
}
