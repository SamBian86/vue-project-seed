import request from '@/utils/request'
// 巡检打卡记录管理

// 导出excel
// GET
// /campus/patrol/history/export
export function exportCampusPatrolHistory(params = {}) {
  return request({
    url: `/campus/patrol/history/export`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 分页
// GET
// /campus/patrol/history/page
export function getCampusPatrolHistoryPageList(params = {}) {
  return request({
    url: `/campus/patrol/history/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /campus/patrol/history/{id}
export function getCampusPatrolHistoryById(params = {}) {
  const { id } = params
  return request({
    url: `/campus/patrol/history/${id}`,
    method: 'get'
  })
}
