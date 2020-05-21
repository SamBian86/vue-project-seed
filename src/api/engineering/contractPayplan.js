import request from '@/utils/request'

// 合同付款计划表

// 保存
// POST
// /engineering/contract/payplan
export function createEngineeringContractPayplan(data = {}) {
  return request({
    url: `/engineering/contract/payplan`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/payplan
export function editEngineeringContractPayplan(data = {}) {
  return request({
    url: `/engineering/contract/payplan`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract/payplan
export function deleteEngineeringContractPayplan(data = []) {
  return request({
    url: `/engineering/contract/payplan`,
    method: 'delete',
    data
  })
}

// 批量保存付款计划（覆盖之前的付款计划）
// POST
// /engineering/contract/payplan/{contractId}/batch
export function batchEngineeringContractPayplan(data = {}) {
  const { contractId } = data
  return request({
    url: `/engineering/contract/payplan/${contractId}/batch`,
    method: 'post',
    data
  })
}

// 付款计划列表
// GET
// /engineering/contract/payplan/{contractId}/list
export function getEngineeringContractPayplanListById(data = {}) {
  const { contractId } = data
  return request({
    url: `/engineering/contract/payplan/${contractId}/list`,
    method: 'post',
    data
  })
}
