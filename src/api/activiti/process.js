import request from '@/utils/request'
import { openNewTab } from '@/utils'
// import { getToken } from '@/utils/cookie'
// 流程管理

// 删除流程
// DELETE
// /activiti/process
export function deleteActivitiProcess(data = []) {
  return request({
    url: `/activiti/process`,
    method: 'delete',
    data
  })
}

// 将部署的流程转换为模型
// POST
// /activiti/process/convertToModel/{id}
export function makeActivitiProcessConvertToModelById(data = {}) {
  const { id } = data
  return request({
    url: `/activiti/process/convertToModel/${id}`,
    method: 'post'
  })
}

// 部署流程文件
// POST
// /activiti/process/deploy
export function deployActivitiProcess(data = {}) {
  return request({
    url: `/activiti/process/deploy`,
    method: 'post',
    dataType: 'uploadData',
    data: {
      processFile: data.file
    }
  })
}

// 根据流程定义KEY获取最新的流程配置信息
// GET
// /activiti/process/getLatestProcDefBizRoute
export function getLatestProcDefBizRoute(params = {}) {
  return request({
    url: `/activiti/process/getLatestProcDefBizRoute`,
    method: 'get',
    params
  })
}

// 根据流程ID获取业务路由配置
// GET
// /activiti/process/getProcDefBizRoute/{id}
export function getProcDefBizRouteById(params = {}) {
  const { id } = params
  return request({
    url: `/activiti/process/getProcDefBizRoute/${id}`,
    method: 'get'
  })
}

// 根据业务ID获取流程业务路由配置和实例信息
// GET
// /activiti/process/getProcDefBizRouteAndProcessInstance
export function getProcDefBizRouteAndProcessInstance(params = {}) {
  return request({
    url: `/activiti/process/getProcDefBizRouteAndProcessInstance`,
    method: 'get',
    params
  })
}

// 发起流程-分页
// GET
// /activiti/process/lastestPage
export function getActivitiProcessLastestPageList(params = {}) {
  return request({
    url: `/activiti/process/lastestPage`,
    method: 'get',
    params
  })
}

// 流程管理-分页
// GET
// /activiti/process/page
export function getActivitiProcessPageList(params = {}) {
  return request({
    url: `/activiti/process/page`,
    method: 'get',
    params
  })
}

// 获取资源文件
// GET
// /activiti/process/resource
export function getActivitiProcessResource(params = {}) {
  openNewTab(`/activiti/process/resource`, params)
}

// 保存业务路由配置
// POST
// /activiti/process/saveProcBizRoute
export function createProcBizRoute(data = {}) {
  return request({
    url: `/activiti/process/saveProcBizRoute`,
    method: 'post',
    data
  })
}

// 更新业务路由配置
// PUT
// /activiti/process/saveProcBizRoute
export function editProcBizRoute(data = {}) {
  return request({
    url: `/activiti/process/saveProcBizRoute`,
    method: 'put',
    data
  })
}

// 挂起流程
// PUT
// /activiti/process/suspend/{id}
export function suspendActivitiProcess(data = {}) {
  const { id } = data
  return request({
    url: `/activiti/process/suspend/${id}`,
    method: 'put',
    data
  })
}

// 激活流程
// PUT
// /activiti/process/active/{id}
export function activeActivitiProcess(data = {}) {
  const { id } = data
  return request({
    url: `/activiti/process/active/${id}`,
    method: 'put',
    data
  })
}
