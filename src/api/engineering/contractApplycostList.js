import request from '@/utils/request'

// 应付申请科目明细表

// 查询列表(新增付款信息时调用）
// GET
// /engineering/contract/applycost/list/byApplyId/{applyPaymentId}
export function getEngineeringContractApplycostListByApplyId(params = {}) {
  const { applyPaymentId } = params
  return request({
    url: `/engineering/contract/applycost/list/byApplyId/${applyPaymentId}`,
    method: 'get'
  })
}

// 查询列表(新增付款信息时调用）
// GET
// /engineering/contract/applycost/list/byContractId/{contractId}
export function getEngineeringContractApplycostListByContractId(params = {}) {
  const { contractId } = params
  return request({
    url: `/engineering/contract/applycost/list/byContractId/${contractId}`,
    method: 'get'
  })
}
