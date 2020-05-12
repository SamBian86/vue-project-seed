import request from '@/utils/request'

// 定时任务

// 保存
// POST
// /job/schedule
export function createJobSchedule(data = {}) {
  return request({
    url: `/job/schedule`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /job/schedule
export function editJobSchedule(data = {}) {
  return request({
    url: `/job/schedule`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /job/schedule
export function deleteJobSchedule(data = []) {
  return request({
    url: `/job/schedule`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /job/schedule/page
export function getJobSchedulePageList(params = {}) {
  return request({
    url: `/job/schedule/page`,
    method: 'get',
    params
  })
}

// 暂停
// PUT
// /job/schedule/pause
export function pauseJobSchedule(data = []) {
  return request({
    url: `/job/schedule/pause`,
    method: 'put',
    data
  })
}

// 恢复
// PUT
// /job/schedule/resume
export function resumeJobSchedule(data = []) {
  return request({
    url: `/job/schedule/resume`,
    method: 'put',
    data
  })
}

// 立即执行
// PUT
// /job/schedule/run
export function runJobSchedule(data = []) {
  return request({
    url: `/job/schedule/run`,
    method: 'put',
    data
  })
}

// 信息
// GET
// /job/schedule/{id}
export function getJobScheduleById(params = {}) {
  const { id } = params
  return request({
    url: `/job/schedule/${id}`,
    method: 'get'
  })
}
