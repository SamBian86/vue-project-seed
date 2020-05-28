import request from '@/utils/request'

// 合同信息表

// 保存
// POST
// /engineering/contract
export function createEngineeringContract(data = {}) {
  return request({
    url: `/engineering/contract`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract
export function editEngineeringContract(data = {}) {
  return request({
    url: `/engineering/contract`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract
export function deleteEngineeringContract(data = []) {
  return request({
    url: `/engineering/contract`,
    method: 'delete',
    data
  })
}

// 个人审批分页列表
// GET
// /engineering/contract/examine/page
export function getEngineeringContractExaminePageList(params = {}) {
  return request({
    url: `/engineering/contract/examine/page`,
    method: 'get',
    params
  })
}

// 开票登记分页列表
// GET
// /engineering/contract/invoice/page
export function getEngineeringContractInvoicePageList(params = {}) {
  return request({
    url: `/engineering/contract/invoice/page`,
    method: 'get',
    params
  })
}

// 列表
// GET
// /engineering/contract/list
export function getEngineeringContractList(params = {}) {
  return request({
    url: `/engineering/contract/list`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /engineering/contract/page
export function getEngineeringContractPageList(params = {}) {
  return request({
    url: `/engineering/contract/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/contract/{id}
export function getEngineeringContractById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/${id}`,
    method: 'get'
  })
}

// 已退回详情
// GET
// /engineering/contract/{id}/rejectinfo
export function rejectinfoEngineeringContractById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/${id}/rejectinfo`,
    method: 'get'
  })
}

// 提交审核
// POST
// /engineering/contract/{id}/submit
export function submitEngineeringContractById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/${id}/submit`,
    method: 'post'
  })
}
