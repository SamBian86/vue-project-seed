import request from '@/utils/request'

// 合同结算信息表

// 保存
// POST
// /engineering/contract/settlement
export function createEngineeringContractSettlement(data = {}) {
  return request({
    url: `/engineering/contract/settlement`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/settlement
export function editEngineeringContractSettlement(data = {}) {
  return request({
    url: `/engineering/contract/settlement`,
    method: 'put',
    data
  })
}

// 合同结算个人审核列表
// GET
// /engineering/contract/settlement/examine/page
export function getEngineeringContractSettlementExaminePageList(params = {}) {
  return request({
    url: `/engineering/contract/settlement/examine/page`,
    method: 'get',
    params
  })
}

// 合同结算分页
// GET
// /engineering/contract/settlement/page
export function getEngineeringContractSettlementPageList(params = {}) {
  return request({
    url: `/engineering/contract/settlement/page`,
    method: 'get',
    params
  })
}

// 获取合同结算信息
// GET
// /engineering/contract/settlement/{id}
export function getEngineeringContractSettlementById(params = {}) {
  const { contractId } = params
  return request({
    url: `/engineering/contract/settlement/${contractId}`,
    method: 'get'
  })
}

// 查看退回详情
// GET
// /engineering/contract/settlement/{id}/reject
export function rejectEngineeringContractSettlementById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/settlement/${id}/reject`,
    method: 'get'
  })
}

// 提交审核
// POST
// /engineering/contract/settlement/{id}/submit
export function submitEngineeringContractSettlementById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/settlement/${id}/submit`,
    method: 'post'
  })
}
