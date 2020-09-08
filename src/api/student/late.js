import request from '@/utils/request'

// 晚出晚归信息

// 导出excel
// GET
// /student/late/export
export function exportStudentLate(params = {}) {
  return request({
    url: `/student/late/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /student/late/page
export function getStudentLatePageList(params = {}) {
  return request({
    url: `/student/late/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /student/late/{id}
export function getStudentLateById(params = {}) {
  const { id } = params
  return request({
    url: `/student/late/${id}`,
    method: 'get'
  })
}
