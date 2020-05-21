import request from '@/utils/request'

// 供货商资质

// 保存
// POST
// /engineering/supplier/qualifications
export function createEngineeringSupplierQualifications(data = {}) {
  return request({
    url: `/engineering/supplier/qualifications`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/supplier/qualifications
export function editEngineeringSupplierQualifications(data = {}) {
  return request({
    url: `/engineering/supplier/qualifications`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/supplier/qualifications
export function deleteEngineeringSupplierQualifications(data = []) {
  return request({
    url: `/engineering/supplier/qualifications`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /engineering/supplier/qualifications/page
export function getEngineeringSupplierQualificationsPageList(params = {}) {
  return request({
    url: `/engineering/supplier/qualifications/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/supplier/qualifications/{id}
export function getEngineeringSupplierQualificationsById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/supplier/qualifications/${id}`,
    method: 'get'
  })
}
