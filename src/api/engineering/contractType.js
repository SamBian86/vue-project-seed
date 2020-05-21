import request from '@/utils/request'

// 合同类别表

// 保存
// POST
// /engineering/contract/type
export function createEngineeringContractType(data = {}) {
  return request({
    url: `/engineering/contract/type`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/type
export function editEngineeringContractType(data = {}) {
  return request({
    url: `/engineering/contract/type`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract/type
export function deleteEngineeringContractType(data = []) {
  return request({
    url: `/engineering/contract/type`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /engineering/contract/type/page
export function getEngineeringContractTypePageList(params = {}) {
  return request({
    url: `/engineering/contract/type/page`,
    method: 'get',
    params
  })
}

// 树结构
// GET
// /engineering/contract/type/tree
export function getEngineeringContractTypeTree(params = {}) {
  return request({
    url: `/engineering/contract/type/tree`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/contract/type/{id}
export function getEngineeringContractTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/type/${id}`,
    method: 'get'
  })
}
