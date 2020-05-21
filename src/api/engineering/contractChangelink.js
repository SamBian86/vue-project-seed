import request from '@/utils/request'

// 变更和合同关联表

// 保存
// POST
// /engineering/contract/changelink
export function createEngineeringContractChangelink(data = {}) {
  return request({
    url: `/engineering/contract/changelink`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/contract/changelink
export function editEngineeringContractChangelink(data = {}) {
  return request({
    url: `/engineering/contract/changelink`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/contract/changelink
export function deleteEngineeringContractChangelink(data = []) {
  return request({
    url: `/engineering/contract/changelink`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /engineering/contract/changelink/page
export function getEngineeringContractChangelinkPageList(params = {}) {
  return request({
    url: `/engineering/contract/changelink/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/contract/changelink/{id}
export function getEngineeringContractChangelinkById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/contract/changelink/${id}`,
    method: 'get'
  })
}
