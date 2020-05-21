import request from '@/utils/request'

// 供货商联系人变更历史记录

// 保存
// POST
// /engineering/supplier/linkhis
export function createEngineeringSupplierLinkhis(data = {}) {
  return request({
    url: `/engineering/supplier/linkhis`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/supplier/linkhis
export function editEngineeringSupplierLinkhis(data = {}) {
  return request({
    url: `/engineering/supplier/linkhis`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/supplier/linkhis
export function deleteEngineeringSupplierLinkhis(data = []) {
  return request({
    url: `/engineering/supplier/linkhis`,
    method: 'delete',
    data
  })
}

// 列表查询
// GET
// /engineering/supplier/linkhis/list
export function getEngineeringSupplierLinkhisList(params = {}) {
  return request({
    url: `/engineering/supplier/linkhis/list`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /engineering/supplier/linkhis/page
export function getEngineeringSupplierLinkhisPageList(params = {}) {
  return request({
    url: `/engineering/supplier/linkhis/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/supplier/linkhis/{id}
export function getEngineeringSupplierLinkhisById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/supplier/linkhis/${id}`,
    method: 'get'
  })
}
