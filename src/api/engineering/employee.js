import request from '@/utils/request'

// 员工管理

// 保存
// POST
// /engineering/employee
export function createEngineeringEmployee(data = {}) {
  return request({
    url: `/engineering/employee`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/employee
export function editEngineeringEmployee(data = {}) {
  return request({
    url: `/engineering/employee`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/employee
export function deleteEngineeringEmployee(data = []) {
  return request({
    url: `/engineering/employee`,
    method: 'delete',
    data
  })
}

// 分页，子部门权限
// GET
// /engineering/employee/page
export function getEngineeringEmployeePageList(params = {}) {
  return request({
    url: `/engineering/employee/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/employee/{id}
export function getEngineeringEmployeeById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/employee/${id}`,
    method: 'get'
  })
}
