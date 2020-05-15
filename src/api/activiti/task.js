import request from '@/utils/request'

// 任务管理

// 回退任务到上一节点
// POST
// /activiti/task/backPreviousTask
export function backPreviousTask(data = {}) {
  return request({
    url: `/activiti/task/backPreviousTask`,
    method: 'post',
    data
  })
}

// 驳回，回退至第一个用户任务
// POST
// /activiti/task/backToFirst
export function backToFirst(data = {}) {
  return request({
    url: `/activiti/task/backToFirst`,
    method: 'post',
    data
  })
}

// 认领任务
// POST
// /activiti/task/claim
export function claimActivitiTask(data = {}) {
  return request({
    url: `/activiti/task/claim`,
    method: 'post',
    data
  })
}

// 任务处理（完成任务）
// POST
// /activiti/task/complete
export function completeActivitiTask(data = {}) {
  return request({
    url: `/activiti/task/complete`,
    method: 'post',
    data
  })
}

// 带参数的任务处理（完成任务）
// POST
// /activiti/task/completeByVariables
export function completeByVariablesActivitiTask(data = {}) {
  return request({
    url: `/activiti/task/completeByVariables`,
    method: 'post',
    data
  })
}

// 删除任务的所有变量
// DELETE
// /activiti/task/deleteTaskVariables
export function deleteTaskVariables(params = {}) {
  return request({
    url: `/activiti/task/deleteTaskVariables`,
    method: 'delete',
    params
  })
}

// 删除指定变量，默认删除本地变量
// DELETE
// /activiti/task/deleteVariable
export function deleteVariable(params = {}) {
  return request({
    url: `/activiti/task/deleteVariable`,
    method: 'delete',
    params
  })
}

// 终止流程
// POST
// /activiti/task/endProcess
export function endProcessActivitiTask(data = {}) {
  return request({
    url: `/activiti/task/endProcess`,
    method: 'post',
    data
  })
}

// 任务委托
// POST
// /activiti/task/entrust
export function entrustActivitiTask(data = {}) {
  return request({
    url: `/activiti/task/entrust`,
    method: 'post',
    data
  })
}

// 获取流程变量
// GET
// /activiti/task/getTaskVariables
export function getTaskVariables() {
  return request({
    url: `/activiti/task/getTaskVariables`,
    method: 'get'
  })
}

// 我的待办列表
// GET
// /activiti/task/myToDoTaskPage
export function getMyToDoTaskPageList(params = {}) {
  return request({
    url: `/activiti/task/myToDoTaskPage`,
    method: 'get',
    params
  })
}

// 待办任务，默认查询所有待办任务。根据用户ID或角色ID查询个人或组的任务
// GET
// /activiti/task/page
export function getActivitiTaskPageList(params = {}) {
  return request({
    url: `/activiti/task/page`,
    method: 'get',
    params
  })
}

// 获取任务详情
// GET
// /activiti/task/task/{id}
export function getActivitiTaskByTaskId(params = {}) {
  const { id } = params
  return request({
    url: `/activiti/task/task/${id}`,
    method: 'get'
  })
}

// 释放任务
// POST
// /activiti/task/unclaim
export function unclaimActivitiTask(data = {}) {
  return request({
    url: `/activiti/task/unclaim`,
    method: 'post',
    data
  })
}

// 更新任务变量
// POST
// /activiti/task/updateTaskVariable
export function updateTaskVariable(data = {}) {
  return request({
    url: `/activiti/task/updateTaskVariable`,
    method: 'post',
    data
  })
}
