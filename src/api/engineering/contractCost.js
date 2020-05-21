import request from '@/utils/request'

// 合同科目明细表

// 项目预算科目列表
// GET
// /engineering/contract/cost/{projectId}/select
export function getEngineeringCostSelect(params = {}) {
  const { projectId } = params
  return request({
    url: `/engineering/contract/cost/${projectId}/select`,
    method: 'get'
  })
}

// 项目预算科目详细数据
// GET
// /engineering/contract/cost/{projectId}/{costTypeId}
export function getEngineeringCost(params = {}) {
  const { projectId, costTypeId } = params
  return request({
    url: `/engineering/contract/cost/${projectId}/${costTypeId}`,
    method: 'get'
  })
}
