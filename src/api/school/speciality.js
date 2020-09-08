import request from '@/utils/request'

// 学校专业管理

// 保存
// POST
// /school/speciality
export function createSchoolSpeciality(data = {}) {
  return request({
    url: `/school/speciality`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /school/speciality
export function editSchoolSpeciality(data = {}) {
  return request({
    url: `/school/speciality`,
    method: 'put',
    data
  })
}

// 专业导入模板下载
// GET
// /school/speciality/export/{excelType}
export function exportSchoolSpeciality(params = {}) {
  const { excelType } = params
  return request({
    url: `/school/speciality/export/${excelType}`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 批量导入专业信息
// POST
// /school/speciality/import
export function importSchoolSpeciality(data = {}) {
  return request({
    url: `/school/speciality/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}

// 分页
// GET
// /school/speciality/page
export function getSchoolSpecialityPageList(params = {}) {
  return request({
    url: `/school/speciality/page`,
    method: 'get',
    params
  })
}

// 学院-专业列表
// GET
// /school/speciality/{branchId}/list
export function getSchoolSpecialityListByBranchId(params = {}) {
  const { branchId } = params
  return request({
    url: `/school/speciality/${branchId}/list`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/speciality/{id}
export function getSchoolSpecialityById(params = {}) {
  const { id } = params
  return request({
    url: `/school/speciality/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /school/speciality/{id}
export function deleteSchoolSpeciality(params = {}) {
  const { id } = params
  return request({
    url: `/school/speciality/${id}`,
    method: 'delete'
  })
}
