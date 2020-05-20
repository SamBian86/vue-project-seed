import request from '@/utils/request'

// 项目区域管理

// 保存
// POST
// /engineering/projectarea
export function createEngineeringProjectarea(data = {}) {
  return request({
    url: `/engineering/projectarea`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/projectarea
export function editEngineeringProjectarea(data = {}) {
  return request({
    url: `/engineering/projectarea`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/projectarea
export function deleteEngineeringProjectarea(data = []) {
  return request({
    url: `/engineering/projectarea`,
    method: 'delete',
    data
  })
}

// 列表
// GET
// /engineering/projectarea/list
export function getEngineeringProjectareaList() {
  return request({
    url: `/engineering/projectarea/list`,
    method: 'get'
  })
}

// 分页，子部门权限
// GET
// /engineering/projectarea/page
export function getEngineeringProjectareaPageList(params = {}) {
  return request({
    url: `/engineering/projectarea/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/projectarea/{id}
export function getEngineeringProjectareaById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/projectarea/${id}`,
    method: 'get'
  })
}
