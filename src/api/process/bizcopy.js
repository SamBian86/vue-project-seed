import request from '@/utils/request'

// 流程抄送人员关联表

// 保存
// POST
// /process/bizcopy
export function createProcessBizcopy(data = {}) {
  return request({
    url: `/process/bizcopy`,
    method: 'post',
    data
  })
}

// 维护抄送人
// PUT
// /process/bizcopy
export function editProcessBizcopy(data = {}) {
  return request({
    url: `/process/bizcopy`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /process/bizcopy
export function deleteProcessBizcopy(data = []) {
  return request({
    url: `/process/bizcopy`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /process/bizcopy/page
export function getProcessBizcopyPageList(params = {}) {
  return request({
    url: `/process/bizcopy/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /process/bizcopy/{id}
export function getProcessBizcopyById(params = {}) {
  const { id } = params
  return request({
    url: `/process/bizcopy/${id}`,
    method: 'get'
  })
}

// 获取流程配置抄送人列表
// GET
// /process/bizcopy/{key}/list
export function getProcessBizcopyList(params = {}) {
  const { key } = params
  return request({
    url: `/process/bizcopy/${key}/list`,
    method: 'get',
    params
  })
}
