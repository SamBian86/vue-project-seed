import request from '@/utils/request'

// 参数管理
// 保存
// POST
// /sys/params
export function createParams(data = {}) {
  return request({
    url: `/sys/params`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/params
export function editParams(data = {}) {
  return request({
    url: `/sys/params`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /sys/params
export function deleteParams(data = []) {
  return request({
    url: `/sys/params`,
    method: 'delete',
    data
  })
}

// 导出
// GET
// /sys/params/export
export function exportParams(params = {}) {
  return request({
    url: `/sys/params/export`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /sys/params/page
export function getParamsList(params = {}) {
  return request({
    url: `/sys/params/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/params/{id}
export function getParamsById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/params/${id}`,
    method: 'get'
  })
}
