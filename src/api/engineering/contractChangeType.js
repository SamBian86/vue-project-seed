import request from '@/utils/request'

// 变更类别

// 保存
// POST
// /engineering/contract/change/type
export function createEngineeringContractChangeType(data = {}) {
  return request({
    url: `/engineering/contract/change/type`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/change/type
export function editEngineeringContractChangeType(data = {}) {
  return request({
    url: `/engineering/contract/change/type`,
    method: 'put',
    data
  })
}

// 列表
// GET
// /engineering/contract/change/type/list
export function getEngineeringContractChangeTypeList() {
  return request({
    url: `/engineering/contract/change/type/list`,
    method: 'get'
  })
}

// 分页
// GET
// /engineering/contract/change/type/page
export function getEngineeringContractChangeTypePageList(params = {}) {
  return request({
    url: `/engineering/contract/change/type/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/contract/change/type/{id}
export function getEngineeringContractChangeTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/change/type/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /engineering/contract/change/type/{id}
export function deleteEngineeringContractChangeType(data = {}) {
  const { id } = data
  return request({
    url: `/engineering/contract/change/type/${id}`,
    method: 'delete',
    data
  })
}
