import request from '@/utils/request'

// 审批数据历史记录表

// 修改
// PUT
// /process/historyrecord
export function editProcessHistoryrecord(data = {}) {
  return request({
    url: `/process/historyrecord`,
    method: 'put',
    data
  })
}

// 分页
// GET
// /process/historyrecord/page
export function getProcessHistoryrecordPageList(params = {}) {
  return request({
    url: `/process/historyrecord/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /process/historyrecord/{id}
export function getProcessHistoryrecordById(params = {}) {
  const { id } = params
  return request({
    url: `/process/historyrecord/${id}`,
    method: 'get'
  })
}
