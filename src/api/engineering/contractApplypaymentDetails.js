import request from '@/utils/request'

// 合同款项支付详情列表信息

// 保存
// POST
// /engineering/contract/applypayment/details
export function createEngineeringContractApplypaymentDetails(data = {}) {
  return request({
    url: `/engineering/contract/applypayment/details`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/applypayment/details
export function editEngineeringContractApplypaymentDetails(data = {}) {
  return request({
    url: `/engineering/contract/applypayment/details`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract/applypayment/details
export function deleteEngineeringContractApplypaymentDetails(data = []) {
  return request({
    url: `/engineering/contract/applypayment/details`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /engineering/contract/applypayment/details/page
export function getEngineeringContractApplypaymentDetailsPageList(params = {}) {
  return request({
    url: `/engineering/contract/applypayment/details/page`,
    method: 'get',
    params
  })
}
