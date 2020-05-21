import request from '@/utils/request'

// 合同票务信息表

// 修改
// PUT
// /engineering/contract/invoice
export function editEngineeringContractInvoice(data = {}) {
  return request({
    url: `/engineering/contract/invoice`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract/invoice
export function deleteEngineeringContractInvoice(data = []) {
  return request({
    url: `/engineering/contract/invoice`,
    method: 'delete',
    data
  })
}

// 保存-增量
// POST
// /engineering/contract/invoice/{contractId}
export function saveEngineeringContractInvoiceById(data = {}) {
  const { contractId } = data
  return request({
    url: `/engineering/contract/invoice/${contractId}`,
    method: 'post',
    data
  })
}

// 批量保存(覆盖之前的合同票据列表数据）
// POST
// /engineering/contract/invoice/{contractId}/batch
export function batchEngineeringContractInvoiceById(data = {}) {
  const { contractId } = data
  return request({
    url: `/engineering/contract/invoice/${contractId}/batch`,
    method: 'post',
    data
  })
}

// 票据列表
// GET
// /engineering/contract/invoice/{contractId}/list
export function getEngineeringContractInvoiceList(params = {}) {
  const { contractId } = params
  return request({
    url: `/engineering/contract/invoice/${contractId}/list`,
    method: 'get'
  })
}

// 票据款项列表
// GET
// /engineering/contract/invoice/{contractId}/select
export function getEngineeringContractInvoiceSelectList(params = {}) {
  const { contractId } = params
  return request({
    url: `/engineering/contract/invoice/${contractId}/select`,
    method: 'get'
  })
}
