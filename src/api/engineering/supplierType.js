import request from '@/utils/request'

// 供应商类别

// 保存
// POST
// /engineering/supplier/type
export function createEngineeringSupplierType(data = {}) {
  return request({
    url: `/engineering/supplier/type`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/supplier/type
export function editEngineeringSupplierType(data = {}) {
  return request({
    url: `/engineering/supplier/type`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/supplier/type
export function deleteEngineeringSupplierType(data = []) {
  return request({
    url: `/engineering/supplier/type`,
    method: 'delete',
    data
  })
}

// 树列表
// GET
// /engineering/supplier/type/list
export function getEngineeringSupplierTypeTree(params = {}) {
  return request({
    url: `/engineering/supplier/type/list`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /engineering/supplier/type/page
export function getEngineeringSupplierTypePageList(params = {}) {
  return request({
    url: `/engineering/supplier/type/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/supplier/type/{id}
export function getEngineeringSupplierTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/supplier/type/${id}`,
    method: 'get'
  })
}
