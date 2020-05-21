import request from '@/utils/request'

// 供货商信息

// 保存
// POST
// /engineering/supplier
export function createEngineeringSupplier(data = {}) {
  return request({
    url: `/engineering/supplier`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/supplier
export function editEngineeringSupplier(data = {}) {
  return request({
    url: `/engineering/supplier`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/supplier
export function deleteEngineeringSupplier(data = []) {
  return request({
    url: `/engineering/supplier`,
    method: 'delete',
    data
  })
}

// 列表查询
// GET
// /engineering/supplier/list
export function getEngineeringSupplierList(params = {}) {
  return request({
    url: `/engineering/supplier/list`,
    method: 'get',
    params
  })
}

// 查询供应商（同一法人代表）列表)
// GET
// /engineering/supplier/list/{supplierId}
export function getEngineeringSupplierListBySupplierId(params = {}) {
  const { supplierId } = params
  return request({
    url: `/engineering/supplier/list/${supplierId}`,
    method: 'get'
  })
}

// 分页
// GET
// /engineering/supplier/page
export function getEngineeringSupplierPageList(params = {}) {
  return request({
    url: `/engineering/supplier/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/supplier/{id}
export function getEngineeringSupplierById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/supplier/${id}`,
    method: 'get'
  })
}

// 供货商拉黑
// PUT
// /engineering/supplier/{id}/black/{blackType}
export function setEngineeringSupplierBlack(data = {}) {
  const { id, blackType } = data
  return request({
    url: `/engineering/supplier/${id}/black/${blackType}`,
    method: 'put',
    data
  })
}
