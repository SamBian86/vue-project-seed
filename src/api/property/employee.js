import request from '@/utils/request'

// 物业员工管理

// 保存
// POST
// /property/employee
export function createPropertyEmployee(data = {}) {
  return request({
    url: `/property/employee`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /property/employee
export function editPropertyEmployee(data = {}) {
  return request({
    url: `/property/employee`,
    method: 'put',
    data
  })
}

// 分页
// GET
// /property/employee/page
export function getPropertyEmployeePageList(params = {}) {
  return request({
    url: `/property/employee/page`,
    method: 'get',
    params
  })
}

// 分页-新增宿管/维修人员
// GET
// /property/employee/select/page
export function getPropertyEmployeeSelectPageList(params = {}) {
  return request({
    url: `/property/employee/select/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /property/employee/{id}
export function getPropertyEmployeeById(params = {}) {
  const { id } = params
  return request({
    url: `/property/employee/${id}`,
    method: 'get'
  })
}

// 修改状态
// PUT
// /property/employee/{id}/status/{status}
export function setPropertyEmployeeStatus(params = {}) {
  const { id, status } = params
  return request({
    url: `/property/employee/${id}/status/${status}`,
    method: 'put',
    params
  })
}
