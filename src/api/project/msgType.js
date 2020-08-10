import request from '@/utils/request'

// 项目消息类型管理

// 保存
// POST
// /project/msg/type
export function createProjectMsgType(data = {}) {
  return request({
    url: `/project/msg/type`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /project/msg/type
export function editProjectMsgType(data = {}) {
  return request({
    url: `/project/msg/type`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /project/msg/type
export function deleteProjectMsgType(data = []) {
  return request({
    url: `/project/msg/type`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /project/msg/type/page
export function getProjectMsgTypePageList(params = {}) {
  return request({
    url: `/project/msg/type/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /project/msg/type/{id}
export function getProjectMsgTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/project/msg/type/${id}`,
    method: 'get'
  })
}
