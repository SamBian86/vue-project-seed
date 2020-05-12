import request from '@/utils/request'

// 定时任务日志

// 分页
// GET
// /job/scheduleLog/page
export function getJobScheduleLogPageList(params = {}) {
  return request({
    url: `/job/scheduleLog/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /job/scheduleLog/{id}
export function getJobScheduleLogById(params = {}) {
  const { id } = params
  return request({
    url: `/job/scheduleLog/${id}`,
    method: 'get'
  })
}
