import request from '@/utils/request'

// 内务检查管理

// 导出excel
// GET
// /interior/check/export
export function exportInteriorCheck(params = {}) {
  return request({
    url: `/interior/check/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /interior/check/page
export function getInteriorCheckPageList(params = {}) {
  return request({
    url: `/interior/check/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /interior/check/{id}
export function getInteriorCheckById(params = {}) {
  const { id } = params
  return request({
    url: `/interior/check/${id}`,
    method: 'get'
  })
}
