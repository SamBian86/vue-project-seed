import request from '@/utils/request'

// 应付申请信息表

// 保存
// POST
// /engineering/contract/applypayment
export function createEngineeringContractApplypayment(data = {}) {
  return request({
    url: `/engineering/contract/applypayment`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/applypayment
export function editEngineeringContractApplypayment(data = {}) {
  return request({
    url: `/engineering/contract/applypayment`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract/applypayment
export function deleteEngineeringContractApplypayment(data = []) {
  return request({
    url: `/engineering/contract/applypayment`,
    method: 'delete',
    data
  })
}

// 款项详情
// GET
// /engineering/contract/applypayment/byPlanId/{planId}
export function getEngineeringContractApplypaymentByPlanId(params = {}) {
  const { planId } = params
  return request({
    url: `/engineering/contract/applypayment/byPlanId/${planId}`,
    method: 'get'
  })
}

// 个人审批分页列表
// GET
// /engineering/contract/applypayment/examine/page
export function getEngineeringContractApplypaymentExaminePageList(params = {}) {
  return request({
    url: `/engineering/contract/applypayment/examine/page`,
    method: 'get',
    params
  })
}

// 合同款项支付详情
// GET
// /engineering/contract/applypayment/forPay/{id}
export function getEngineeringContractApplypaymentForPayById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/applypayment/forPay/${id}`,
    method: 'get'
  })
}

// 分页
// GET
// /engineering/contract/applypayment/page
export function getEngineeringContractApplypaymentPageList(params = {}) {
  return request({
    url: `/engineering/contract/applypayment/page`,
    method: 'get',
    params
  })
}

// 款项支付分页列表
// GET
// /engineering/contract/applypayment/pay/page
export function getEngineeringContractApplypaymentPayPageList(params = {}) {
  return request({
    url: `/engineering/contract/applypayment/pay/page`,
    method: 'get',
    params
  })
}
// 信息
// GET
// /engineering/contract/applypayment/{id}
export function getEngineeringContractApplypaymentById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/applypayment/${id}`,
    method: 'get'
  })
}

// 已退回详情
// GET
// /engineering/contract/applypayment/{id}/rejectinfo
export function rejectinfoEngineeringContractApplypaymentById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/applypayment/${id}/rejectinfo`,
    method: 'get'
  })
}

// 提交审核
// POST
// /engineering/contract/applypayment/{id}/submit
export function submitEngineeringContractApplypaymentById(data = {}) {
  const { id } = data
  return request({
    url: `/engineering/contract/applypayment/${id}/submit`,
    method: 'post'
  })
}
