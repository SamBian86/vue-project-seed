import request from '@/utils/request'

// 审批数据查看关联表

// 保存
// POST
// /process/biztask
export function createProcessBiztask(data = {}) {
  return request({
    url: `/process/biztask`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /process/biztask
export function editProcessBiztask(data = {}) {
  return request({
    url: `/process/biztask`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /process/biztask
export function deleteProcessBiztask(data = []) {
  return request({
    url: `/process/biztask`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /process/biztask/page
export function getProcessBiztaskPageList(params = {}) {
  return request({
    url: `/process/biztask/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /process/biztask/{id}
export function getProcessBiztaskById(params = {}) {
  const { id } = params
  return request({
    url: `/process/biztask/${id}`,
    method: 'get'
  })
}
