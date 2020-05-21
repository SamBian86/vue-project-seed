import request from '@/utils/request'

// 变更科目明细表

// 保存
// POST
// /engineering/change/cost
export function createEngineeringChangeCost(data = {}) {
  return request({
    url: `/engineering/change/cost`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/change/cost
export function editEngineeringChangeCost(data = {}) {
  return request({
    url: `/engineering/change/cost`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/change/cost
export function deleteEngineeringChangeCost(data = []) {
  return request({
    url: `/engineering/change/cost`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /engineering/change/cost/page
export function getEngineeringChangeCostPageList(params = {}) {
  return request({
    url: `/engineering/change/cost/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/change/cost/{id}
export function getEngineeringChangeCostById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/change/cost/${id}`,
    method: 'get'
  })
}
