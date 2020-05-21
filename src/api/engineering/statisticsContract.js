import request from '@/utils/request'

// 统计报表管理

// 项目成本变更
// GET
// /engineering/statistics/contract/change/page
export function getEngineeringStatisticsContractChangePageList(params = {}) {
  return request({
    url: `/engineering/statistics/contract/change/page`,
    method: 'get',
    params
  })
}

// 合同台账
// GET
// /engineering/statistics/contract/page
export function getEngineeringStatisticsContractPageList(params = {}) {
  return request({
    url: `/engineering/statistics/contract/page`,
    method: 'get',
    params
  })
}

// 资金计划
// GET
// /engineering/statistics/contract/payplan/page
export function getEngineeringStatisticsContractPayplanPageList(params = {}) {
  return request({
    url: `/engineering/statistics/contract/payplan/page`,
    method: 'get',
    params
  })
}
