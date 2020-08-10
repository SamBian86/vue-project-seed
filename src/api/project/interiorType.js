import request from '@/utils/request'

// 项目内务检查项目、等级管理

// 删除
// DELETE
// /project/interior/type/{id}
export function deleteProjectInteriorTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/project/interior/type/${id}`,
    method: 'delete',
    params
  })
}

// 保存
// POST
// /project/interior/type/{projectId}/{interiorCheckType}
export function createProjectInteriorType(data = {}) {
  const { projectId, interiorCheckType } = data
  return request({
    url: `/project/interior/type/${projectId}/${interiorCheckType}`,
    method: 'post',
    data
  })
}
