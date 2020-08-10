import request from '@/utils/request'

// 项目领用物品管理

// 删除
// DELETE
// /project/goods/{id}
export function deleteProjectGoods(params = {}) {
  const { id } = params
  return request({
    url: `/project/goods/${id}`,
    method: 'delete',
    params
  })
}

// 添加物品
// POST
// /project/goods/{projectId}
export function addProjectGoods(data = {}) {
  const { projectId } = data
  return request({
    url: `/project/goods/${projectId}`,
    method: 'post',
    data
  })
}
