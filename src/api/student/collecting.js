import request from '@/utils/request'

// 物品领用、退还记录

// 导出excel
// GET
// /student/collecting/export
export function exportStudentCollecting(params = {}) {
  return request({
    url: `/student/collecting/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /student/collecting/page
export function getStudentCollectingPageList(params = {}) {
  return request({
    url: `/student/collecting/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /student/collecting/{id}
export function getStudentCollectingById(params = {}) {
  const { id } = params
  return request({
    url: `/student/collecting/${id}`,
    method: 'get'
  })
}
