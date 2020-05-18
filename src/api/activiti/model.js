import request from '@/utils/request'
import { exportFile, openNewTab } from '@/utils'
// 模型管理

// 新增模型
// POST
// /activiti/model
export function createActivitiModel(data = {}) {
  return request({
    url: `/activiti/model`,
    method: 'post',
    data
  })
}

// 删除
// DELETE
// /activiti/model
export function deleteActivitiModel(data = []) {
  return request({
    url: `/activiti/model`,
    method: 'delete',
    data
  })
}

// 部署
// POST
// /activiti/model/deploy/{id}
export function deployActivitiModel(data = {}) {
  const { id } = data
  return request({
    url: `/activiti/model/deploy/${id}`,
    method: 'post'
  })
}

// 导出
// GET
// /activiti/model/export/{id}
export function exportActivitiModel(params = {}) {
  const { id } = params
  exportFile(`/activiti/model/export/${id}`, params)
}

// 查看流程图
// GET
// /activiti/model/image/{deploymentId}
export function getActivitiModelImageById(params = {}) {
  const { deploymentId } = params
  return request({
    url: `/activiti/model/image/${deploymentId}`,
    method: 'get'
  })
}

// 分页
// GET
// /activiti/model/page
export function getActivitiModelPageList(params = {}) {
  return request({
    url: `/activiti/model/page`,
    method: 'get',
    params
  })
}

// 在线设计
export function designModelOnline(params = {}) {
  openNewTab(`/activiti/modeler.html`, params)
}
