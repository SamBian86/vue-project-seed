import request from '@/utils/request'

// 供货商项目关联

// 保存
// POST
// /engineering/supplier/projectlink
export function createEngineeringSupplierProjectlink(data = {}) {
  return request({
    url: `/engineering/supplier/projectlink`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/supplier/projectlink
export function editEngineeringSupplierProjectlink(data = {}) {
  return request({
    url: `/engineering/supplier/projectlink`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/supplier/projectlink
export function deleteEngineeringSupplierProjectlink(data = []) {
  return request({
    url: `/engineering/supplier/projectlink`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /engineering/supplier/projectlink/page
export function getEngineeringSupplierProjectlinkPageList(params = {}) {
  return request({
    url: `/engineering/supplier/projectlink/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/supplier/projectlink/{id}
export function getEngineeringSupplierProjectlinkById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/supplier/projectlink/${id}`,
    method: 'get'
  })
}
