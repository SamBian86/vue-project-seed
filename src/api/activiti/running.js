import request from '@/utils/request'

// 运行中的流程

// 分页
// GET
// /activiti/running/page
export function getActivitiRunningPageList(params = {}) {
  return request({
    url: `/activiti/running/page`,
    method: 'get',
    params
  })
}

// 启动流程实例，依据流程定义KEY，启动流程实例
// POST
// /activiti/running/start
export function startActivitiRunning(data = {}) {
  return request({
    url: `/activiti/running/start`,
    method: 'post',
    data
  })
}

// 启动流程实例，依据流程定义ID和业务唯一标示启动实例
// POST
// /activiti/running/startOfBusinessKey
export function startOfBusinessKeyActivitiRunning(data = {}) {
  return request({
    url: `/activiti/running/startOfBusinessKey`,
    method: 'post',
    data
  })
}

// 删除
// DELETE
// /activiti/running/{id}
export function deleteActivitiRunning(data = {}) {
  const { id } = data
  return request({
    url: `/activiti/running/${id}`,
    method: 'delete'
  })
}
