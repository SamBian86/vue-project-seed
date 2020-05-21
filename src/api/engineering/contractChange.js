import request from '@/utils/request'

// 变更申请

// 保存
// POST
// /engineering/contract/change
export function createEngineeringContractChange(data = {}) {
  return request({
    url: `/engineering/contract/change`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/change
export function editEngineeringContractChange(data = {}) {
  return request({
    url: `/engineering/contract/change`,
    method: 'put',
    data
  })
}

// 获取科目明细
// GET
// /engineering/contract/change/cost/{id}
export function getEngineeringContractChangeCostById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/change/cost/${id}`,
    method: 'get'
  })
}

// 审批分页列表
// GET
// /engineering/contract/change/examine/page
export function getEngineeringContractChangeExaminePageList(params = {}) {
  return request({
    url: `/engineering/contract/change/examine/page`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /engineering/contract/change/page
export function getEngineeringContractChangePageList(params = {}) {
  return request({
    url: `/engineering/contract/change/page`,
    method: 'get',
    params
  })
}

// 查询变更详情
// GET
// /engineering/contract/change/{id}
export function getEngineeringContractChangeById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/change/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /engineering/contract/change/{id}
export function deleteEngineeringContractChange(data = {}) {
  const { id } = data
  return request({
    url: `/engineering/contract/change/${id}`,
    method: 'delete'
  })
}

// 查看退回详情
// GET
// /engineering/contract/change/{id}/reject
export function rejectEngineeringContractChange(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/change/${id}/reject`,
    method: 'get'
  })
}

// 提交审核
// POST
// /engineering/contract/change/{id}/submit
export function submitEngineeringContractChange(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/change/${id}/submit`,
    method: 'post'
  })
}
